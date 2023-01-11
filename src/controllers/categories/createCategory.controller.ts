
import { Request, Response } from "express";
import createCategoryService from "../../services/categories/createCategory.service";


const createCategoryController = async(req: Request, res:Response) => {
    
    const newCategory = await createCategoryService();

    return
}

export default createCategoryController;