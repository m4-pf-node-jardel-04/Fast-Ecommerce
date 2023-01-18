import { IProductsUpdate } from "../../interfaces/product.interfaces";
import AppDataSource from "../../data-source";
import Product from "../../entities/products.entity";
import { AppError } from "../../errors/AppError";

const updateProductService = async(productData: IProductsUpdate, productId:string):Promise<Product> => {
    const productsRepository = AppDataSource.getRepository(Product);
    
    const findProduct = await productsRepository.findOneBy({
        id: productId
    });

    if(!findProduct){
        throw new AppError("Product not find",404);
    };

    const updateProduct = productsRepository.create({
        ...findProduct,
        ...productData,
    });

    await productsRepository.save(updateProduct);

    return updateProduct;
};

export default updateProductService;