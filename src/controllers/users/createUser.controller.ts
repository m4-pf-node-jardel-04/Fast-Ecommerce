
import { Request, Response } from "express";
import createUserService from "../../services/users/createUser.service";


const createUserController = async(req: Request, res:Response) => {
    
    const newUser = await createUserService();

    return
}

export default createUserController;