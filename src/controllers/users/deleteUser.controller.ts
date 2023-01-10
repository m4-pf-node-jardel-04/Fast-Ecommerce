
import { Request, Response } from "express"
import deleteUserService from "../../services/users/deleteUser.service"


const deleteUserController = async(req: Request, res:Response) => {
    
    await deleteUserService()

    return 
}

export default deleteUserController