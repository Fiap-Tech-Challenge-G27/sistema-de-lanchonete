import { CreateOrderDto } from './dto/create-order.dto';

export interface IOrdersService {
  create(createCustomeDto: CreateOrderDto);
  findAll();
}

export const IOrdersService = Symbol('IOrdersService');
