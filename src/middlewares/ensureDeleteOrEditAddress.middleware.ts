import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import User from "../entities/user.entity";
import "dotenv/config";
import dataSource from "../data-source";

const ensureDeleteOrEditAddressMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = dataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    id: req.user.id,
  });

  if (!user.address) {
    throw new AppError("Address not found!", 404);
  }

  if (!req.user.isAdm && user.address?.id !== req.params.id) {
    throw new AppError("You don't have authorization!", 401);
  }

  return next();
};

export default ensureDeleteOrEditAddressMiddleware;
