import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

export interface ICategoriesService {
  create(createCategoryDto: CreateCategoryDto);
  findAll();
  findBySlug(slug: string);
  update(id: string, updateCategoryDto: UpdateCategoryDto);
}

export const ICategoriesService = Symbol('ICategoriesService');
