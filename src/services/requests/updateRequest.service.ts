import AppDataSource from "../../data-source";
import Request from "../../entities/request.entity";
import User from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IUpdateRequest } from "../../interfaces/requests.interfaces";

const updateRequestService = async (
  userId: string,
  requestId: string,
  updatedData: IUpdateRequest
) => {
  const requestRepository = AppDataSource.getRepository(Request);
  const userRepository = AppDataSource.getRepository(User);

  const request = await requestRepository
    .createQueryBuilder("request")
    .innerJoinAndSelect("request.user", "user")
    .innerJoinAndSelect("request.productTorequest", "productToRequest")
    .where("request.id = :id", { id: requestId })
    .getOne();
  const user = await userRepository.findOneBy({ id: userId });

  if (request.status !== "em aberto") {
    throw new AppError("Invalid request", 400);
  }

  if (!user.isAdm && request.user.id !== user.id) {
    throw new AppError("Invalid request", 400);
  }

  const updatedRequest = await requestRepository.save({
    id: request.id,
    status: updatedData.status,
  });

  return updatedRequest;
};

export default updateRequestService;
