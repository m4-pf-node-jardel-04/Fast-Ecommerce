import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  ICreateProductToRequest,
  ICreateRequest,
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

const createRequestSerializer: SchemaOf<ICreateRequest> = yup.object().shape({
  status: yup
    .string()
    .transform((status) => {
      status = "finalizado";
    })
    .required(),
});

export {
  createProductToRequestsRequestSerializer,
  updateProductToRequestsRequestSerializer,
  createRequestSerializer,
};
