import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerModel } from '../models/customer.model';
import { CustomerEntity } from '@domain/customers/entities/customer.entity';
import { ICustomerRepository } from '@domain/customers/repositories/customer.repository.interface';

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

    return this.mapModelToEntity(customerCreated);
  }

  async findAllCustomers() {
    const customers = await this.customerRepository.find();

    return customers.map((customer) => this.mapModelToEntity(customer));
  }

  async findCustomerByCpf(cpf: string) {
    try {
      const customer = await this.customerRepository.findOne({
        where: { cpf },
      });

      return this.mapModelToEntity(customer);
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

    return this.mapModelToEntity(customerModel);
  }

  async deleteCustomer(id: string): Promise<void> {
    await this.customerRepository.delete({ id });
  }

  mapModelToEntity(dataModel: CustomerModel): CustomerEntity {
    const customer = new CustomerEntity(
      dataModel.name,
      dataModel.email,
      dataModel.cpf,
      dataModel.id,
      dataModel.createdAt,
      dataModel.updatedAt,
    );
    return customer;
  }
  mapEntityToModel(dataEntity: CustomerEntity): CustomerModel {
    const customer = new CustomerModel(
      dataEntity.name,
      dataEntity.email,
      dataEntity.cpf,
    );
    return customer;
  }
}
