import { Router } from "express";
import { createUserController, deleteUserController, listUserByIdController, listUsersController, updateUserController } from "../controllers/users.controllers";


const userRoutes = Router();

userRoutes.post('', createUserController);
userRoutes.get('', listUsersController);
userRoutes.patch('/:id', updateUserController);
userRoutes.delete('/:id', deleteUserController);
userRoutes.get('/:id', listUserByIdController);


export default userRoutes;