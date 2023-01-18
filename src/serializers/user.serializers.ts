import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IUserRequest,
  IUserResponse,
  IUserUpdateRequest,
  IUserLogin,
  IUserWithNameAndId,
} from "../interfaces/user.interfaces";

const userRequestSerializer: SchemaOf<IUserRequest> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  isAdm: yup.boolean().notRequired()
});

const userResponseSerializer: SchemaOf<IUserResponse> = yup.object().shape({
  id: yup.string().notRequired(),
  name: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  isAdm: yup.boolean().notRequired(),
  isActive: yup.boolean().notRequired(),
  createdAt: yup.date().notRequired(),
  updatedAt: yup.date().notRequired(),
});

const userUpdateSerializer: SchemaOf<IUserUpdateRequest> = yup.object().shape({
  email: yup.string().email(),
  name: yup.string(),
  password: yup.string(),
});

const userLoginSerializer: SchemaOf<IUserLogin> = yup.object().shape({
  email: yup.string().email().notRequired(),
  password: yup.string().notRequired(),
});

const userResponseSerializerArray: SchemaOf<IUserResponse[]> = yup.array(
  userResponseSerializer
);

const userWithNameAndIdSerializer: SchemaOf<IUserWithNameAndId> = yup.object().shape({
  id: yup.string(),
  name: yup.string(),
});


const userUpdateSchema: SchemaOf<IUserUpdateRequest> = yup.object().shape({
  name: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  password: yup.string().notRequired()
})

export {
  userResponseSerializer,
  userUpdateSerializer,
  userResponseSerializerArray,
  userRequestSerializer,
  userLoginSerializer,
  userWithNameAndIdSerializer,
  userUpdateSchema
};
