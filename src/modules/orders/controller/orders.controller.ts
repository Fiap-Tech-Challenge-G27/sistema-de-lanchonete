import { FindAllOrdersUseCase } from './../use-cases/find-all-orders.usecase';
import { CreateOrderUseCase } from './../use-cases/create-order.usecase';
import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from 'src/modules/orders/dtos/create-order.dto';
import { FindOrderUseCase } from '../use-cases/find-order.usecase';
import { UpdateOrderDto } from '../dtos/update-customer.dto';
import { UpdateOrderUseCase } from '../use-cases/update-order.usecase';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly findAllOrdersUseCase: FindAllOrdersUseCase,
    private readonly findOrderUseCase: FindOrderUseCase,
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

  @Post('/webhooks/payment')
  receivePaymentConfirmation(
    @Body() paymentData: UpdateOrderDto,
  ): Promise<void> {
    const { id } = paymentData;

    return this.updateOrderUseCase.execute(id, paymentData);
  }
}
