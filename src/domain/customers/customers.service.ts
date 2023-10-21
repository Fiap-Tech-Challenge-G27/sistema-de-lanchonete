import { Injectable, Inject } from '@nestjs/common';
import { CreateCustomerDto } from './adapters/inbound/dto/create-customer.dto';
import { UpdateCustomerDto } from './adapters/inbound/dto/update-customer.dto';
import { ICustomersService } from './ports/ICustomersService';
import { ICustomerRepository } from './ports/ICustomerRepository';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService implements ICustomersService {

   constructor(
    @Inject(ICustomerRepository)
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
     const { name, email, cpf } = createCustomerDto;

    const customerAlreadyExists =
      await this.customerRepository.findCustomerByCpf(cpf);

    if (customerAlreadyExists) {
      return customerAlreadyExists;
    }

    const customer = new Customer(name, email, cpf);

    const createdCustomer =
      await this.customerRepository.createCustomer(customer);

    return createdCustomer;
  }

  findAll() {
    return `This action returns all customers`;
  }

  findOne(cpf: string) {
    return `This action returns a #${cpf} customer`;
  }

  update(cpf: string, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${cpf} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
