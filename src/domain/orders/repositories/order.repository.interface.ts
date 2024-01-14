import { OrderEntity } from '../entities/order.entity';

export interface IOrderRepository {
  create(order: OrderEntity): Promise<OrderEntity>;
  findAll(): Promise<OrderEntity[]>;
  findById(id: string): Promise<OrderEntity>;
}

export const IOrderRepository = Symbol('IOrderRepository');
