import { ProductEntity } from '../entities/product.entity';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';

export interface IProductService {
  create: (createProductDto: CreateProductDto) => Promise<ProductEntity>;
  findAll: () => Promise<ProductEntity[]>;
  update: (
    id: string,
    updateProductDto: UpdateProductDto,
  ) => Promise<ProductEntity>;
  remove: (id: string) => Promise<void>;
}

export const IProductService = Symbol('IProductService');