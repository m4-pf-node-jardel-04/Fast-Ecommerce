import AppDataSource from "../../data-source";
import Product from "../../entities/products.entity";
import Request from "../../entities/request.entity";
import ProductToRequest from "../../entities/productToRequest.entity";
import { ICreateProductToRequest } from "../../interfaces/requests.interfaces";
import { AppError } from "../../errors/AppError";
import { createProductToRequestsResponseSerializer } from "../../serializers/requests.serializers";

const createProductToRequestService = async (
  requestId: string,
  userId: string,
  productData: ICreateProductToRequest
) => {
  const requestsRepository = AppDataSource.getRepository(Request);
  const productsRepository = AppDataSource.getRepository(Product);
  const productsToRequestsRepository = AppDataSource.getRepository(ProductToRequest);

  const request = await requestsRepository
    .createQueryBuilder("request")
    .innerJoinAndSelect("request.user", "user")
    .where("request.id = :id", { id: requestId })
    .getOne();

  if (request.user.id !== userId) {
    throw new AppError("The request does not belong to user", 400);
  };

  if (request.status !== "em aberto") {
    throw new AppError("The request has been already finalized", 400);
  };

  const product = await productsRepository.findOneBy({
    id: productData.productId,
  });

  if (!product) {
    throw new AppError("Product not found", 404);
  };

  const findProductInRequest = await productsToRequestsRepository
    .createQueryBuilder("productToRequest")
    .where("productToRequest.requestId = :requestId", { requestId: requestId })
    .andWhere("productToRequest.productId = :productId", {
      productId: productData.productId,
    })
    .getOne();

  if (findProductInRequest) {
    throw new AppError(
      "Product already added to request, please update the quantity",
      409
    );
  };

  if (productData.quantity > product.quantity) {
    throw new AppError("insufficient product stock", 409);
  };

  productData.value = productData.quantity * product.price;
  productData.productName = product.name;

  const productToRequest = productsToRequestsRepository.create({
    ...productData,
    request: request,
    product: product,
  });
  
  await productsToRequestsRepository.save(productToRequest);

  await productsRepository.update(
    { id: product.id },
    { quantity: product.quantity - productData.quantity }
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

  await requestsRepository.update(
    { id: request.id },
    {
      totalQuantity: totalQuantity,
      totalValue: totalValue,
    }
  );

  const productToRequestReturn =
    await createProductToRequestsResponseSerializer.validate(productToRequest, {
      stripUnknown: true,
    });

  return productToRequestReturn;
};

export default createProductToRequestService;
