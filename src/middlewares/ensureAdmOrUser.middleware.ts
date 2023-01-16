import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import "dotenv/config";

const ensureAdmOrUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user.isAdm && req.user.id !== req.params.id) {
    throw new AppError("You don't have authorization!", 401);
  }

  return next();
};

export default ensureAdmOrUserMiddleware;
