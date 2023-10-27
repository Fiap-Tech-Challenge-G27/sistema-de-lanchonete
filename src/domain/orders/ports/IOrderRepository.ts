import { Order } from '../entities/order.entity';

export interface IOrderRepository {
  create(order: Order): Promise<Order>;
  findAll(): Promise<Order[]>;
  findById(id: string): Promise<Order>;
}

export const IOrderRepository = Symbol('IOrderRepository');
