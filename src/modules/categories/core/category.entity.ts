import { Entity } from '@shared/core/entity';
import { ProductEntity } from '@products/core/product.entity';

export class CategoryEntity extends Entity {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  products: ProductEntity[];

  constructor(
    name: string,
    slug: string,
    description: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
    products?: ProductEntity[],
  ) {
    super();
    this.name = name;
    this.slug = slug;
    this.description = description;
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.products = products;
  }
}
