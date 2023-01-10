import { Router } from "express"
import createCategoryController from "../controllers/categories/createCategory.controller"
import deleteCategoryController from "../controllers/categories/deleteCategory.controller"
import listCategoriesController from "../controllers/categories/listCategories.controller"
import updateCategoryController from "../controllers/categories/updateCategory.controller"


const categoryRoutes = Router()

categoryRoutes.post('', createCategoryController)
categoryRoutes.get('', listCategoriesController)
categoryRoutes.patch('/:id', updateCategoryController)
categoryRoutes.delete('/:id', deleteCategoryController)


export default categoryRoutes