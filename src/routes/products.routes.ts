import { Router } from "express"
import createProductController from "../controllers/products/createProduct.controller"
import deleteProductController from "../controllers/products/deleteProduct.controller"
import listProductByIdController from "../controllers/products/listProductById.controller"
import listProductsController from "../controllers/products/listProducts.controller"
import updateProductController from "../controllers/products/updateProduct.controller"



const productRoutes = Router()

productRoutes.post('', createProductController)
productRoutes.get('', listProductsController)
productRoutes.patch('/:id', updateProductController)
productRoutes.delete('/:id', deleteProductController)
productRoutes.get('/:id', listProductByIdController)


export default productRoutes