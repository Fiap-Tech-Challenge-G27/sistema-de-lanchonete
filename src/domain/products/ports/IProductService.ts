import { ProductDto } from 'src/domain/products/adapters/inbound/dtos/product.dto';
import { CreateProductDto } from 'src/domain/products/adapters/inbound/dtos/create-product.dto';
import { UpdateProductDto } from 'src/domain/products/adapters/inbound/dtos/update-product.dto';

export interface IProductService {
  create: (createProductDto: CreateProductDto) => Promise<void>;
  // findAll: () => Promise<ProductDto[]>;
  // update: (
  //   id: string,
  //   updateProductDto: UpdateProductDto,
  // ) => Promise<ProductDto>;
  // remove: (id: string) => Promise<string>;
}

export const IProductService = Symbol('IProductService');
