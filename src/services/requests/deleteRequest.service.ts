import AppDataSource from "../../data-source";
import Request from "../../entities/request.entity";
import User from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

const deleteRequestService = async (userId: string, requestId: string) => {
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

  const deletedRequest = await requestRepository.delete({ id: request.id });

  return deletedRequest;
};

export default deleteRequestService;
