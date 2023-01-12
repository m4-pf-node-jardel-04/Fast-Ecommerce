import AppDataSource from "../../data-source";
import Request from "../../entities/request.entity";
import ProductToRequest from "../../entities/productToRequest.entity";
import { AppError } from "../../errors/AppError";

const deleteProductToRequestService = async (
  requestId: string,
  userId: string,
  productId: string
): Promise<ProductToRequest> => {
  const requestsRepository = AppDataSource.getRepository(Request);
  const productsToRequestsRepository =
    AppDataSource.getRepository(ProductToRequest);

  const request = await requestsRepository.findOneBy({ id: requestId });

  if (request.user.id !== userId) {
    throw new AppError("Invalid request id", 400);
  }

  if (request.status !== "em aberto") {
    throw new AppError("Invalid request id", 400);
  }

  const findProduct = await productsToRequestsRepository
    .createQueryBuilder("productToRequest")
    .where("productToRequest.requestId = :id", { id: requestId })
    .andWhere("productToRequest.productId = :id", { id: productId })
    .getOne();

  if (!findProduct) {
    throw new AppError("Product not found on request", 404);
  }

  await productsToRequestsRepository.delete({ id: findProduct.id });

  const totalValue: number = await requestsRepository
    .createQueryBuilder("requests")
    .innerJoinAndSelect("requests.productTorequest", "productToRequest")
    .addSelect("SUM(productToRequest.value)", "sum")
    .where("requests.id = :id", { id: request.id })
    .getRawOne();

  const totalQuantity: number = await requestsRepository
    .createQueryBuilder("requests")
    .innerJoinAndSelect("requests.productTorequest", "productToRequest")
    .addSelect("SUM(productToRequest.quantity)", "sum")
    .where("requests.id = :id", { id: request.id })
    .getRawOne();

  await requestsRepository.update(
    { id: request.id },
    {
      totalQuantity: totalQuantity,
      totalValue: totalValue,
    }
  );

  return findProduct;
};

export default deleteProductToRequestService;
