import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

const ensureAdmOrUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.user.isAdm);

  if (!req.user.isAdm && req.user.id !== req.params.id) {
    throw new AppError("You don't have authorization!", 401);
  }

  return next();
};

export default ensureAdmOrUserMiddleware;
