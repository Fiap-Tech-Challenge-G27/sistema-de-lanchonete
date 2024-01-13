import { Product } from 'src/domain/products/entities/product.entity';

export class Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  products: Product[];

  constructor(
    name: string,
    slug: string,
    description: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
    products?: Product[],
  ) {
    this.name = name;
    this.slug = slug;
    this.description = description;
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.products = products;
  }
}
