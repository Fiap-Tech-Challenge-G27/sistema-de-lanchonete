import { FindAllOrdersUseCase } from './../use-cases/find-all-orders.usecase';
import { CreateOrderUseCase } from './../use-cases/create-order.usecase';
import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from 'src/modules/orders/dtos/create-order.dto';
import { FindOrderUseCase } from '../use-cases/find-order.usecase';
import { UpdateOrderDto } from '../dtos/update-customer.dto';
import { PaymentConfirmationDto } from '../dtos/payment-confirmation.dto';
import { UpdateOrderUseCase } from '../use-cases/update-order.usecase';
import { ConfirmatePaymentUseCase } from '../use-cases/confimate-payment.usecase';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly findAllOrdersUseCase: FindAllOrdersUseCase,
    private readonly findOrderUseCase: FindOrderUseCase,
    private readonly confirmatePaymentUseCase: ConfirmatePaymentUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase, //private readonly updateOrderPaymentStateUseCase: UpdateOrderPaymentStateUseCase,
  ) {}

  @Post()
  create(@Body() createOrdersDto: CreateOrderDto) {
    return this.createOrderUseCase.execute(createOrdersDto);
  }

  @Get()
  findAll() {
    return this.findAllOrdersUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOrderUseCase.execute(id);
  }

  @Patch('/:id/state')
  updateOrderStatus(
    @Param('id') orderId: string,
    @Body() statusDto: UpdateOrderDto,
  ) {
    return this.updateOrderUseCase.execute(orderId, statusDto);
  }

  @Post('/webhooks/payment-confirmation')
  receivePaymentConfirmation(
    @Body() payment_confirmation: PaymentConfirmationDto,
  ): Promise<void> {
    const orderId = payment_confirmation['identifier']['orderId']
    const status = payment_confirmation['status']

    return this.confirmatePaymentUseCase.execute(orderId, status)
  }
}
