import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category';
import { ICategoryRepository } from '@categories/core/category-repository.abstract';
import { ProductEntity } from '@products/core/product.entity';
import { CategoryEntity } from '@modules/categories/core/category.entity';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(category: CategoryEntity): Promise<CategoryEntity> {
    const categoryModel = this.mapEntityToModel(category);

    const categoryCreated = await this.categoryRepository.save(categoryModel);

    return this.mapModelToEntity(categoryCreated);
  }

  async findAll() {
    const categories = await this.categoryRepository.find();

    return categories.map((category) => this.mapModelToEntity(category));
  }

  async findOne(idOrSlug: string, type: 'id' | 'slug') {
    const queryByType = {
      id: () => this.categoryRepository.findOne({ where: { id: idOrSlug } }),
      slug: () =>
        this.categoryRepository.findOne({ where: { slug: idOrSlug } }),
    };

    const category = queryByType[type];

    try {
      const result = await category();

      return this.mapModelToEntity(result);
    } catch (error) {
      throw new Error('An error occurred while fetching the category');
    }
  }

  async update(id: string, category: CategoryEntity): Promise<CategoryEntity> {
    const categoryModel = await this.categoryRepository.findOne({
      where: { id },
    });

    categoryModel.name = category.name;
    categoryModel.slug = category.slug;
    categoryModel.description = category.description;

    await this.categoryRepository.save(categoryModel);

    return this.mapModelToEntity(categoryModel);
  }

  mapModelToEntity(dataModel: Category): CategoryEntity {
    if (!dataModel) {
      return null;
    }
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

  mapEntityToModel(dataEntity: CategoryEntity): Category {
    const category = new Category(
      dataEntity.name,
      dataEntity.slug,
      dataEntity.description,
    );

    return category;
  }
}
