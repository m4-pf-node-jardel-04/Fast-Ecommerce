import { Router } from "express";
import {
  createAddressController,
  deleteAddressController,
  listAddressesController,
  updateAddressController,
} from "../controllers/addresses.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { addressSerializer } from "../serializers/address.serializers";

const addressRoutes = Router();

addressRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware(addressSerializer),
  createAddressController
);
addressRoutes.get("", listAddressesController);
addressRoutes.patch("/:id", updateAddressController);
addressRoutes.delete("/:id", deleteAddressController);

export default addressRoutes;
