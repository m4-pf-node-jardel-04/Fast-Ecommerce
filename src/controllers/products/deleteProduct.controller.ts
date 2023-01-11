
import { Request, Response } from "express";
import deleteProductService from "../../services/products/deleteProduct.service";


const deleteProductController = async(req: Request, res:Response) => {
    
    await deleteProductService();

    return 
}

export default deleteProductController;