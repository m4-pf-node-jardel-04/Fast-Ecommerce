import { Router } from "express";
import {
  createProductToRequestController,
  deleteProductToRequestController,
  listProductsToRequestController,
  updateProductToRequestController,
} from "../controllers/productsToRequests.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureRequestExistsMiddleware from "../middlewares/ensureRequestExists.middleware";
import {
  createProductToRequestsRequestSerializer,
  updateProductToRequestsRequestSerializer,
} from "../serializers/requests.serializers";

const requestsRoutes = Router();

requestsRoutes.post(
  "/:id/products",
  ensureDataIsValidMiddleware(createProductToRequestsRequestSerializer),
  ensureAuthMiddleware,
  ensureRequestExistsMiddleware,
  createProductToRequestController
);

requestsRoutes.get(
  "/:id/products",
  ensureAuthMiddleware,
  ensureRequestExistsMiddleware,
  listProductsToRequestController
);

requestsRoutes.patch(
  "/:id/products/:productId",
  ensureDataIsValidMiddleware(updateProductToRequestsRequestSerializer),
  ensureAuthMiddleware,
  ensureRequestExistsMiddleware,
  updateProductToRequestController
);

requestsRoutes.delete(
  "/:id/products/:productId",
  ensureAuthMiddleware,
  ensureRequestExistsMiddleware,
  deleteProductToRequestController
);

export default requestsRoutes;
