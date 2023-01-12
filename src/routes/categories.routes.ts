import { Router } from "express";
import { createCategoryController, deleteCategoryController, listCategoriesController, updateCategoryController } from "../controllers/categories.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureAdminMiddleare from "../middlewares/ensureAdminMiddleare"
import { categoryRequestSerializer } from "../serializers/category.serializers";



const categoryRoutes = Router();

categoryRoutes.post('', ensureDataIsValidMiddleware(categoryRequestSerializer), ensureAuthMiddleware, ensureAdminMiddleare, createCategoryController);
categoryRoutes.get('', listCategoriesController);
categoryRoutes.patch('/:id', updateCategoryController);
categoryRoutes.delete('/:id', deleteCategoryController);


export default categoryRoutes;