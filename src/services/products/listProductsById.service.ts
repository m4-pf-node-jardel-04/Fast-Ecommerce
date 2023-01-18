import AppDataSource from "../../data-source";
import Product from "../../entities/products.entity";
import { AppError } from "../../errors/AppError";

const listProductByIdService = async (productId: string) => {
  const userRepository = AppDataSource.getRepository(Product);
  const foundProductByParam = await userRepository.findOneBy({ id: productId });

  if (!foundProductByParam) {
    throw new AppError("Product category not found", 404);
  }
  console.log(foundProductByParam)

  return { foundProductByParam };
};

export default listProductByIdService;
