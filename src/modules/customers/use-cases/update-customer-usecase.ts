import { Inject, Injectable } from '@nestjs/common';
import { UpdateCustomerDto } from '../dtos/update-customer.dto';
import { IExceptionService } from 'src/shared/exceptions/exceptions.interface';
import { CustomerMapper } from '../core/customer.mapper';
import { UseCase } from '@shared/core/use-case';
import { ICustomerRepository } from '../core/customer-repository.abstract';

@Injectable()
export class UpdateCustomerUseCase implements UseCase {
  constructor(
    @Inject(ICustomerRepository)
    private readonly customerRepository: ICustomerRepository,
    @Inject(IExceptionService)
    private readonly exceptionService: IExceptionService,
    private readonly customerMapper: CustomerMapper,
  ) {}

  async execute(cpf: string, updateCustomerDto: UpdateCustomerDto) {
    const customerExists = await this.customerRepository.findOne(cpf);

    if (!customerExists) {
      this.exceptionService.notFoundException({
        message: 'Customer not found',
        code: 404,
      });
    }

    const customer = this.customerMapper.mapFrom(updateCustomerDto);

    const updatedCustomer = await this.customerRepository.update(cpf, customer);

    return updatedCustomer;
  }
}
