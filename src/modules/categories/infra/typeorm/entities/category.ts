import { Product } from '@products/infra/typeorm/entities/product';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'slug', unique: true, length: 100 })
  slug: string;

  @Column({ name: 'description', length: 255, nullable: true })
  description: string;

  @OneToMany(() => Product, (product) => product.category, {
    cascade: true,
    eager: true,
  })
  products: Product[];

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
