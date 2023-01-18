import { IUserResponse } from '../../interfaces/user.interfaces';
import AppDataSource from '../../data-source';
import User from '../../entities/user.entity';
import { userResponseSerializerArray } from '../../serializers/user.serializers';

const listUsersService = async (): Promise<IUserResponse[]> => {

  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const userResponseArray = userResponseSerializerArray.validate(users, {
    stripUnknown: true,
  });

  return userResponseArray;
}  ;

export default listUsersService;