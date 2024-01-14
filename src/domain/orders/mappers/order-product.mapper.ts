import { ProductEntity } from '@domain/products/entities/product.entity';
import { OrderProductEntity } from '../entities/order.entity';

export class OrderProductMapper {
  public mapDtoToEntity(
    product: ProductEntity,
    amount: number,
  ): OrderProductEntity {
    const orderProduct = new OrderProductEntity(product, amount);

    return orderProduct;
  }
}
