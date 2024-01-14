import { CategoryModel } from 'src/infra/databases/postgres/categories/models/category.model';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { CategoryEntity } from '../entities/category.entity';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { ProductEntity } from 'src/domain/products/entities/product.entity';

export class CategoryMapper extends CategoryEntity {
  public mapDtoToEntity(
    dataDto: CreateCategoryDto | UpdateCategoryDto,
  ): CategoryEntity {
    const category = new CategoryEntity(
      dataDto.name,
      dataDto.slug,
      dataDto.description,
    );
    return category;
  }

  public mapModelToEntity(dataModel: CategoryModel): CategoryEntity {
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
  public mapEntityToModel(dataEntity: CategoryEntity): CategoryModel {
    const category = new CategoryModel(
      dataEntity.name,
      dataEntity.slug,
      dataEntity.description,
    );

    return category;
  }
}
