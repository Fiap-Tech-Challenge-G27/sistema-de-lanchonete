import { CustomerEntity } from '../entities/customer.entity';

export interface ICustomerRepository {
  createCustomer(customer: CustomerEntity): Promise<CustomerEntity>;
  findAllCustomers(): Promise<CustomerEntity[]>;
  findCustomerByCpf(cpf: string): Promise<CustomerEntity>;
  updateCustomer(
    cpf: string,
    customer: CustomerEntity,
  ): Promise<CustomerEntity>;
  deleteCustomer(id: string): Promise<void>;
}

export const ICustomerRepository = Symbol('ICustomerRepository');
