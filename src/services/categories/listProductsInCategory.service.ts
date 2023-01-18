import Category from "../../entities/categories.entity";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { productsInCategoryResponseSerializer } from "../../serializers/category.serializers";
import { IproductsInCategoryResponse } from "../../interfaces/category.interfaces";

const listProductsInCategoryService = async(IdCategory: string): Promise<IproductsInCategoryResponse> => {
    const categoryRepository = AppDataSource.getRepository(Category);

    const categoryExist = await categoryRepository.findOneBy({id: IdCategory});

    if(!categoryExist){
        throw new AppError('Category not exists', 404);
    };

    const products = await categoryRepository.findOne({
        where:{
            id: IdCategory
        },
        relations:{
            product: true
        }
    });

    const responseValidate = await productsInCategoryResponseSerializer.validate(products,{
        stripUnknown: true
    });

    return responseValidate;

};

export default listProductsInCategoryService;