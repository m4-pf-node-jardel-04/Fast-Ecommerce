import { IUserResponse, IUserUpdateRequest } from '../../interfaces/user.interfaces'
import AppDataSource from '../../data-source'
import User from '../../entities/user.entity'
import { userResponseSerializer } from '../../serializers/user.serializers'
import { AppError } from '../../errors/AppError'

const updateUserService = async (userData: IUserUpdateRequest, userId: string, userAuth: string): Promise<IUserResponse> => {

    const userRepository = AppDataSource.getRepository(User)
    
     const foundUserByParam = await userRepository.findOneBy({id:userId})
    const foundUserByAuth = await userRepository.findOneBy({id:userAuth})

    if (!foundUserByParam) {
        throw new AppError("User not found.", 404)
    }

    if (foundUserByAuth.isAdm === false) {
        if ( foundUserByAuth.id !== foundUserByParam.id) {
            throw new AppError("User does not have the necessary credentials. Admin permission needed.", 403);
        }

    if (userData.hasOwnProperty('isAdm') || userData.hasOwnProperty('id')){
        throw new AppError("Invalid data.", 403);
    }

    const updatedUser = userRepository.create({
        ...foundUserByParam,
        ...userData,
        updatedAt: new Date()
    })

    await userRepository.save(updatedUser)

    const userResponse = await userResponseSerializer.validate(updatedUser, {
        stripUnknown: true
    })

    return userResponse
}

}

export default updateUserService