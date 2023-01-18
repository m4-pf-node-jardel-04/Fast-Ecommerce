import { Request, Response } from "express";
import {
  ICreateProductToRequest,
  IUpdateProductToRequest,
} from "../interfaces/requests.interfaces";
import createProductToRequestService from "../services/productsToRequests/createProductToRequest.service";
import deleteProductToRequestService from "../services/productsToRequests/deleteProductToRequest.service";
import listProductsToRequestService from "../services/productsToRequests/listProductsToRequest.service";
import updateProductToRequestService from "../services/productsToRequests/updateProductToRequest.service";

const createProductToRequestController = async (req: Request, res: Response ) => {
  const requestId: string = req.params.id;
  const userId: string = req.user.id;
  const productData: ICreateProductToRequest = req.body;
  const productToRequest = await createProductToRequestService(
    requestId,
    userId,
    productData
  );

  return res.status(201).json(productToRequest);
};

const listProductsToRequestController = async (req: Request, res: Response) => {
  const requestId: string = req.params.id;
  const userId: string = req.user.id;
  const productsToRequestlist = await listProductsToRequestService(
    requestId,
    userId
  );

  return res.json(productsToRequestlist);
};

const updateProductToRequestController = async (req: Request, res: Response) => {
  const requestId: string = req.params.id;
  const userId: string = req.user.id;
  const productId: string = req.params.productId;
  const updatedData: IUpdateProductToRequest = req.body;
  const updatedProductToRequest = await updateProductToRequestService(
    requestId,
    userId,
    productId,
    updatedData
  );

  return res.json(updatedProductToRequest);
};

const deleteProductToRequestController = async (req: Request, res: Response) => {
  const requestId: string = req.params.id;
  const userId: string = req.user.id;
  const productId: string = req.params.productId;
  const deletedProductToRequest = await deleteProductToRequestService(
    requestId,
    userId,
    productId
  );

  return res.status(204).json(deletedProductToRequest);
};

export {
  createProductToRequestController,
  listProductsToRequestController,
  updateProductToRequestController,
  deleteProductToRequestController,
};
