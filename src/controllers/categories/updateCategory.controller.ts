
import { Request, Response } from "express"
import updateCategoryService from "../../services/categories/updateCategory.service"


const updateCategoryController = async(req: Request, res:Response) => {
    
    const updateCategory = await updateCategoryService()

    return 
}

export default updateCategoryController