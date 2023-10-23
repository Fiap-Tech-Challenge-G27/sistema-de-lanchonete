import { ProductModel } from 'src/domain/products/adapters/outbound/models/product.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'customers' })
export class CustomerModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', unique: false, length: 100, nullable: false })
  name: string;

  @Column({ name: 'email', unique: true, length: 100, nullable: false })
  email: string;

  @Column({ name: 'cpf', unique: true, length: 11, nullable: false })
  cpf: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  constructor(name?: string, email?: string, cpf?: string) {
    this.name = name;
    this.email = email;
    this.cpf = cpf;
  }
}
