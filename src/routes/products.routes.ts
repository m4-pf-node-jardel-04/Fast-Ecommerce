import { Router } from "express";
import { createProductController, deleteProductController, listProductByIdController, listProductsController, updateProductController } from "../controllers/products.controllers";




const productRoutes = Router();

productRoutes.post('', createProductController);
productRoutes.get('', listProductsController);
productRoutes.patch('/:id', updateProductController);
productRoutes.delete('/:id', deleteProductController);
productRoutes.get('/:id', listProductByIdController);


export default productRoutes;