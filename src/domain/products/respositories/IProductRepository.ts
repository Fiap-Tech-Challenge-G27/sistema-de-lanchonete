import { Product } from '../entities/product.entity';

export interface IProductRepository {
  createProduct(product: Product): Promise<Product>;
  findAllProducts(): Promise<Product[]>;
  deleteProduct(id: string): Promise<void>;
  findProductById(id: string): Promise<Product>;
  updateProduct(id: string, product: Product): Promise<Product>;
}

export const IProductRepository = Symbol('IProductRepository');
