import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryModel } from '../models/category.model';
import { CategoryEntity } from '@domain/categories/entities/category.entity';
import { ICategoryRepository } from '@domain/categories/repositories/category.repository.interface';
import { ProductEntity } from '@domain/products/entities/product.entity';

@Injectable()
export class CategoryModelRepository implements ICategoryRepository {
  constructor(
    @InjectRepository(CategoryModel)
    private readonly categoryRepository: Repository<CategoryModel>,
  ) {}
  async createCategory(category: CategoryEntity): Promise<CategoryEntity> {
    const categoryModel = this.mapEntityToModel(category);

    const categoryCreated = await this.categoryRepository.save(categoryModel);

    return this.mapModelToEntity(categoryCreated);
  }

  async findAllCategories() {
    const categories = await this.categoryRepository.find();

    return categories.map((category) => this.mapModelToEntity(category));
  }

  async findCategoryById(id: string) {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id },
      });

      return this.mapModelToEntity(category);
    } catch (error) {
      return null;
    }
  }

  async findCategoryBySlug(slug: string) {
    try {
      const category = await this.categoryRepository.findOne({
        where: { slug },
      });
      return this.mapModelToEntity(category);
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

    return this.mapModelToEntity(categoryModel);
  }

  mapModelToEntity(dataModel: CategoryModel): CategoryEntity {
    let productsEntity: ProductEntity[];
    if (dataModel.products) {
      productsEntity = dataModel.products.map((product) => {
        const newProduct = new ProductEntity(
          product.name,
          product.description,
          product.price,
          product.quantity,
          product.status,
          product.category,
          product.id,
        );

        return newProduct;
      });
    }

    const category = new CategoryEntity(
      dataModel.name,
      dataModel.slug,
      dataModel.description,
      dataModel.id,
      dataModel.createdAt,
      dataModel.updatedAt,
      productsEntity,
    );

    return category;
  }

  mapEntityToModel(dataEntity: CategoryEntity): CategoryModel {
    const category = new CategoryModel(
      dataEntity.name,
      dataEntity.slug,
      dataEntity.description,
    );

    return category;
  }
}
