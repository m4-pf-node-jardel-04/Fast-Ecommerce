import { Request, Response } from "express";
import { IUserLogin, IUserRequest, IUserUpdateRequest } from "../interfaces/user.interfaces";
import createUserService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import listUserByIdService from "../services/users/listUserById.service";
import listUsersService from "../services/users/listUsers.service";
import updateUserService from "../services/users/updateUser.service";
import loginUserService from "../services/users/loginUser.service";

const loginUserController = async (req: Request, res: Response) => {
    const userData: IUserLogin = req.body;

    const token = await loginUserService(userData);

    return res.status(200).json({token});
};

const createUserController = async (req: Request, res: Response) => {
    const userData: IUserRequest = req.body;
    const newUser = await createUserService(userData);

    return res.status(201).json(newUser);
};

const listUsersController = async (req: Request, res: Response) => {
    const users = await listUsersService();

    return res.status(200).json(users);
};

const listUserByIdController = async (req: Request, res: Response) => {
    const userId: string = req.params.id;
    const userAuth : string = req.user.id;
    const users = await listUserByIdService(userId, userAuth);

    return res.status(200).json(users);
};

const updateUserController = async(req: Request, res:Response) => {
    const userData: IUserUpdateRequest = req.body;
    const userId = req.params.id;
    const updatedUser = await updateUserService(userData, userId);

    return res.json(updatedUser);
};

const deleteUserController = async (req: Request, res: Response) => {
    const userId: string = req.params.id;
    const userAuth: string = req.user.id;

    await deleteUserService(userId, userAuth);

    return res.status(204).send();
};

export { loginUserController, createUserController, deleteUserController, listUserByIdController, listUsersController, updateUserController };