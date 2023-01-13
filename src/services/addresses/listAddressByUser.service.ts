import dataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import User from "../../entities/user.entity";

const listAddressByUserService = async (id: string): Promise<User> => {
  const userRepo = dataSource.getRepository(User);

  const user = await userRepo.findOne({
    where: { id: id },
    relations: { address: true },
  });

  if (!user) {
    throw new AppError("User Not Found", 404);
  }

  return user;
};

export default listAddressByUserService;
