import Category from "../../entities/categories.entity";
import AppDataSource from "../../data-source";
import { allcategoryResponseSerializer } from "../../serializers/category.serializers";

const listCategoriesService = async() => {
    const categoryRepository = AppDataSource.getRepository(Category);

    const categories = await categoryRepository.find();

    const responseValidate = await allcategoryResponseSerializer.validate(categories,{
        stripUnknown: true
    });

    return responseValidate;
};

export default listCategoriesService;