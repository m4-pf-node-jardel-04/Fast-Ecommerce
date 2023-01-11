
import { Request, Response } from "express";
import listProductsService from "../../services/products/listProducts.service";


const listProductsController = async(req: Request, res:Response) => {
    
    const products = await listProductsService();

    return 
}

export default listProductsController;