import AppDataSource from "../../data-source";
import Request from "../../entities/request.entity";
import User from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { createRequestResponseSerializer } from "../../serializers/requests.serializers";

const createRequestService = async (userId: string) => {
  const requestRepository = AppDataSource.getRepository(Request);
  const userRepository = AppDataSource.getRepository(User);

  const findRequest = await requestRepository
    .createQueryBuilder("request")
    .select()
    .where("request.userId = :id", { id: userId })
    .andWhere("request.status = :status", { status: "em aberto" })
    .getOne();

  if (findRequest) {
    throw new AppError("User already have an request open", 409);
  };

  const user = await userRepository.findOneBy({ id: userId });

  const request = requestRepository.create({ user: user });
  await requestRepository.save(request);

  const requestResponse = await createRequestResponseSerializer.validate(
    request,
    { stripUnknown: true }
  );

  return requestResponse;
};

export default createRequestService;
