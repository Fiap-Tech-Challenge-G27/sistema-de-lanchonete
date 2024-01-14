import { OrderEntity, OrderProductEntity } from '../entities/order.entity';
import { CustomerEntity } from '@domain/customers/entities/customer.entity';

export class OrderMapper {
  public mapDtoToEntity(
    customer: CustomerEntity,
    orderProducts: OrderProductEntity[],
  ): OrderEntity {
    const order = new OrderEntity(customer, orderProducts);
    return order;
  }
  // public mapModelToEntity(dataModel: CategoryModel): CategoryEntity {
  //   let productsEntity: ProductEntity[];
  //   if (dataModel.products) {
  //     productsEntity = dataModel.products.map((product) => {
  //       const newProduct = new ProductEntity(
  //         product.name,
  //         product.description,
  //         product.price,
  //         product.quantity,
  //         product.status,
  //         product.category,
  //         product.id,
  //       );
  //       return newProduct;
  //     });
  //   }
  //   const category = new CategoryEntity(
  //     dataModel.name,
  //     dataModel.slug,
  //     dataModel.description,
  //     dataModel.id,
  //     dataModel.createdAt,
  //     dataModel.updatedAt,
  //     productsEntity,
  //   );
  //   return category;
  // }
  // public mapEntityToModel(dataEntity: CategoryEntity): CategoryModel {
  //   const category = new CategoryModel(
  //     dataEntity.name,
  //     dataEntity.slug,
  //     dataEntity.description,
  //   );
  //   return category;
  // }
}
