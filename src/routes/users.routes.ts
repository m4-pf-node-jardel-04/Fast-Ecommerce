import { Router } from "express";
import { createUserController, deleteUserController, listUserByIdController, listUsersController, updateUserController,} from "../controllers/users.controllers";
import ensureAdminMiddleware from "../middlewares/ensureAdminMiddleware";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { userLoginSerializer, userUpdateSchema } from "../serializers/user.serializers";
import { loginUserController } from "../controllers/users.controllers";
import { userRequestSerializer } from "../serializers/user.serializers";
import ensureAdmOrUserMiddleware from "../middlewares/ensureAdmOrUser.middleware";

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
  ensureAuthMiddleware, ensureAdmOrUserMiddleware,
  ensureAdminMiddleware,
  listUsersController
);

userRoutes.patch("/:id", ensureAuthMiddleware,  ensureAdmOrUserMiddleware, ensureDataIsValidMiddleware(userUpdateSchema), updateUserController);
userRoutes.delete("/:id", ensureAuthMiddleware, deleteUserController);
userRoutes.get("/:id", ensureAuthMiddleware, listUserByIdController);

export default userRoutes;
