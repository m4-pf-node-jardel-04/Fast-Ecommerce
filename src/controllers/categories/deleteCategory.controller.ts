
import { Request, Response } from "express"
import deleteCategoryService from "../../services/categories/deleteCategory.service"


const deleteCategoryController = async(req: Request, res:Response) => {
    
    await deleteCategoryService()

    return 
}

export default deleteCategoryController