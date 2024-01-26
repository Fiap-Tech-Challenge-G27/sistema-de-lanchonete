import { Entity } from '@shared/core/entity';

export class CustomerEntity extends Entity {
  id: string;
  name: string;
  email: string;
  cpf: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    name: string,
    email: string,
    cpf: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    super();
    this.name = name;
    this.email = email;
    this.cpf = cpf;
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
