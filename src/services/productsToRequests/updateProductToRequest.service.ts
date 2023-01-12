import { IUpdateProductToRequest } from "../../interfaces/requests.interfaces";
import AppDataSource from "../../data-source";
import Request from "../../entities/request.entity";
import Product from "../../entities/products.entity";
import ProductToRequest from "../../entities/productToRequest.entity";
import { AppError } from "../../errors/AppError";
import { UpdateResult } from "typeorm";

const updateProductToRequestService = async (
  requestId: string,
  userId: string,
  productId: string,
  updatedData: IUpdateProductToRequest
): Promise<UpdateResult> => {
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

  const findProduct = await productsToRequestsRepository
    .createQueryBuilder("productToRequest")
    .where("productToRequest.requestId = :id", { id: requestId })
    .andWhere("productToRequest.productId = :id", { id: productId })
    .getOne();

  if (!findProduct) {
    throw new AppError("Product not found on request", 404);
  }

  const product = await productsRepository.findOneBy({ id: productId });

  updatedData.value = updatedData.quantity * product.price;

  const updatedProduct = await productsToRequestsRepository.update(
    { id: findProduct.id },
    {
      quantity: updatedData.quantity,
      value: updatedData.value,
    }
  );

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

  return updatedProduct;
};

export default updateProductToRequestService;
