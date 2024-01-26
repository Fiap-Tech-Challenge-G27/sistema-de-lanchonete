import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '@categories/infra/typeorm/entities/category';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'description', length: 255, nullable: true })
  description: string;

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: false,
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ name: 'status', nullable: false })
  status: string;

  @Column({ name: 'price', nullable: true, type: 'decimal' })
  price: number;

  @Column({ name: 'quantity', nullable: true })
  quantity: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  constructor(
    name?: string,
    description?: string,
    category?: Category,
    price?: number,
    quantity?: number,
    status?: string,
  ) {
    this.name = name;
    this.description = description;
    this.category = category;
    this.price = price;
    this.quantity = quantity;
    this.status = status;
  }
}
