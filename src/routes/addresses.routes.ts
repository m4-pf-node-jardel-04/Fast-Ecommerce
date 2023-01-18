import { Router } from "express";
import {
  createAddressController,
  deleteAddressController,
  listAddressesController,
  listAddressByUserController,
  updateAddressController,
} from "../controllers/addresses.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureAdminMiddleare from "../middlewares/ensureAdminMiddleware";
import ensureDeleteOrEditAddressMiddleware from "../middlewares/ensureDeleteOrEditAddress.middleware";
import ensureFieldsAddresMiddleware from "../middlewares/ensureFieldsAddress.middleware";
import ensureAdmOrUserMiddleware from "../middlewares/ensureAdmOrUser.middleware";
import {
  addressSerializer,
  updateAdressSerializer,
} from "../serializers/address.serializers";

const addressRoutes = Router();

addressRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureFieldsAddresMiddleware,
  ensureDataIsValidMiddleware(addressSerializer),
  createAddressController
);

addressRoutes.get(
  "",
  ensureAuthMiddleware,
  ensureAdminMiddleare,
  listAddressesController
);

addressRoutes.get(
  "/:id",
  ensureAuthMiddleware,
  ensureAdmOrUserMiddleware,
  listAddressByUserController
);

addressRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureDeleteOrEditAddressMiddleware,
  ensureFieldsAddresMiddleware,
  ensureDataIsValidMiddleware(updateAdressSerializer),
  updateAddressController
);

addressRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureDeleteOrEditAddressMiddleware,
  deleteAddressController
);

export default addressRoutes;
