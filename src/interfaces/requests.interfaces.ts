export interface ICreateProductToRequest {
  productId: string;
  quantity: number;
  value?: number;
}

export interface IUpdateProductToRequest {
  quantity: number;
  value?: number;
}
