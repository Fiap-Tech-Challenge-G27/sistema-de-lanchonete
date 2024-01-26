import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '@shared/core/use-case';
import { ICustomerRepository } from '../core/customer-repository.abstract';

@Injectable()
export class FindAllCustomersUseCase implements UseCase {
  constructor(
    @Inject(ICustomerRepository)
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async execute() {
    const listCustomers = await this.customerRepository.findAll();
    return listCustomers;
  }
}
