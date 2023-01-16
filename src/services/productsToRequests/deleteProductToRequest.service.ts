import AppDataSource from "../../data-source";
import Request from "../../entities/request.entity";
import ProductToRequest from "../../entities/productToRequest.entity";
import { AppError } from "../../errors/AppError";
import Product from "../../entities/products.entity";

const deleteProductToRequestService = async (
  requestId: string,
  userId: string,
  productId: string
) => {
  const requestsRepository = AppDataSource.getRepository(Request);
  const productsToRequestsRepository =
    AppDataSource.getRepository(ProductToRequest);
  const productRepository = AppDataSource.getRepository(Product);

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

  console.log(productId, requestId);
  console.log(findProduct);

  if (!findProduct) {
    throw new AppError("Product not found on request", 404);
  }

  const product = await productRepository.findOneBy({ id: productId });

  await productRepository.update(
    { id: product.id },
    { quantity: product.quantity + findProduct.quantity }
  );

  await productsToRequestsRepository.delete({ id: findProduct.id });

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
