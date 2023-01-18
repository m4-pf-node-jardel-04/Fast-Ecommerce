import Category from "../../entities/categories.entity";
import AppDataSource from "../../data-source";
import { allcategoryResponseSerializer } from "../../serializers/category.serializers";
import { ICategoryResponse } from "../../interfaces/category.interfaces";

const listCategoriesService = async(): Promise<Array<ICategoryResponse>> => {
    const categoryRepository = AppDataSource.getRepository(Category);

    const categories = await categoryRepository.find();

    const responseValidate = await allcategoryResponseSerializer.validate(categories,{
        stripUnknown: true
    });

    return responseValidate;
};

export default listCategoriesService;