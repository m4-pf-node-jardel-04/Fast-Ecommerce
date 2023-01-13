import { UpdateResult } from "typeorm";
import AppDataSource from "../../data-source";
import Request from "../../entities/request.entity";
import User from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { ICreateRequest } from "../../interfaces/requests.interfaces";

const updateRequestService = async (
  userId: string,
  requestId: string,
  updatedData: ICreateRequest
): Promise<UpdateResult> => {
  const requestRepository = AppDataSource.getRepository(Request);
  const userRepository = AppDataSource.getRepository(User);

  const request = await requestRepository.findOneBy({ id: requestId });
  const user = await userRepository.findOneBy({ id: userId });

  if (request.status !== "em aberto") {
    throw new AppError("Invalid request", 400);
  }

  if (!user.isAdm && request.user.id !== user.id) {
    throw new AppError("Invalid request", 400);
  }

  const updatedRequest = await requestRepository.update(
    { id: request.id },
    { status: updatedData.status }
  );

  return updatedRequest;
};

export default updateRequestService;
