import { CustomerEntity } from '@customers/entities/customer.entity';
import { ProductEntity } from '@products/entities/product.entity';

export enum OrderState {
  PendingPayment = 'PendingPayment',
  Received = 'Received',
  InPreparation = 'InPreparation',
  Ready = 'Ready',
  Finishe = 'Finished',
}
export class Order {
  customer: CustomerEntity;
  productAmounts: Array<[ProductEntity, number]>;
  state: OrderState;

  id: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    customer: CustomerEntity,
    productAmounts: Array<[ProductEntity, number]>,
    state: OrderState = OrderState.Received,
  ) {
    this.customer = customer;
    this.productAmounts = productAmounts;
    this.state = state;
  }
}
