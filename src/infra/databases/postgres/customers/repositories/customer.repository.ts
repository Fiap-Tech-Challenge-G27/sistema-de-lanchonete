import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerModel } from '../models/customer.model';
import { CustomerEntity } from '@domain/customers/entities/customer.entity';
import { ICustomerRepository } from '@domain/customers/repositories/ICustomerRepository';

@Injectable()
export class CustomerModelRepository implements ICustomerRepository {
  constructor(
    @InjectRepository(CustomerModel)
    private readonly customerRepository: Repository<CustomerModel>,
  ) {}
  async createCustomer(customer: CustomerEntity): Promise<CustomerEntity> {
    const customerModel = new CustomerModel();
    customerModel.name = customer.name;
    customerModel.email = customer.email;
    customerModel.cpf = customer.cpf;

    const customerCreated = await this.customerRepository.save(customerModel);

    return this.modelToEntity(customerCreated);
  }

  async findAllCustomers() {
    const customers = await this.customerRepository.find();

    return customers.map((customer) => this.modelToEntity(customer));
  }

  async findCustomerByCpf(cpf: string) {
    try {
      const customer = await this.customerRepository.findOne({
        where: { cpf },
      });

      return this.modelToEntity(customer);
    } catch (error) {
      return null;
    }
  }

  async updateCustomer(
    cpf: string,
    customer: CustomerEntity,
  ): Promise<CustomerEntity> {
    const customerModel = await this.customerRepository.findOne({
      where: { cpf },
    });

    customerModel.name = customer.name;
    customerModel.email = customer.email;
    customerModel.cpf = customer.cpf;

    await this.customerRepository.save(customerModel);

    return this.modelToEntity(customerModel);
  }

  modelToEntity(customerModel: CustomerModel): CustomerEntity {
    const customer = new CustomerEntity(
      customerModel.name,
      customerModel.email,
      customerModel.cpf,
    );
    customer.id = customerModel.id;
    customer.createdAt = customerModel.createdAt;
    customer.updatedAt = customerModel.updatedAt;
    return customer;
  }
}
