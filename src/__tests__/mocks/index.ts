import { ICategoryRequest, ICategoryResponse } from "../../interfaces/category.interfaces";
import { IProductsRequest } from "../../interfaces/product.interfaces";
import { IUserLogin, IUserRequest } from "../../interfaces/user.interfaces";


export const mockedUser: IUserRequest = {
    name: "user",
    email: "user@mail.com",
    isAdm: false,
    password: "123456"
}

export const mockedUserLogin : IUserLogin = {
    email: "user@mail.com",
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

export const mockedCategory : ICategoryResponse = {
    id:"1",
    name: "Electronics"
}

export const mockedEditCategory : ICategoryRequest = {
    name: "automobiles"
}

export const mockedProduct : IProductsRequest = {
    name: "Lucas",
    price: 1000,
    description: "Muito legal, compre",
    image: "Minha Imagem",
    quantity: 2,
    categoryId: ""
}

export const mockedProductUpdate : IProductsRequest = {
    name: "Arrascaeta",
    price: 1001,
    description: "Melhor impossivel",
    image: "Minha Imagem",
    quantity: 2,
    categoryId: ""
}