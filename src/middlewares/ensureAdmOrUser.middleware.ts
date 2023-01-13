import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import User from "../entities/user.entity";
import "dotenv/config";
import dataSource from "../data-source";

const ensureAdmOrUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = dataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    id: req.user.id,
  });
  console.log(user.address.id);
  if (!req.user.isAdm && user.address.id !== req.params.id) {
    throw new AppError("You don't have authorization!", 401);
  }

  return next();
};

export default ensureAdmOrUserMiddleware;
