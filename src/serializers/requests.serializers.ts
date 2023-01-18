import * as yup from "yup";
import { SchemaOf } from "yup";
import { ICreateProductToRequest, ICreateProductToRequestResponse,
  IUpdateRequest, ICreateRequestResponse, IListRequestResponse,
  IUpdateProductToRequest,
} from "../interfaces/requests.interfaces";
import { userWithNameAndIdSerializer } from "./user.serializers";

const updateRequestSerializer: SchemaOf<IUpdateRequest> = yup.object().shape({
  status: yup.string().oneOf(["finalizado"]).required(),
});

const createRequestResponseSerializer: SchemaOf<ICreateRequestResponse> = yup.object().shape({
  user: userWithNameAndIdSerializer,
  status: yup.string(),
  totalQuantity: yup.number(),
  totalValue: yup.number(),
  date: yup.string(),
  id: yup.string(),
});

const createProductToRequestsRequestSerializer: SchemaOf<ICreateProductToRequest> =yup.object().shape({
  productName: yup.string(),
  productId: yup.string().required(),
  quantity: yup.number().positive().required(),
  value: yup.number().positive(),
});

const createProductToRequestsResponseSerializer: SchemaOf<ICreateProductToRequestResponse> =yup.object().shape({
  productName: yup.string(),
  quantity: yup.number(),
  value: yup.number(),
});

const updateProductToRequestsRequestSerializer: SchemaOf<IUpdateProductToRequest> =yup.object().shape({
  quantity: yup.number().positive().required(),
  value: yup.number(),
});

const listRequestByIdResponseSerializer: SchemaOf<IListRequestResponse> = yup.object().shape({
  productTorequest: yup.array(),
  user: userWithNameAndIdSerializer,
  status: yup.string(),
  totalQuantity: yup.number(),
  totalValue: yup.number(),
  date: yup.string(),
  id: yup.string(),
});

const listAllRequestsResponseSerializer = yup.array(
  listRequestByIdResponseSerializer
);

export {
  createProductToRequestsRequestSerializer,
  updateProductToRequestsRequestSerializer,
  updateRequestSerializer,
  createRequestResponseSerializer,
  createProductToRequestsResponseSerializer,
  listRequestByIdResponseSerializer,
  listAllRequestsResponseSerializer,
};
