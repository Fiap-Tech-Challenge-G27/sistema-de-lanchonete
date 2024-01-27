import { Repository } from '@shared/core/repository';
import { CategoryEntity } from './category.entity';

export abstract class ICategoryRepository extends Repository<CategoryEntity> {}

// ver
export interface ICategoryRepositoryy {
  createCategory(category: CategoryEntity): Promise<CategoryEntity>;
  findAllCategories(): Promise<CategoryEntity[]>;
  findCategoryById(name: string): Promise<CategoryEntity>;
  findCategoryBySlug(name: string): Promise<CategoryEntity>;
  updateCategory(id: string, category: CategoryEntity): Promise<CategoryEntity>;
}

export const ICategoryRepositoryy = Symbol('ICategoryRepositoryy');
