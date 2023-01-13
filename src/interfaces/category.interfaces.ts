import Product from "../entities/products.entity"

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
    product: Array<Product>
}

export { ICategoryRequest, ICategoryResponse, IproductsInCategoryResponse }