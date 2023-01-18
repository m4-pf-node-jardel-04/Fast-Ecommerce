import { IUserResponse, IUserUpdateRequest } from '../../interfaces/user.interfaces'
import AppDataSource from '../../data-source'
import User from '../../entities/user.entity'
import { userResponseSerializer } from '../../serializers/user.serializers'
import { AppError } from '../../errors/AppError'

const updateUserService = async (userData: IUserUpdateRequest, userId: string): Promise<IUserResponse> => {

    const userRepository = AppDataSource.getRepository(User);
    
     const foundUserByParam = await userRepository.findOneBy({id:userId});


    if (!foundUserByParam) {
        throw new AppError("User not found.", 404)
    };

    const {name, email, password} = userData;

    if(!name && !email && !password){
        throw new AppError("You do not have permission to change one of this values", 403)
    };

    const updatedUser = userRepository.create({
        ...foundUserByParam,
        name: name || foundUserByParam.name,
        email: email || foundUserByParam.email,
        password: password || foundUserByParam.password,
        updatedAt: new Date()
    });

    await userRepository.save(updatedUser);

    const userResponse = await userResponseSerializer.validate(updatedUser, {
        stripUnknown: true
    });

    return userResponse;
};


export default updateUserService;