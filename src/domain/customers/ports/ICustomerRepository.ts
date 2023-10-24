import { Customer } from '../entities/customer.entity';

export interface ICustomerRepository {
  createCustomer(customer: Customer): Promise<Customer>;
  findAllCustomers(): Promise<Customer[]>;
  findCustomerByCpf(cpf: string): Promise<Customer>;
  updateCustomer(cpf: string, customer: Customer): Promise<Customer>;
}

export const ICustomerRepository = Symbol('ICustomerRepository');
