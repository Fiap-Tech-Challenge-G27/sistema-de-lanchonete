import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'customers' })
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'text', unique: false, nullable: false })
  name: string;

  @Column({ name: 'email', type: 'text', unique: true, nullable: false })
  email: string;

  @Column({ name: 'cpf', type: 'text', unique: true, nullable: false })
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
