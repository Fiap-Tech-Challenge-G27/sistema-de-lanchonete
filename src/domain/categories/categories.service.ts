import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './adapters/inbound/dto/create-category.dto';
import { UpdateCategoryDto } from './adapters/inbound/dto/update-category.dto';
import { Category } from './entities/category.entity';
import { ICategoryRepository } from './ports/ICategoryRepository';
import { ICategoriesService } from './ports/ICategoriesService';

@Injectable()
export class CategoriesService implements ICategoriesService {
  constructor(
    @Inject(ICategoryRepository)
    private readonly categoryRepository: ICategoryRepository,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const { name, description, slug } = createCategoryDto;

    const categoryAlreadyExists =
      await this.categoryRepository.findCategoryBySlug(slug);

    if (categoryAlreadyExists) {
      return categoryAlreadyExists;
    }

    const category = new Category(name, slug, description);

    const createdCategory =
      await this.categoryRepository.createCategory(category);

    return createdCategory;
  }

  async findAll() {
    const listCategories = await this.categoryRepository.findAllCategories();
    return listCategories;
  }

  async findBySlug(slug: string) {
    const category = this.categoryRepository.findCategoryBySlug(slug);
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const { name, description, slug } = updateCategoryDto;

    const categoryExists = await this.categoryRepository.findCategoryById(id);

    if (!categoryExists) {
      throw new Error("Category doesn't exists");
    }

    const categoryAlreadyExists =
      await this.categoryRepository.findCategoryBySlug(slug);

    if (categoryAlreadyExists) {
      return categoryAlreadyExists;
    }

    const category = new Category(name, slug, description);

    const updatedCategory =
      await this.categoryRepository.updateCategory(category);

    return updatedCategory;
  }
}
