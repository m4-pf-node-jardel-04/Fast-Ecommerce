import { Request, Response } from "express";
import createUserService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import listUserByIdService from "../services/users/listUserById.service";
import listUsersService from "../services/users/listUsers.service";
import updateUserService from "../services/users/updateUser.service";

const createUserController = async(req: Request, res:Response) => {
    
    const newUser = await createUserService();

    return
}

const deleteUserController = async(req: Request, res:Response) => {
    
    await deleteUserService();

    return 
}

const listUserByIdController = async(req: Request, res:Response) => {
    
    const user = await listUserByIdService();

    return 
}

const listUsersController = async(req: Request, res:Response) => {
    
    const users = await listUsersService();

    return 
}

const updateUserController = async(req: Request, res:Response) => {
    
    const updateUser = await updateUserService();

    return 
}

export { createUserController, deleteUserController, listUserByIdController, listUsersController, updateUserController }