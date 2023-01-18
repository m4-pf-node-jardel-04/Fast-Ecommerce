import Category from "../../entities/categories.entity";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";

const deleteCategoryService = async(IdCategory: string): Promise<object> => {
    const categoryRepository = AppDataSource.getRepository(Category);

    const categoryExist = await categoryRepository.findOneBy({id: IdCategory});

    if(!categoryExist){
        throw new AppError('Category not exists', 404);
    };

    categoryRepository.remove(categoryExist);

    return {};
};

export default deleteCategoryService;