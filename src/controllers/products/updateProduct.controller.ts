
import { Request, Response } from "express"
import updateProductService from "../../services/products/updateProduct.service"


const updateProductController = async(req: Request, res:Response) => {
    
    const updateProduct = await updateProductService()

    return 
}

export default updateProductController