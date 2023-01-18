import { IUserWithNameAndId } from "./user.interfaces";

export interface IUpdateRequest {
  status: string;
};

export interface ICreateRequestResponse {
  id: string;
  date: string;
  totalQuantity: number;
  totalValue: number;
  status: string;
  user: IUserWithNameAndId;
};

export interface IListRequestResponse {
  id: string;
  date: string;
  totalQuantity: number;
  totalValue: number;
  status: string;
  user: IUserWithNameAndId;
  productTorequest: Array<ICreateProductToRequest>;
};

export interface ICreateProductToRequest {
  productId: string;
  quantity: number;
  value?: number;
  productName?: string;
};

export interface ICreateProductToRequestResponse {
  quantity: number;
  value: number;
  productName: string;
};

export interface IUpdateProductToRequest {
  quantity: number;
  value?: number;
};
