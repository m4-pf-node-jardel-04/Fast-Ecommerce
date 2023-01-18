import AppDataSource from "../../data-source";
import Product from "../../entities/products.entity";  

const listProductsService = async(): Promise<Product[]> => {
    const productsRepository = AppDataSource.getRepository(Product);
    const product = await productsRepository.find();

    return product;
};
export default listProductsService;