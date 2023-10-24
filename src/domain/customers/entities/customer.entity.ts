export class Customer {
  id: string;
  name: string;
  email: string;
  cpf: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(name, email, cpf) {
    this.name = name;
    this.email = email;
    this.cpf = cpf;
  }
}
