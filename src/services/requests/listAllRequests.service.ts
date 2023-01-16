import AppDataSource from "../../data-source";
import Request from "../../entities/request.entity";
import { listAllRequestsResponseSerializer } from "../../serializers/requests.serializers";

const listAllRequestsService = async () => {
  const requestRepository = AppDataSource.getRepository(Request);

  const requests = await requestRepository.find({
    relations: { user: true, productTorequest: true },
  });

  const requestsReturn = await listAllRequestsResponseSerializer.validate(
    requests,
    { stripUnknown: true }
  );

  return requestsReturn;
};

export default listAllRequestsService;
