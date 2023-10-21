import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryModel } from '../models/category.model';
import { Category } from '../../../entities/category.entity';
import { ICategoryRepository } from '../../../ports/ICategoryRepository';
import { Product } from 'src/domain/products/entities/product.entity';

@Injectable()
export class CategoryModelRepository implements ICategoryRepository {
  constructor(
    @InjectRepository(CategoryModel)
    private readonly categoryRepository: Repository<CategoryModel>,
  ) {}
  async createCategory(category: Category): Promise<Category> {
    const categoryModel = new CategoryModel();
    categoryModel.name = category.name;
    categoryModel.slug = category.slug;
    categoryModel.description = category.description;

    const categoryCreated = await this.categoryRepository.save(categoryModel);

    return this.modelToEntity(categoryCreated);
  }

  async findAllCategories() {
    const categories = await this.categoryRepository.find();

    return categories.map((category) => this.modelToEntity(category));
  }

  async findCategoryById(id: string) {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id },
      });

      return this.modelToEntity(category);
    } catch (error) {
      return null;
    }
  }

  async findCategoryBySlug(slug: string) {
    try {
      const category = await this.categoryRepository.findOne({
        where: { slug },
      });
      return this.modelToEntity(category);
    } catch (error) {
      return null;
    }
  }
  async updateCategory(id: string, category: Category): Promise<Category> {
    const categoryModel = await this.categoryRepository.findOne({
      where: { id },
    });

    categoryModel.name = category.name;
    categoryModel.slug = category.slug;
    categoryModel.description = category.description;

    await this.categoryRepository.save(categoryModel);

    return this.modelToEntity(categoryModel);
  }

  modelToEntity(categoryModel: CategoryModel): Category {
    const category = new Category(
      categoryModel.name,
      categoryModel.slug,
      categoryModel.description,
    );
    category.id = categoryModel.id;
    category.createdAt = categoryModel.createdAt;
    category.updatedAt = categoryModel.updatedAt;

    if (categoryModel.products) {
      category.products = categoryModel.products.map((product) => {
        const newProduct = new Product(
          product.name,
          product.description,
          product.price,
          product.quantity,
          product.status,
        );

        newProduct.id = product.id;
        return newProduct;
      });
    }
    return category;
  }
}
