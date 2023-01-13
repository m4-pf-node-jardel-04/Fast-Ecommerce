import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserRequest, IUserResponse, IUserUpdateRequest, IUserLogin, IUserResponseDelete} from "../interfaces/user.interfaces";

const userRequestSerializer: SchemaOf<IUserRequest> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required()
});

  const userResponseSerializer: SchemaOf<IUserResponse> = yup
  .object()
  .shape({
    id: yup.string().notRequired(),
    name: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    isAdm: yup.boolean().notRequired(),
    isActive: yup.boolean().notRequired(),
    createdAt: yup.date().notRequired(),
    updatedAt: yup.date().notRequired()
  });

const userUpdateSerializer: SchemaOf<IUserUpdateRequest> = yup.object().shape({
  email: yup.string().email(),
  name: yup.string(),
  password: yup.string(),
});

const userLoginSerializer: SchemaOf<IUserLogin> = yup.object().shape({
  email: yup.string().email().notRequired(),
  password: yup.string().notRequired()
});

  const userResponseSerializerArray: SchemaOf<IUserResponse[]> = yup.array(
    userResponseSerializer
  );

export { userResponseSerializer, userUpdateSerializer, userResponseSerializerArray, userRequestSerializer, userLoginSerializer };
