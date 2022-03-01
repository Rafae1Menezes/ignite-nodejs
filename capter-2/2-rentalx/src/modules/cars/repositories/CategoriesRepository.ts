import { Category } from '../model/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from './implementations/ICategoriesRepository';

class CategoriesRepostory implements ICategoriesRepository {
  private categories: Category[];

  private static INSTANCE: CategoriesRepostory;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRepostory {
    if (!CategoriesRepostory.INSTANCE) {
      CategoriesRepostory.INSTANCE = new CategoriesRepostory();
    }
    return CategoriesRepostory.INSTANCE;
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();
    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
}

export { CategoriesRepostory };
