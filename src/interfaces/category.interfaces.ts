import Product from "../entities/products.entity"
import { IProductsResponse } from "./product.interfaces"

interface ICategoryRequest {
    name: string
}

interface ICategoryResponse {
    id: string
    name: string
}

interface IproductsInCategoryResponse{
    id: string
    name: string
    product: Array<IProductsResponse>
}

export { ICategoryRequest, ICategoryResponse, IproductsInCategoryResponse }