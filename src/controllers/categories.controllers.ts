import { Request, Response } from "express";
import createCategoryService from "../services/categories/createCategory.service";
import deleteCategoryService from "../services/categories/deleteCategory.service";
import listCategoriesService from "../services/categories/listCategories.service";
import updateCategoryService from "../services/categories/updateCategory.service";

const createCategoryController = async(req: Request, res:Response) => {
    
    const newCategory = await createCategoryService();

    return
}

const deleteCategoryController = async(req: Request, res:Response) => {
    
    await deleteCategoryService();

    return 
}

const listCategoriesController = async(req: Request, res:Response) => {
    
    const categories = await listCategoriesService();

    return 
}

const updateCategoryController = async(req: Request, res:Response) => {
    
    const updateCategory = await updateCategoryService();

    return 
}

export { createCategoryController, deleteCategoryController, listCategoriesController, updateCategoryController }