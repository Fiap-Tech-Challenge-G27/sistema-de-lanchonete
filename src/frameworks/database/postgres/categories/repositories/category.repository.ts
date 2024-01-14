import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryModel } from '../models/category.model';
import { CategoryEntity } from '../../../../../domain/categories/entities/category.entity';
import { ICategoryRepository } from '../../../../../domain/categories/repositories/ICategoryRepository';
import { ProductEntity } from 'src/domain/products/entities/product.entity';
import { CategoryMapper } from 'src/domain/categories/mappers/category.mapper';

@Injectable()
export class CategoryModelRepository implements ICategoryRepository {
  constructor(
    @InjectRepository(CategoryModel)
    private readonly categoryRepository: Repository<CategoryModel>,
    private readonly categoryMapper: CategoryMapper,
  ) {}
  async createCategory(category: CategoryEntity): Promise<CategoryEntity> {
    const categoryModel = this.categoryMapper.mapEntityToModel(category);

    const categoryCreated = await this.categoryRepository.save(categoryModel);

    return this.categoryMapper.mapModelToEntity(categoryCreated);
  }

  async findAllCategories() {
    const categories = await this.categoryRepository.find();

    return categories.map((category) =>
      this.categoryMapper.mapModelToEntity(category),
    );
  }

  async findCategoryById(id: string) {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id },
      });

      return this.categoryMapper.mapModelToEntity(category);
    } catch (error) {
      return null;
    }
  }

  async findCategoryBySlug(slug: string) {
    try {
      const category = await this.categoryRepository.findOne({
        where: { slug },
      });
      return this.categoryMapper.mapModelToEntity(category);
    } catch (error) {
      return null;
    }
  }
  async updateCategory(
    id: string,
    category: CategoryEntity,
  ): Promise<CategoryEntity> {
    const categoryModel = await this.categoryRepository.findOne({
      where: { id },
    });

    categoryModel.name = category.name;
    categoryModel.slug = category.slug;
    categoryModel.description = category.description;

    await this.categoryRepository.save(categoryModel);

    return this.categoryMapper.mapModelToEntity(categoryModel);
  }
}
