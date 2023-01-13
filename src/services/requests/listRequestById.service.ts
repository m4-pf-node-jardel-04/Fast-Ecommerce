import AppDataSource from "../../data-source";
import Request from "../../entities/request.entity";
import User from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

const listRequestByIdService = async (
  userId: string,
  requestId: string
): Promise<Request> => {
  const requestRepository = AppDataSource.getRepository(Request);
  const userRepository = AppDataSource.getRepository(User);

  const request = await requestRepository.findOneBy({ id: requestId });
  const user = await userRepository.findOneBy({ id: userId });

  if (!user.isAdm && request.user.id !== user.id) {
    throw new AppError("Invalid request", 400);
  }

  return request;
};

export default listRequestByIdService;
