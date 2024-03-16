import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '@shared/core/use-case';
import { IOrderRepository } from '../core/order-repository.abstract';
import { OrderEntity } from '../core/order.entity';
import { CustomerEntity } from '@modules/customers/core/customer.entity';

@Injectable()
export class FindAllOrdersUseCase implements UseCase {
  constructor(
    @Inject(IOrderRepository)
    private readonly orderRepository: IOrderRepository,
  ) {}

  private readonly statePriority: Record<string, number> = {
    Done: 0,
    InPreparation: 1,
    Received: 2,
  };

  async execute(customer: CustomerEntity) {
    const orders = await this.orderRepository.findAllByCustomerId(customer.id);

    const filteredOrders = orders.filter(
      (order: OrderEntity) => order.state !== 'Finished',
    );

    const sortedOrders = filteredOrders.sort((a, b) => {
      const stateOrder =
        this.getStateOrder(a.state) - this.getStateOrder(b.state);
      if (stateOrder !== 0) {
        return stateOrder;
      }
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

    return sortedOrders;
  }

  private getStateOrder(state: string): number {
    return this.statePriority[state] ?? Number.MAX_SAFE_INTEGER;
  }
}
