import { IUpdateProductToRequest } from "../../interfaces/requests.interfaces";
import AppDataSource from "../../data-source";
import Request from "../../entities/request.entity";
import Product from "../../entities/products.entity";
import ProductToRequest from "../../entities/productToRequest.entity";
import { AppError } from "../../errors/AppError";

const updateProductToRequestService = async (
  requestId: string,
  userId: string,
  productId: string,
  updatedData: IUpdateProductToRequest
) => {
  const requestsRepository = AppDataSource.getRepository(Request);
  const productsRepository = AppDataSource.getRepository(Product);
  const productsToRequestsRepository =
    AppDataSource.getRepository(ProductToRequest);

  const request = await requestsRepository
    .createQueryBuilder("request")
    .innerJoinAndSelect("request.user", "user")
    .innerJoinAndSelect("request.productTorequest", "productToRequest")
    .where("request.id = :id", { id: requestId })
    .getOne();

  if (request.user.id !== userId) {
    throw new AppError("Invalid request id", 400);
  }

  if (request.status !== "em aberto") {
    throw new AppError("Invalid request id", 400);
  }

  const findProduct = await productsToRequestsRepository
    .createQueryBuilder("productToRequest")
    .where("productToRequest.requestId = :requestId", { requestId: requestId })
    .andWhere("productToRequest.productId = :productId", {
      productId: productId,
    })
    .getOne();

  if (!findProduct) {
    throw new AppError("Product not found on request", 404);
  }

  const product = await productsRepository.findOneBy({ id: productId });

  if (findProduct.quantity > updatedData.quantity) {
    const diference = findProduct.quantity - updatedData.quantity;
    await productsRepository.update(
      { id: product.id },
      { quantity: product.quantity + diference }
    );
  }

  if (findProduct.quantity < updatedData.quantity) {
    const diference = updatedData.quantity - findProduct.quantity;
    if (diference > product.quantity) {
      throw new AppError("insufficient product stock", 409);
    }
    await productsRepository.update(
      { id: product.id },
      { quantity: product.quantity - diference }
    );
  }

  updatedData.value = updatedData.quantity * product.price;

  await productsToRequestsRepository.update(
    { id: findProduct.id },
    {
      quantity: updatedData.quantity,
      value: updatedData.value,
    }
  );

  const { totalValue } = await productsToRequestsRepository
    .createQueryBuilder("productToRequest")
    .where("productToRequest.requestId = :id", { id: requestId })
    .select("SUM(productToRequest.value)", "totalValue")
    .getRawOne();

  const { totalQuantity } = await productsToRequestsRepository
    .createQueryBuilder("productToRequest")
    .where("productToRequest.requestId = :id", { id: requestId })
    .select("SUM(productToRequest.quantity)", "totalQuantity")
    .getRawOne();

  const updatedProductToRequest = await requestsRepository.save({
    id: request.id,
    totalQuantity: Number(totalQuantity),
    totalValue: Number(totalValue),
    productName: product.name,
  });

  return updatedProductToRequest;
};

export default updateProductToRequestService;
