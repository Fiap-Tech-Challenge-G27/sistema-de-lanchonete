import { Inject, Injectable } from '@nestjs/common';
import { IExceptionService } from 'src/shared/exceptions/exceptions.interface';
import { UseCase } from '@shared/core/use-case';
import { OrderState, PaymentState } from '@orders/core/order.entity';
import { UpdateOrderDto } from '../dtos/update-customer.dto';
import { IOrderRepository } from '../core/order-repository.abstract';

const PAYMENT_STATUS_MAP = new Map<string, PaymentState>([
  ["approved", PaymentState.Approved],
  ["canceled", PaymentState.Canceled]
])

const ORDER_STATUS_MAP = new Map<string, OrderState>([
  ["approved", OrderState.InPreparation],
  ["canceled", OrderState.Finished]
])

@Injectable()
export class ConfirmatePaymentUseCase implements UseCase {
  constructor(
    @Inject(IOrderRepository)
    private readonly orderRepository: IOrderRepository,
    @Inject(IExceptionService)
    private readonly exceptionService: IExceptionService,
  ) { }

  async execute(orderId: string, paymentStatus: string) {
    const orderExists = await this.orderRepository.findOne(orderId);

    if (!orderExists) {
      this.exceptionService.notFoundException({
        message: 'Order not found',
        code: 404,
      });
    }

    const fieldsToUpdate = {};

    if (PAYMENT_STATUS_MAP.has(paymentStatus)) {
      fieldsToUpdate['paymentState'] = PAYMENT_STATUS_MAP.get(paymentStatus);
    }

    if (ORDER_STATUS_MAP.has(paymentStatus)) {
      fieldsToUpdate['state'] = ORDER_STATUS_MAP.get(paymentStatus);
    }

    const updatedOrder = { ...orderExists, ...fieldsToUpdate };

    const updatedCustomer = await this.orderRepository.update(orderId, updatedOrder);

    return updatedCustomer;
  }
}
