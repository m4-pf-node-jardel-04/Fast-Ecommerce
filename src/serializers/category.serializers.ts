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

export { categoryRequestSerializer, categoryResponseSerializer }
