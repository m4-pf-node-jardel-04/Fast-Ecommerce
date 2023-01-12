import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  ICreateProductToRequest,
  IUpdateProductToRequest,
} from "../interfaces/requests.interfaces";

const createProductToRequestsRequestSerializer: SchemaOf<ICreateProductToRequest> =
  yup.object().shape({
    productId: yup.string().required(),
    quantity: yup.number().positive().required(),
    value: yup.number().positive(),
  });

const updateProductToRequestsRequestSerializer: SchemaOf<IUpdateProductToRequest> =
  yup.object().shape({
    quantity: yup.number().positive().required(),
    value: yup.number(),
  });

export {
  createProductToRequestsRequestSerializer,
  updateProductToRequestsRequestSerializer,
};
