import { CategoryEntity } from '@categories/core/category.entity';
import { Entity } from '@shared/core/entity';

export class ProductEntity extends Entity {
  id: string;
  name: string;
  description: string;
  category: CategoryEntity;
  price: number;
  quantity: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(
    name: string,
    description: string,
    price: number,
    quantity: number,
    status: string,
    category?: CategoryEntity,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
  ) {
    super();
    this.name = name;
    this.description = description;
    this.category = category;
    this.price = price;
    this.quantity = quantity;
    this.status = status;
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}
