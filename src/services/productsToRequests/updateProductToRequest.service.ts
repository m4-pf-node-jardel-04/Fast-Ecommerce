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
  const requestRepository = AppDataSource.getRepository(Request);
  const productsRepository = AppDataSource.getRepository(Product);
  const productsToRequestsRepository = AppDataSource.getRepository(ProductToRequest);

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

  const product = await productsRepository.findOneBy({ id: productId });

  if (findProduct.quantity > updatedData.quantity) {
    const diference = findProduct.quantity - updatedData.quantity;
    await productsRepository.update(
      { id: product.id },
      { quantity: product.quantity + diference }
    );
  };

  if (findProduct.quantity < updatedData.quantity) {
    const diference = updatedData.quantity - findProduct.quantity;
    if (diference > product.quantity) {
      throw new AppError("insufficient product stock", 409);
    }
    await productsRepository.update(
      { id: product.id },
      { quantity: product.quantity - diference }
    );
  };

  updatedData.value = updatedData.quantity * product.price;

  const updatedProductToRequest = await productsToRequestsRepository.save({
    id: findProduct.id,
    quantity: updatedData.quantity,
    value: updatedData.value,
    productName: product.name,
  });

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

  await requestRepository.save({
    id: request.id,
    totalQuantity: Number(totalQuantity) ? Number(totalQuantity) : 0,
    totalValue: Number(totalValue) ? Number(totalValue) : 0,
  });

  return updatedProductToRequest;
};

export default updateProductToRequestService;
