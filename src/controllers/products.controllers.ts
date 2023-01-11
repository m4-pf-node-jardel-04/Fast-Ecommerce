import { Request, Response } from "express";
import createProductService from "../services/products/createProduct.service";
import deleteProductService from "../services/products/deleteProduct.service";
import listProductByIdService from "../services/products/listProductById.service";
import listProductsService from "../services/products/listProducts.service";
import updateProductService from "../services/products/updateProduct.service";

const createProductController = async(req: Request, res:Response) => {
    
    const newProduct = await createProductService();

    return
}

const deleteProductController = async(req: Request, res:Response) => {
    
    await deleteProductService();

    return 
}

const listProductByIdController = async(req: Request, res:Response) => {
    
    const product = await listProductByIdService();

    return 
}

const listProductsController = async(req: Request, res:Response) => {
    
    const products = await listProductsService();

    return 
}

const updateProductController = async(req: Request, res:Response) => {
    
    const updateProduct = await updateProductService();

    return 
}

export { createProductController, deleteProductController, listProductByIdController, listProductsController, updateProductController }