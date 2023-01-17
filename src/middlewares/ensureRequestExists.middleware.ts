import { Request as requestType, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import Request from "../entities/request.entity";
import { AppError } from "../errors/AppError";

const ensureRequestExistsMiddleware = async (
  req: requestType,
  res: Response,
  next: NextFunction
) => {
  const request = await AppDataSource.getRepository(Request).findOneBy({
    id: req.params.id,
  });

  if (!request) {
    throw new AppError("Request not found", 404);
  }

  return next();
};

export default ensureRequestExistsMiddleware;
