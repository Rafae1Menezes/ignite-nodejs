import { Category } from '../../model/Category';
import { ICategoriesRepository } from '../../repositories/implementations/ICategoriesRepository';

class ListCategoriesUseCase {
  private categoryRepositry: ICategoriesRepository;

  constructor(categoryRepositry: ICategoriesRepository) {
    this.categoryRepositry = categoryRepositry;
  }

  execute(): Category[] {
    const categories = this.categoryRepositry.list();
    return categories;
  }
}

export { ListCategoriesUseCase };
