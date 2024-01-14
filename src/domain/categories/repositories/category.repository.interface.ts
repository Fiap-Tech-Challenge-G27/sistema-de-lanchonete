import { CategoryEntity } from '../entities/category.entity';

export interface ICategoryRepository {
  createCategory(category: CategoryEntity): Promise<CategoryEntity>;
  findAllCategories(): Promise<CategoryEntity[]>;
  findCategoryById(name: string): Promise<CategoryEntity>;
  findCategoryBySlug(name: string): Promise<CategoryEntity>;
  updateCategory(id: string, category: CategoryEntity): Promise<CategoryEntity>;
}

export const ICategoryRepository = Symbol('ICategoryRepository');
