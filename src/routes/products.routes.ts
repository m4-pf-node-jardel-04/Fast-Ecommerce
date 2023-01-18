import { Router } from "express";
import { createProductController, deleteProductController, listProductByIdController, listProductsController, updateProductController } from "../controllers/products.controllers";
import ensureAdminMiddleare from "../middlewares/ensureAdminMiddleware";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { createProductRequestSerializer, updateProductSerializer } from "../serializers/product.serializers";




const productRoutes = Router();

productRoutes.post('',ensureAuthMiddleware,ensureAdminMiddleare,ensureDataIsValidMiddleware(createProductRequestSerializer), createProductController);
productRoutes.get('', listProductsController);
productRoutes.patch('/:id', ensureAuthMiddleware,ensureAdminMiddleare,ensureDataIsValidMiddleware(updateProductSerializer),updateProductController);
productRoutes.delete('/:id', ensureAuthMiddleware,ensureAdminMiddleare,deleteProductController);
productRoutes.get("/:id",  listProductByIdController);



export default productRoutes;