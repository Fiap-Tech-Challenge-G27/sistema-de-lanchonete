import { ProductEntity } from './product.entity';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { CategoryEntity } from '@categories/core/category.entity';
import { Mapper } from '@shared/core/mapper';

export class ProductMapper extends Mapper<
  { category: CategoryEntity; dataDto: CreateProductDto | UpdateProductDto },
  ProductEntity
> {
  mapFrom(param: {
    category: CategoryEntity;
    dataDto: CreateProductDto | UpdateProductDto;
  }): ProductEntity {
    const { category, dataDto } = param;

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
