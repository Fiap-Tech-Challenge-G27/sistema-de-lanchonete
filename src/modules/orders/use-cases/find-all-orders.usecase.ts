import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '@shared/core/use-case';
import { IOrderRepository } from '../core/order-repository.abstract';

@Injectable()
export class FindAllOrdersUseCase implements UseCase {
  constructor(
    @Inject(IOrderRepository)
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute() {
    const listCustomers = await this.orderRepository.findAll();
    return listCustomers;
  }
}
