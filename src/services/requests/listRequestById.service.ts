import AppDataSource from "../../data-source";
import Request from "../../entities/request.entity";
import User from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { listRequestByIdResponseSerializer } from "../../serializers/requests.serializers";

const listRequestByIdService = async (userId: string, requestId: string) => {
  const requestRepository = AppDataSource.getRepository(Request);
  const userRepository = AppDataSource.getRepository(User);

  const [request] = await requestRepository.find({
    where: { id: requestId },
    relations: { user: true, productTorequest: true },
  });

  const user = await userRepository.findOneBy({ id: userId });

  if (!user.isAdm && request.user.id !== user.id) {
    throw new AppError("Invalid request", 400);
  };

  const requestReturn = await listRequestByIdResponseSerializer.validate(
    request,
    { stripUnknown: true }
  );

  return requestReturn;
};

export default listRequestByIdService;
