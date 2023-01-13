import AppDataSource from "../../data-source";
import Request from "../../entities/request.entity";

const listAllRequestsService = async (): Promise<Request[]> => {
  const requestRepository = AppDataSource.getRepository(Request);

  const requests = await requestRepository.find();

  return requests;
};

export default listAllRequestsService;
