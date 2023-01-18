import { Request, Response } from "express";
import { ICategoryRequest } from "../interfaces/category.interfaces";
import createCategoryService from "../services/categories/createCategory.service";
import deleteCategoryService from "../services/categories/deleteCategory.service";
import listCategoriesService from "../services/categories/listCategories.service";
import listProductsInCategoryService from "../services/categories/listProductsInCategory.service";
import updateCategoryService from "../services/categories/updateCategory.service";

const createCategoryController = async(req: Request, res:Response) => {

    const categoryName: ICategoryRequest = req.body;
    const newCategory = await createCategoryService(categoryName);

    return res.status(201).json(newCategory);
}

const listCategoriesController = async(req: Request, res:Response) => {
    
    const categories = await listCategoriesService();

    return res.status(200).json(categories);
}

const updateCategoryController = async(req: Request, res:Response) => {

    const datacategory: ICategoryRequest = req.body;
    const IdCategory: string = req.params.id;
    const updateCategory = await updateCategoryService(datacategory, IdCategory);

    return res.status(204).json(updateCategory);
}

const deleteCategoryController = async(req: Request, res:Response) => {
    const IdCategory: string = req.params.id;
    const deleteCategory = await deleteCategoryService(IdCategory);

    return res.status(204).json(deleteCategory);
}

const listProductsInCategoryController = async(req: Request, res:Response) => {
    const IdCategory: string = req.params.id;
    const productsInCategory =  await listProductsInCategoryService(IdCategory);

    return res.status(200).json(productsInCategory);
}

export {
    createCategoryController,
    deleteCategoryController, 
    listCategoriesController, 
    updateCategoryController, 
    listProductsInCategoryController 
};