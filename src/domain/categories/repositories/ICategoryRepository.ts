import { Category } from '../entities/category.entity';

export interface ICategoryRepository {
  createCategory(category: Category): Promise<Category>;
  findAllCategories(): Promise<Category[]>;
  findCategoryById(name: string): Promise<Category>;
  findCategoryBySlug(name: string): Promise<Category>;
  updateCategory(id: string, category: Category): Promise<Category>;
}

export const ICategoryRepository = Symbol('ICategoryRepository');
