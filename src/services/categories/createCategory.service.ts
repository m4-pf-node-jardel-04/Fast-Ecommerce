import { ICategoryRequest, ICategoryResponse } from "../../interfaces/category.interfaces";
import AppDataSource from "../../data-source";
import Category from "../../entities/categories.entity";
import { AppError } from "../../errors/AppError";
import { categoryResponseSerializer } from "../../serializers/category.serializers"

const createCategoryService = async(categoryData: ICategoryRequest): Promise<ICategoryResponse> => {
    const categoryRepository = AppDataSource.getRepository(Category);

    const categoryExist = await categoryRepository.findOneBy(categoryData);

    if(categoryExist){
        throw new AppError("Category exist", 409);
    };

    const newCategory = categoryRepository.create(categoryData);

    await categoryRepository.save(newCategory);

    const responseValidate = await categoryResponseSerializer.validate(newCategory,{
        stripUnknown: true
    });

    return responseValidate;
};

export default createCategoryService;