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

  const [request] = await requestRepository.find({
    where: { id: requestId },
    relations: { user: true, productTorequest: true },
  });

  const user = await userRepository.findOneBy({ id: userId });

  if (request.status !== "em aberto") {
    throw new AppError("The request has been already finalized", 400);
  };

  if (!user.isAdm && request.user.id !== user.id) {
    throw new AppError("The request does not belong to user", 400);
  };

  const updatedRequest = await requestRepository.save({
    id: request.id,
    status: updatedData.status,
  });

  return updatedRequest;
};

export default updateRequestService;
