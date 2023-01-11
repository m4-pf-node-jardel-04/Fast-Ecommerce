
import { Request, Response } from "express";
import updateUserService from "../../services/users/updateUser.service";


const updateUserController = async(req: Request, res:Response) => {
    
    const updateUser = await updateUserService();

    return 
}

export default updateUserController;