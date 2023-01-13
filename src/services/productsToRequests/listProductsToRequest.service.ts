import AppDataSource from "../../data-source";
import Request from "../../entities/request.entity";
import { AppError } from "../../errors/AppError";

const listProductsToRequestService = async (
  requestId: string,
  userId: string
): Promise<Request> => {
  const requestsRepository = AppDataSource.getRepository(Request);

  const request = await requestsRepository.findOneBy({ id: requestId });

  if (request.user.id !== userId) {
    throw new AppError("Invalid request id", 400);
  }

  const productsToRequest = await requestsRepository
    .createQueryBuilder("requests")
    .innerJoinAndSelect("requests.productTorequest", "productToRequest")
    .where("requests.id = :id", { id: request.id })
    .getOne();

  return productsToRequest;
};

export default listProductsToRequestService;
