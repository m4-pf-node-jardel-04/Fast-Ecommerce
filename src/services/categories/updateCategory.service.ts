import Category from "../../entities/categories.entity";
import { ICategoryRequest, ICategoryResponse } from "../../interfaces/category.interfaces";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { categoryResponseSerializer } from "../../serializers/category.serializers";

const updateCategoryService = async(datacategory: ICategoryRequest, IdCategory:string ): Promise<ICategoryResponse> => {
    const categoryRepository = AppDataSource.getRepository(Category);

    const category = await categoryRepository.findOneBy({id: IdCategory});

    if(!category){
        throw new AppError("Category not exists", 404);
    };

    const updateCategory = categoryRepository.create({
        ...category , ...datacategory
    });

    await categoryRepository.save(updateCategory);

    const responseValidate = await categoryResponseSerializer.validate(updateCategory,{
        stripUnknown: true
    });

    return responseValidate;
};

export default updateCategoryService;