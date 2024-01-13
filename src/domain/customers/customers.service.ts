import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { UpdateCustomerDto } from './dtos/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { ICustomerRepository } from './repositories/ICustomerRepository';
import { ICustomersService } from './ports/ICustomersService';

@Injectable()
export class CustomersService implements ICustomersService {
  constructor(
    @Inject(ICustomerRepository)
    private readonly customerRepository: ICustomerRepository,
  ) {}
  remove(cpf: string) {
    throw new Error('Method not implemented.');
  }
  async create(createCustomerDto: CreateCustomerDto) {
    const { name, email, cpf } = createCustomerDto;

    const customerAlreadyExists =
      await this.customerRepository.findCustomerByCpf(cpf);

    if (customerAlreadyExists) {
      return new HttpException('Customer already exists with this cpf', 409);
    }

    const customer = new Customer(name, email, cpf);

    const createdCustomer =
      await this.customerRepository.createCustomer(customer);

    return createdCustomer;
  }

  async findAll() {
    const listCustomers = await this.customerRepository.findAllCustomers();
    return listCustomers;
  }

  async findOne(cpf: string) {
    const customer = this.customerRepository.findCustomerByCpf(cpf);

    if (!customer) {
      throw new HttpException('Customer not found', 404);
    }

    return customer;
  }

  async update(cpf: string, updateCustomerDto: UpdateCustomerDto) {
    const { name, email } = updateCustomerDto;

    const customerExists = await this.customerRepository.findCustomerByCpf(cpf);

    if (!customerExists) {
      throw new HttpException('Customer not found', 404);
    }

    const cpfAlreadyExists =
      await this.customerRepository.findCustomerByCpf(cpf);

    if (cpfAlreadyExists && cpfAlreadyExists.cpf !== cpf) {
      throw new HttpException('Customer already exists with this cpf', 409);
    }

    const customer = new Customer(name, cpf, email);

    const updatedCustomer = await this.customerRepository.updateCustomer(
      cpf,
      customer,
    );

    return updatedCustomer;
  }
}
