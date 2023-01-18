import { IProductsResponse } from "./product.interfaces"

export interface ICategoryRequest {
    name: string
};

export interface ICategoryResponse {
    id: string
    name: string
};

export interface IproductsInCategoryResponse{
    id: string
    name: string
    product: Array<IProductsResponse>
};

