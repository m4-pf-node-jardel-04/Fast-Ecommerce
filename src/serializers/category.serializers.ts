import * as yup from "yup";
import { SchemaOf } from "yup";
import { ICategoryRequest, ICategoryResponse } from "../interfaces/category.interfaces";
import { listProductReponse } from "./product.serializers";

const  categoryRequestSerializer: SchemaOf<ICategoryRequest> = yup.object().shape({
    name: yup.string().lowercase().max(50).required()
});

const categoryResponseSerializer: SchemaOf<ICategoryResponse> = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required()

});

const allcategoryResponseSerializer: SchemaOf<Array<ICategoryResponse>> = yup.array(categoryResponseSerializer);

const productsInCategoryResponseSerializer = yup.object().shape({
    product: yup.array(listProductReponse),
    name: yup.string().required(),
    id: yup.string().required(),
});

export { categoryRequestSerializer, categoryResponseSerializer,
allcategoryResponseSerializer, productsInCategoryResponseSerializer 
};
