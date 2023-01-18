import { Request, Response } from "express";
import { IUpdateRequest } from "../interfaces/requests.interfaces";
import createRequestService from "../services/requests/createRequest.service";
import deleteRequestService from "../services/requests/deleteRequest.service";
import listAllRequestsService from "../services/requests/listAllRequests.service";
import listRequestByIdService from "../services/requests/listRequestById.service";
import updateRequestService from "../services/requests/updateRequest.service";

const createRequestController = async (req: Request, res: Response) => {
  const userId: string = req.user.id;
  const request = await createRequestService(userId);
  
  return res.status(201).json(request);
};

const listRequestByIdController = async (req: Request, res: Response) => {
  const userId: string = req.user.id;
  const requestId: string = req.params.id;
  const request = await listRequestByIdService(userId, requestId);

  return res.json(request);
};

const listAllRequestsController = async (req: Request, res: Response) => {
  const requests = await listAllRequestsService();

  return res.json(requests);
};

const updateRequestController = async (req: Request, res: Response) => {
  const userId: string = req.user.id;
  const requestId: string = req.params.id;
  const updatedData: IUpdateRequest = req.body;
  const updatedRequest = await updateRequestService(
    userId,
    requestId,
    updatedData
  );

  return res.json(updatedRequest);
};

const deleteRequestController = async (req: Request, res: Response) => {
  const userId: string = req.user.id;
  const requestId: string = req.params.id;
  const request = await deleteRequestService(userId, requestId);

  return res.status(204).json(request);
};

export {
  createRequestController,
  listRequestByIdController,
  listAllRequestsController,
  updateRequestController,
  deleteRequestController,
};
