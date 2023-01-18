import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IProductsRequest,
  IProductsResponse,
  IProductsUpdate,
} from "../interfaces/product.interfaces";

const createProductRequestSerializer: SchemaOf<IProductsRequest> = yup.object().shape({
  name: yup.string().max(100).required(),
  price: yup.number().positive().required(),
  description: yup.string().max(500).required(),
  image: yup.string().max(100).required(),
  quantity: yup.number().positive().required(),
  categoryId: yup.string().required(),
});

const updateProductSerializer: SchemaOf<IProductsUpdate> = yup.object().shape({
  name: yup.string().max(100).required(),
  price: yup.number().positive().required(),
  description: yup.string().max(500).required(),
  image: yup.string().max(100).required(),
  quantity: yup.number().positive().required(),
});

const listProductReponse: SchemaOf<IProductsResponse> = yup.object().shape({
  name: yup.string().max(100).required(),
  id: yup.string().required(),
  price: yup.number().positive().required(),
  description: yup.string().max(500).required(),
  image: yup.string().max(100).required(),
  quantity: yup.number().positive().required(),
});
export { createProductRequestSerializer,updateProductSerializer, listProductReponse };
