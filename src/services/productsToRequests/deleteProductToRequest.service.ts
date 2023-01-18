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
  const requestRepository = AppDataSource.getRepository(Request);
  const productsToRequestsRepository =
    AppDataSource.getRepository(ProductToRequest);
  const productRepository = AppDataSource.getRepository(Product);

  const [request] = await requestRepository.find({
    where: { id: requestId },
    relations: { user: true, productTorequest: true },
  });

  if (request.user.id !== userId) {
    throw new AppError("The request does not belong to user", 400);
  };

  if (request.status !== "em aberto") {
    throw new AppError("The request has been already finalized", 400);
  };

  const findProduct = await productsToRequestsRepository
    .createQueryBuilder("productToRequest")
    .where("productToRequest.requestId = :requestId", { requestId: requestId })
    .andWhere("productToRequest.productId = :productId", {
      productId: productId,
    })
    .getOne();

  if (!findProduct) {
    throw new AppError("Product not found on request", 404);
  };

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

  await requestRepository.update(
    { id: request.id },
    {
      totalQuantity: totalQuantity ? totalQuantity : 0,
      totalValue: totalValue ? totalValue : 0,
    }
  );

  return findProduct;
};

export default deleteProductToRequestService;
