import { Product } from '../entities/product.entity';

export interface IProductRepository {
  createProduct(product: Product): Promise<void>;
  findAllProducts(): Promise<Product[]>;
  deleteProduct(id: string): Promise<void>;
  findProductById(id: string): Promise<Product>;
  updateProduct(id: string, product: Product): Promise<void>;
}

export const IProductRepository = Symbol('IProductRepository');
