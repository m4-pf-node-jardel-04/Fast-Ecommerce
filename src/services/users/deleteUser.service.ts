import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

const deleteUserService = async (userId: string, userAuth: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const foundUserByParam = await userRepository.findOneBy({ id: userId });
  const foundUserByAuth = await userRepository.findOneBy({ id: userAuth });

  if (!foundUserByParam) {
    throw new AppError("User not found. Informed id is incorrect.", 404);
  };

  if (foundUserByParam.isActive === false) {
    throw new AppError("User already deleted.", 400);
  };

  if (foundUserByAuth.isAdm === false) {
    if (foundUserByAuth.id !== foundUserByParam.id) {
      throw new AppError(
        "User does not have the necessary credentials. Admin permission needed.",
        403
      );
    }
  };

  foundUserByParam.isActive = false;
  await userRepository.save(foundUserByParam);

  return { foundUserByParam };
};

export default deleteUserService;
