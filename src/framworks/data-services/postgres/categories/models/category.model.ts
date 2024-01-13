import { ProductModel } from 'src/domain/products/adapters/outbound/models/product.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'categories' })
export class CategoryModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'slug', unique: true, length: 100 })
  slug: string;

  @Column({ name: 'description', length: 255, nullable: true })
  description: string;

  @OneToMany(() => ProductModel, (product) => product.category, {
    cascade: true,
    eager: true,
  })
  products: ProductModel[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  constructor(name?: string, slug?: string, description?: string) {
    this.name = name;
    this.slug = slug;
    this.description = description;
  }
}
