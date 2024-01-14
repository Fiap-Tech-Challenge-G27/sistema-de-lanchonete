import { CategoryModel } from 'src/frameworks/database/postgres/categories/models/category.model';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { CategoryEntity } from '../entities/category.entity';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

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
    const category = new CategoryEntity(
      dataModel.name,
      dataModel.slug,
      dataModel.description,
      dataModel.id,
      dataModel.createdAt,
      dataModel.updatedAt,
      dataModel.products,
    );

    // if (categoryModel.products) {
    //   category.products = categoryModel.products.map((product) => {
    //     const newProduct = new Product(
    //       product.name,
    //       product.description,
    //       product.price,
    //       product.quantity,
    //       product.status,
    //     );

    //     newProduct.id = product.id;
    //     return newProduct;
    //   });
    // }

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
