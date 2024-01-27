import { Inject, Injectable } from '@nestjs/common';
import { IExceptionService } from 'src/shared/exceptions/exceptions.interface';
import { UseCase } from '@shared/core/use-case';
import { OrderMapper } from '../core/mappers/order.mapper';
import { IOrderRepository } from '../core/order-repository.abstract';
import { UpdateOrderDto } from '../dtos/update-customer.dto';

@Injectable()
export class UpdateOrderUseCase implements UseCase {
  constructor(
    @Inject(IOrderRepository)
    private readonly orderRepository: IOrderRepository,
    @Inject(IExceptionService)
    private readonly exceptionService: IExceptionService,
    private readonly orderMapper: OrderMapper,
  ) {}

  async execute(id: string, updateOrderDto: UpdateOrderDto) {
    const orderExists = await this.orderRepository.findOne(id);

    if (!orderExists) {
      this.exceptionService.notFoundException({
        message: 'Order not found',
        code: 404,
      });
    }

    const fieldsToUpdate = {};

    if (updateOrderDto.state !== undefined) {
      fieldsToUpdate['state'] = updateOrderDto.state;
    }

    if (updateOrderDto.paymentState !== undefined) {
      fieldsToUpdate['paymentState'] = updateOrderDto.paymentState;
    }

    const updatedOrder = { ...orderExists, ...fieldsToUpdate };

    const updatedCustomer = await this.orderRepository.update(id, updatedOrder);

    return updatedCustomer;
  }
}
