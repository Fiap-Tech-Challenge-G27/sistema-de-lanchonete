import { OrderEntity, OrderProductEntity } from '../order.entity';
import { CustomerEntity } from '@customers/core/customer.entity';
import { Mapper } from '@shared/core/mapper';

export class OrderMapper extends Mapper<
  { customer: CustomerEntity; orderProductsEntity: OrderProductEntity[] },
  OrderEntity
> {
  mapFrom(param: {
    customer: CustomerEntity;
    orderProductsEntity: OrderProductEntity[];
  }): OrderEntity {
    const { customer, orderProductsEntity } = param;
    const order = new OrderEntity(customer, orderProductsEntity);
    return order;
  }
}
