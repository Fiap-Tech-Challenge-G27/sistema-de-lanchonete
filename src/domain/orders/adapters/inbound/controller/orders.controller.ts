import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Inject,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IOrdersService } from 'src/domain/orders/ports/IOrdersService';
import { CreateOrderDto } from 'src/domain/orders/ports/dto/create-order.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(IOrdersService)
    private readonly ordersService: IOrdersService,
  ) {}

  @Post()
  create(@Body() createOrdersDto: CreateOrderDto) {
    return this.ordersService.create(createOrdersDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

}
