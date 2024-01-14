import { CustomerEntity } from '@customers/entities/customer.entity';
import { ProductEntity } from '@products/entities/product.entity';

export enum OrderState {
  PendingPayment = 'PendingPayment',
  Received = 'Received',
  InPreparation = 'InPreparation',
  Ready = 'Ready',
  Finishe = 'Finished',
}

export class OrderProductEntity {
  product: ProductEntity;
  amount: number;

  constructor(product: ProductEntity, amount: number) {
    this.product = product;
    this.amount = amount;
  }
}
export class OrderEntity {
  customer: CustomerEntity;
  orderProducts: OrderProductEntity[];
  state: OrderState;

  id: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    customer: CustomerEntity,
    orderProducts: OrderProductEntity[],
    state: OrderState = OrderState.Received,
  ) {
    this.customer = customer;
    this.orderProducts = orderProducts;
    this.state = state;
  }
}
