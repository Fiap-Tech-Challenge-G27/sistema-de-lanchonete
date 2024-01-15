import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductModel } from './product.model';

@Entity({ name: 'products_image' })
export class ProductImageModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @JoinColumn({ name: 'product_id' })
  product: ProductModel;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
