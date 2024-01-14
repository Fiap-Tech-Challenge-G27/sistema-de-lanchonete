import { Inject, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { UpdateCustomerDto } from '../dtos/update-customer.dto';
import { ICustomerRepository } from '../repositories/customer.repository.interface';
import { ICustomersService } from './customers.service.interface';
import { IExceptionService } from '@shared/exceptions/exceptions.interface';
import { CustomerMapper } from '../mappers/customer.mapper';

@Injectable()
export class CustomersService implements ICustomersService {
  constructor(
    @Inject(ICustomerRepository)
    private readonly customerRepository: ICustomerRepository,
    @Inject(IExceptionService)
    private readonly exceptionService: IExceptionService,
    private readonly customerMapper: CustomerMapper,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const { name, email, cpf } = createCustomerDto;

    const customerAlreadyExists =
      await this.customerRepository.findCustomerByCpf(cpf);

    if (customerAlreadyExists) {
      this.exceptionService.badRequestException({
        message: 'Customer already exists with this cpf',
        code: 400,
      });
    }

    const customer = this.customerMapper.mapDtoToEntity(createCustomerDto);

    const createdCustomer =
      await this.customerRepository.createCustomer(customer);

    return createdCustomer;
  }

  async findAll() {
    const listCustomers = await this.customerRepository.findAllCustomers();
    return listCustomers;
  }

  async findOne(cpf: string) {
    const customer = await this.customerRepository.findCustomerByCpf(cpf);

    if (!customer) {
      this.exceptionService.notFoundException({
        message: 'Customer not found',
        code: 404,
      });
    }

    return customer;
  }

  async update(cpf: string, updateCustomerDto: UpdateCustomerDto) {
    const { name, email } = updateCustomerDto;

    const customerExists = await this.customerRepository.findCustomerByCpf(cpf);

    if (!customerExists) {
      this.exceptionService.notFoundException({
        message: 'Customer not found',
        code: 404,
      });
    }

    const cpfAlreadyExists =
      await this.customerRepository.findCustomerByCpf(cpf);

    if (cpfAlreadyExists && cpfAlreadyExists.cpf !== cpf) {
      this.exceptionService.badRequestException({
        message: 'Customer already exists with this cpf',
        code: 400,
      });
    }

    const customer = this.customerMapper.mapDtoToEntity(updateCustomerDto);

    const updatedCustomer = await this.customerRepository.updateCustomer(
      cpf,
      customer,
    );

    return updatedCustomer;
  }

  async remove(cpf: string) {
    const customer = await this.customerRepository.findCustomerByCpf(cpf);

    if (!customer) {
      this.exceptionService.notFoundException({
        message: 'Customer not found',
        code: 404,
      });
    }

    return await this.customerRepository.deleteCustomer(customer.id);
  }
}
