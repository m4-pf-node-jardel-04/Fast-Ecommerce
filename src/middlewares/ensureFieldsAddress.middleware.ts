import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

const ensureFieldsAddresMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    req.body.id ||
    req.body.id === false ||
    req.body.user ||
    req.body.user === false
  ) {
    throw new AppError("You dont have authorization for this field", 401);
  }

  return next();
};

export default ensureFieldsAddresMiddleware;
