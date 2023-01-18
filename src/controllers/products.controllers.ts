import { Request, Response } from "express";
import { IProductsRequest, IProductsUpdate } from "../interfaces/product.interfaces";
import createProductService from "../services/products/createProduct.service";
import deleteProductService from "../services/products/deleteProduct.service";
import listProductsService from "../services/products/listProducts.service";
import updateProductService from "../services/products/updateProduct.service";
import listProductByIdService from "../services/products/listProductsById.service";

const createProductController = async (req: Request, res: Response) => {
  const values: IProductsRequest = req.body;
  const [status, createProduct] = await createProductService(values);

  return res.status(status as number).json(createProduct);
};

const deleteProductController = async (req: Request, res: Response) => {
  await deleteProductService(req.params.id);

  return res.status(204).send();
};

const listProductsController = async (req: Request, res: Response) => {
  const products = await listProductsService();

  return res.json(products);
};

const updateProductController = async (req: Request, res: Response) => {
  const productData: IProductsUpdate = req.body;
  const productId = req.params.id;
  const updateProduct = await updateProductService(productData, productId);

  return res.status(200).json(updateProduct);
};

const listProductByIdController = async (req: Request, res: Response) => {
  const productId = req.params.id
  const products = await listProductByIdService(productId);

  return res.status(200).json(products);
};

export {
  createProductController,
  deleteProductController,
  listProductsController,
  updateProductController,
  listProductByIdController
};
