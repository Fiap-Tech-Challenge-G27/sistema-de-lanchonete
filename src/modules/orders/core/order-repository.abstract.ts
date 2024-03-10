import { Repository } from '@shared/core/repository';
import { OrderEntity } from './order.entity';

export abstract class IOrderRepository extends Repository<OrderEntity> {
  abstract findAllByCustomerId(customerId: string);
}
