import { Router } from "express";
import {
  createProductToRequestController,
  deleteProductToRequestController,
  listProductsToRequestController,
  updateProductToRequestController,
} from "../controllers/productsToRequests.controllers";
import {
  createRequestController,
  deleteRequestController,
  listAllRequestsController,
  listRequestByIdController,
  updateRequestController,
} from "../controllers/requests.controllers";
import ensureAdminMiddleare from "../middlewares/ensureAdminMiddleware";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureRequestExistsMiddleware from "../middlewares/ensureRequestExists.middleware";
import {
  createProductToRequestsRequestSerializer,
  updateProductToRequestsRequestSerializer,
  updateRequestSerializer,
} from "../serializers/requests.serializers";

const requestsRoutes = Router();

requestsRoutes.post("", ensureAuthMiddleware, createRequestController);

requestsRoutes.get(
  "/:id",
  ensureAuthMiddleware,
  ensureRequestExistsMiddleware,
  listRequestByIdController
);

requestsRoutes.get(
  "",
  ensureAuthMiddleware,
  ensureAdminMiddleare,
  listAllRequestsController
);

requestsRoutes.patch(
  "/:id",
  ensureDataIsValidMiddleware(updateRequestSerializer),
  ensureAuthMiddleware,
  ensureRequestExistsMiddleware,
  updateRequestController
);

requestsRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureRequestExistsMiddleware,
  deleteRequestController
);

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
