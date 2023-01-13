import { IUserRequest, IUserResponse } from "../../interfaces/user.interfaces";
import User from "../../entities/user.entity";
import AppDataSource from "../../data-source";
import {
  userResponseSerializer,
  userRequestSerializer,
} from "../../serializers/user.serializers";
import { AppError } from "../../errors/AppError";

const createUserService = async (
  userData: IUserRequest
): Promise<IUserResponse> => {
  const userRepository = AppDataSource.getRepository(User);

  const foundUser = await userRepository.findOne({
    where: {
      email: userData.email,
    },
  });

  if (foundUser) {
    throw new AppError("User already exists.", 409);
  }

  const createUser = userRepository.create(userData);

  await userRepository.save(createUser);

  const createdUserResponse = await userResponseSerializer.validate(
    createUser,
    {
      stripUnknown: true,
    },
  );
  
  return createdUserResponse;
  
};

export default createUserService;
