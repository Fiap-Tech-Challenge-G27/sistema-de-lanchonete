import { ProductEntity } from '../entities/product.entity';

export interface IProductRepository {
  createProduct(product: ProductEntity): Promise<ProductEntity>;
  findAllProducts(): Promise<ProductEntity[]>;
  deleteProduct(id: string): Promise<void>;
  findProductById(id: string): Promise<ProductEntity>;
  updateProduct(id: string, product: ProductEntity): Promise<ProductEntity>;
}

export const IProductRepository = Symbol('IProductRepository');
