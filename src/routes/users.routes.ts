import { Router } from "express"
import createUserController from "../controllers/users/createUser.controller"
import deleteUserController from "../controllers/users/deleteUser.controller"
import listUserByIdController from "../controllers/users/listUserById.controller"
import listUsersController from "../controllers/users/listUsers.controller"
import updateUserController from "../controllers/users/updateUser.controller"


const userRoutes = Router()

userRoutes.post('', createUserController)
userRoutes.get('', listUsersController)
userRoutes.patch('/:id', updateUserController)
userRoutes.delete('/:id', deleteUserController)
userRoutes.get('/:id', listUserByIdController)


export default userRoutes