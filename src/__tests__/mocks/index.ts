import { ICategoryRequest } from "../../interfaces/category.interfaces";
import { IUserLogin, IUserRequest } from "../../interfaces/user.interfaces";


export const mockedUser: IUserRequest = {
    name: "user",
    email: "user@mail.com",
    isAdm: false,
    password: "123456"
}

export const mockedAdmin : IUserRequest = {
    name: "admin",
    email: "admin@mail.com",
    isAdm: true,
    password: "123456"
}

export const mockedAdminLogin : IUserLogin = {
    email: "admin@mail.com",
    password: "123456"
}

export const mockedCategory : ICategoryRequest = {
    name: "Electronics"
}

export const mockedEditCategory : ICategoryRequest = {
    name: "automobiles"
}