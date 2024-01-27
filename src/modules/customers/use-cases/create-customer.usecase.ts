import { Inject, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { IExceptionService } from 'src/shared/exceptions/exceptions.interface';

import { UseCase } from '@shared/core/use-case';
import { CustomerMapper } from 'src/modules/customers/core/customer.mapper';
import { ICustomerRepository } from '../core/customer-repository.abstract';

@Injectable()
export class CreateCustomerUseCase implements UseCase {
  constructor(
    @Inject(ICustomerRepository)
    private readonly customerRepository: ICustomerRepository,
    @Inject(IExceptionService)
    private readonly exceptionService: IExceptionService,
    private readonly customerMapper: CustomerMapper,
  ) {}

  async execute(createCustomerDto: CreateCustomerDto) {
    const { cpf } = createCustomerDto;

    const customerAlreadyExists = await this.customerRepository.findOne(cpf);

    if (customerAlreadyExists) {
      this.exceptionService.badRequestException({
        message: 'Customer already exists with this cpf',
        code: 400,
      });
    }

    const customer = this.customerMapper.mapFrom(createCustomerDto);

    const createdCustomer = await this.customerRepository.create(customer);

    return createdCustomer;
  }
}
