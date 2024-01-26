import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer';
import { CustomerEntity } from '@customers/core/customer.entity';
import { ICustomerRepository } from '@customers/core/customer-repository.abstract';

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(customer: CustomerEntity): Promise<CustomerEntity> {
    const customerEntity = this.customerRepository.create(customer);

    const customerCreated = await this.customerRepository.save(customerEntity);

    return this.mapModelToEntity(customerCreated);
  }

  async findAll() {
    const customers = await this.customerRepository.find();

    return customers.map((customer) => this.mapModelToEntity(customer));
  }

  async findOne(cpf: string) {
    try {
      const customer = await this.customerRepository.findOne({
        where: { cpf },
      });

      return this.mapModelToEntity(customer);
    } catch (error) {
      return null;
    }
  }

  async update(cpf: string, customer: CustomerEntity): Promise<CustomerEntity> {
    const customerModel = await this.customerRepository.findOne({
      where: { cpf },
    });

    customerModel.name = customer.name;
    customerModel.email = customer.email;
    customerModel.cpf = customer.cpf;

    await this.customerRepository.save(customerModel);

    return this.mapModelToEntity(customerModel);
  }

  async remove(id: string): Promise<void> {
    await this.customerRepository.delete({ id });
  }

  mapModelToEntity(dataModel: Customer): CustomerEntity {
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
}
