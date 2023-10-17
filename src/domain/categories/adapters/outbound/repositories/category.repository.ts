import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryModel } from '../models/category.model';
import { Category } from '../../../entities/category.entity';
import { ICategoryRepository } from '../../../ports/ICategoryRepository';

@Injectable()
export class CategoryModelRepository implements ICategoryRepository {
  constructor(
    @InjectRepository(CategoryModel)
    private readonly categoryRepository: Repository<CategoryModel>,
  ) {}
  async createCategory(category: Category) {
    const categoryModel = new CategoryModel();
    categoryModel.name = category.name;
    categoryModel.slug = category.slug;
    categoryModel.description = category.description;

    await this.categoryRepository.save(categoryModel);
  }

  async findAllCategories() {
    return await this.categoryRepository.find();
  }

  async findCategoryById(id: string) {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });
    return category;
  }

  async findCategoryBySlug(slug: string) {
    const category = await this.categoryRepository.findOne({
      where: { slug },
    });
    return category;
  }
  async updateCategory(category: Category): Promise<Category> {
    const categoryModel = await this.categoryRepository.findOne({
      where: { id: category.id },
    });

    categoryModel.name = category.name;
    categoryModel.description = category.description;

    await this.categoryRepository.save(categoryModel);

    return categoryModel;
  }
}
