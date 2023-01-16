import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IAddressRequest,
  IAddress,
  IAddressUpdate,
} from "../interfaces/address.interfaces";
import { userWithNameAndIdSerializer } from "./user.serializers";

const addressSerializer: SchemaOf<IAddressRequest> = yup.object().shape({
  nickname: yup.string().max(50).required(),
  district: yup.string().max(50).required(),
  zipCode: yup.string().max(8).required(),
  number: yup.number(),
  complement: yup.string(),
  city: yup.string().max(50).required(),
  state: yup.string().min(2).max(2).lowercase().required(),
});

const adressWithIdSerializer: SchemaOf<IAddress> = yup.object().shape({
  id: yup.string().notRequired(),
  nickname: yup.string().max(50).notRequired(),
  district: yup.string().max(50).notRequired(),
  zipCode: yup.string().max(8).notRequired(),
  number: yup.number().notRequired(),
  complement: yup.string().notRequired(),
  city: yup.string().max(50).notRequired(),
  state: yup.string().min(2).max(2).notRequired(),
  user: userWithNameAndIdSerializer,
});

const updateAdressSerializer: SchemaOf<IAddressUpdate> = yup.object().shape({
  nickname: yup.string().max(50).notRequired(),
  district: yup.string().max(50).notRequired(),
  zipCode: yup.string().max(8).notRequired(),
  number: yup.number().notRequired(),
  complement: yup.string().notRequired(),
  city: yup.string().max(50).notRequired(),
  state: yup.string().min(2).max(2).lowercase().notRequired(),
});

const returnedAddressDataSerializer = yup.array(adressWithIdSerializer);

export {
  addressSerializer,
  adressWithIdSerializer,
  returnedAddressDataSerializer,
  updateAdressSerializer,
};
