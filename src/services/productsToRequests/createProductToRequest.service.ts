import AppDataSource from "../../data-source";
import Product from "../../entities/products.entity";
import Request from "../../entities/request.entity";
import ProductToRequest from "../../entities/productToRequest.entity";
import { ICreateProductToRequest } from "../../interfaces/requests.interfaces";
import { AppError } from "../../errors/AppError";

const createProductToRequestService = async (
  requestId: string,
  userId: string,
  productData: ICreateProductToRequest
): Promise<ProductToRequest> => {
  const requestsRepository = AppDataSource.getRepository(Request);
  const productsRepository = AppDataSource.getRepository(Product);
  const productsToRequestsRepository =
    AppDataSource.getRepository(ProductToRequest);

  const request = await requestsRepository.findOneBy({ id: requestId });

  if (request.user.id !== userId) {
    throw new AppError("Invalid request id", 400);
  }

  if (request.status !== "em aberto") {
    throw new AppError("Invalid request id", 400);
  }

  const product = await productsRepository.findOneBy({
    id: productData.productId,
  });

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  productData.value = productData.quantity * product.price;

  const productToRequest = productsToRequestsRepository.create({
    ...productData,
    request: request,
    product: product,
  });
  await productsToRequestsRepository.save(productToRequest);

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

  return productToRequest;
};

export default createProductToRequestService;
