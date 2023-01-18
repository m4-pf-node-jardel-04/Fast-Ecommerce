export interface IProductsRequest {
  name: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
  categoryId: string;
};

export interface IProductsUpdate {
  name: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
};

export interface IProductsResponse {
  name: string;
  id: string
  price: number;
  description: string;
  image: string;
  quantity: number;
};
