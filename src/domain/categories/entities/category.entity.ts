import { Product } from 'src/domain/products/entities/product.entity';

export class Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  products: Product[];

  constructor(name, slug, description) {
    this.name = name;
    this.slug = slug;
    this.description = description;
  }
}
