import { Router } from "express";
import { createCategoryController, deleteCategoryController, listCategoriesController, updateCategoryController } from "../controllers/categories.controllers";



const categoryRoutes = Router();

categoryRoutes.post('', createCategoryController);
categoryRoutes.get('', listCategoriesController);
categoryRoutes.patch('/:id', updateCategoryController);
categoryRoutes.delete('/:id', deleteCategoryController);


export default categoryRoutes;