import { CreateCategoryDto } from '../adapters/inbound/dto/create-category.dto';
import { UpdateCategoryDto } from '../adapters/inbound/dto/update-category.dto';

export interface ICategoriesService {
  create(createCategoryDto: CreateCategoryDto);
  findAll();
  findBySlug(slug: string);
  update(id: string, updateCategoryDto: UpdateCategoryDto);
}

export const ICategoriesService = Symbol('ICategoriesService');
