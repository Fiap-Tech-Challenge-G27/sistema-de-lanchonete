import { Category } from 'src/domain/categories/entities/category.entity';
import { ProductImage } from './productImage.entity';

export class Product {
  id: number;
  name: string;
  description: string;
  category: Category;
  price: number;
  quantity: number;
  imageUrls: ProductImage[];
  status: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    name: string,
    description: string,
    category: Category,
    price: number,
    quantity: number,
    status: string,
  ) {
    this.name = name;
    this.description = description;
    this.category = category;
    this.price = price;
    this.quantity = quantity;
    this.status = status;
  }
}
