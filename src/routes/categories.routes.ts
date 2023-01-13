import { Router } from "express";
import { createCategoryController, deleteCategoryController, listCategoriesController, listProductsInCategoryController, updateCategoryController } from "../controllers/categories.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureAdminMiddleare from "../middlewares/ensureAdminMiddleware"
import { categoryRequestSerializer } from "../serializers/category.serializers";



const categoryRoutes = Router();

categoryRoutes.post('', ensureDataIsValidMiddleware(categoryRequestSerializer), ensureAuthMiddleware, ensureAdminMiddleare, createCategoryController);
categoryRoutes.get('', listCategoriesController);
categoryRoutes.get('/:id/products', listProductsInCategoryController);
categoryRoutes.patch('/:id', ensureDataIsValidMiddleware(categoryRequestSerializer), ensureAuthMiddleware, ensureAdminMiddleare, updateCategoryController);
categoryRoutes.delete('/:id', ensureAuthMiddleware, ensureAdminMiddleare, deleteCategoryController);


export default categoryRoutes;