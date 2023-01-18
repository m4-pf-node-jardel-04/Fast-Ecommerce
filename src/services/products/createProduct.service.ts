import AppDataSource from "../../data-source";
import Category from "../../entities/categories.entity";
import Product from "../../entities/products.entity";
import User from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IProductsRequest } from "../../interfaces/product.interfaces";


const createProductService = async ({name,price,description,image,quantity,categoryId}: IProductsRequest):Promise<Array<User | number | string | {}>> => {
    const productsRepository = AppDataSource.getRepository(Product);
    const categoryRepository = AppDataSource.getRepository(Category);

    const categoryExists = await categoryRepository.findOneBy({
        id:categoryId
    });

    const productExists = await productsRepository.findOneBy({
        name
    });
    
    if (!categoryExists) {
        throw new AppError ("category does not exist", 404);
    };
    
    if(productExists){
        throw new AppError ("Product already created", 409);
    };

    const products = productsRepository.create({ category:categoryExists,name, price, description, image, quantity});
    await productsRepository.save(products);

    return [201, products];
}    
export default createProductService;
