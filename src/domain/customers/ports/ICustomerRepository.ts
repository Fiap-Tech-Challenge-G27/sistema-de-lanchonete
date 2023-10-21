import { Customer } from '../entities/customer.entity';

export interface ICustomerRepository {
  createCustomer(customer: Customer): Promise<void>;
  findAllCategories(): Promise<Customer[]>;
  findCustomerByCpf(cpf: string): Promise<Customer>;
  updateCustomer(customer: Customer): Promise<Customer>;
}

export const ICustomerRepository = Symbol('ICustomerRepository');
