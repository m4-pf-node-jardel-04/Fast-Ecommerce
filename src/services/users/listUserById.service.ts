import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
    
const listUserByIdService = async (userId:string, userAuth: string
    ) => {
    const userRepository = AppDataSource.getRepository(User);
    const foundUserByParam = await userRepository.findOneBy({id:userId});
    const foundUserByAuth = await userRepository.findOneBy({id:userAuth});

    if (!foundUserByAuth){
        throw new AppError("User does not have the necessary credentials. Login needed.", 403);
    };

    if (!foundUserByParam) {
        throw new AppError("User not found", 404);
      }

    if (foundUserByAuth.isAdm === false) {
        if ( foundUserByAuth.id !== foundUserByParam.id) {
            throw new AppError("User does not have the necessary credentials. Admin permission needed.", 403);
        };
    };

    return {foundUserByParam};
}

export default listUserByIdService;