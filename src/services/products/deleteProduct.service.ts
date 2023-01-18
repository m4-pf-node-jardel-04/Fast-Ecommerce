import AppDataSource from "../../data-source";
import Product from "../../entities/products.entity";
import { AppError } from "../../errors/AppError";

const deleteProductService = async (productId: string):Promise<void> => {
  const productsRepository = AppDataSource.getRepository(Product);
  const product = await productsRepository.findOneBy({
    id: productId,
  });

  if (!product) {
    throw new AppError("Product not found", 404);
  };

  await productsRepository.remove(product);

};
export default deleteProductService;
