import { CustomerEntity } from '@customers/core/customer.entity';
import { ProductEntity } from '@products/core/product.entity';
import { Entity } from '@shared/core/entity';

export enum OrderState {
  Received = 'Received',
  PendingPayment = 'PendingPayment',
  InPreparation = 'InPreparation',
  Ready = 'Ready',
  Finishe = 'Finished',
}

export class OrderProductEntity extends Entity {
  product: ProductEntity;
  amount: number;

  constructor(product: ProductEntity, amount: number) {
    super();
    this.product = product;
    this.amount = amount;
  }
}
export class OrderEntity extends Entity {
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
    super();
    this.customer = customer;
    this.orderProducts = orderProducts;
    this.state = state;
  }
}
