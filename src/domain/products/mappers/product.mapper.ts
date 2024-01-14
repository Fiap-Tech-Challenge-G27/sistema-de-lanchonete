import { ProductEntity } from '../entities/product.entity';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { CategoryEntity } from '@domain/categories/entities/category.entity';

export class ProductMapper {
  public mapDtoToEntity(
    category: CategoryEntity,
    dataDto: CreateProductDto | UpdateProductDto,
  ): ProductEntity {
    const product = new ProductEntity(
      dataDto.name,
      dataDto.description,
      dataDto.price,
      dataDto.quantity,
      dataDto.status,
      category,
    );
    return product;
  }
}
