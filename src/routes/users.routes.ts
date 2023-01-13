import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listUserByIdController,
  listUsersController,
  updateUserController,
} from "../controllers/users.controllers";
import ensureAdminMiddleware from "../middlewares/ensureAdminMiddleware";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { userLoginSerializer } from "../serializers/user.serializers";
import { loginUserController } from "../controllers/users.controllers";
import { userRequestSerializer } from "../serializers/user.serializers";

const userRoutes = Router();

userRoutes.post(
  "/login",
  ensureDataIsValidMiddleware(userLoginSerializer),
  loginUserController
);
userRoutes.post(
  "",
  ensureDataIsValidMiddleware(userRequestSerializer),
  createUserController
);
userRoutes.get(
  "",
  ensureAuthMiddleware,
  ensureAdminMiddleware,
  listUsersController
);

userRoutes.patch("/:id", ensureAuthMiddleware, updateUserController);
userRoutes.delete("/:id", ensureAuthMiddleware, deleteUserController);
userRoutes.get("/:id", ensureAuthMiddleware, listUserByIdController);

export default userRoutes;
