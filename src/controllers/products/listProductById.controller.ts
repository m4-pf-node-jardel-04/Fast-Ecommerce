
import { Request, Response } from "express"
import listProductByIdService from "../../services/products/listProductById.service"


const listProductByIdController = async(req: Request, res:Response) => {
    
    const product = await listProductByIdService()

    return 
}

export default listProductByIdController