import { Inject, Injectable } from '@nestjs/common';
import { IExceptionService } from 'src/shared/exceptions/exceptions.interface';
import { UseCase } from '@shared/core/use-case';
import { ICustomerRepository } from '../core/customer-repository.abstract';

@Injectable()
export class FindCustomerUseCase implements UseCase {
  constructor(
    @Inject(ICustomerRepository)
    private readonly customerRepository: ICustomerRepository,
    @Inject(IExceptionService)
    private readonly exceptionService: IExceptionService,
  ) {}

  async execute(cpf: string) {
    const customer = await this.customerRepository.findOne(cpf);

    if (!customer) {
      this.exceptionService.notFoundException({
        message: 'Customer not found',
        code: 404,
      });
    }

    return customer;
  }
}
