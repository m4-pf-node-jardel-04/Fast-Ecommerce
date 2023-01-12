import * as yup from "yup"
import { SchemaOf } from "yup"
import { ICategoryRequest, ICategoryResponse } from "../interfaces/category.interfaces"

const  categoryRequestSerializer: SchemaOf<ICategoryRequest> = yup.object().shape({
    name: yup.string().lowercase().max(50).required()
})

const categoryResponseSerializer: SchemaOf<ICategoryResponse> = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required()

})

const allcategoryResponseSerializer: SchemaOf<Array<ICategoryResponse>> = yup.array(categoryResponseSerializer)

const productsInCategoryResponseSerializer = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required(),
    product: yup.array(yup.object().shape({
        id: yup.string().required(),
        name: yup.string().required(),
        price: yup.number().required(),
        description: yup.string().required(),
        image: yup.string(),
        quantity: yup.number().required()
    })).required()
})

export { categoryRequestSerializer, categoryResponseSerializer, allcategoryResponseSerializer, productsInCategoryResponseSerializer }
