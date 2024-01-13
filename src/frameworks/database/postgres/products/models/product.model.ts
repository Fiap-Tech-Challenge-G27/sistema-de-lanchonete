import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductImageModel } from './productImage.model';
import { CategoryModel } from 'src/frameworks/database/postgres/categories/models/category.model';

@Entity({ name: 'products' })
export class ProductModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'description', length: 255, nullable: true })
  description: string;

  @ManyToOne(() => CategoryModel, (category) => category.products, {
    nullable: false,
  })
  @JoinColumn({ name: 'category_id' })
  category: CategoryModel;

  @Column({ name: 'status', nullable: false })
  status: string;

  @OneToMany(() => ProductImageModel, (image) => image.product, {
    cascade: true,
    eager: true,
  })
  imageUrls: ProductImageModel[];

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
    category?: CategoryModel,
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
