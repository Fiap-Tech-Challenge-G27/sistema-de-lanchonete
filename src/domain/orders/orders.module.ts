import { Module } from '@nestjs/common';
import { OrdersService } from './core/orders.service';
import { OrdersController } from './controller/orders.controller';
import { IOrderRepository } from './repositories/IOrderRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModel } from '../../infra/databases/postgres/orders/models/order.model';
import { IOrdersService } from './core/orders.service.interface';
import { OrderModelRepository } from '../../infra/databases/postgres/orders/repositories/orders.repository';
import { ICustomerRepository } from '../customers/repositories/ICustomerRepository';
import { CustomerModelRepository } from '../../infra/databases/postgres/customers/repositories/customer.repository';
import { IProductRepository } from '../products/respositories/IProductRepository';
import { ProductModelRepository } from '../../infra/databases/postgres/products/repositories/product.repository';
import { OrdersProductsAmountsModel } from '../../infra/databases/postgres/orders/models/orders_products_amounts.model';
import { CategoryModel } from '../../infra/databases/postgres/categories/models/category.model';
import { CustomerModel } from '../../infra/databases/postgres/customers/models/customer.model';
import { ProductModel } from '../../infra/databases/postgres/products/models/product.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderModel,
      OrdersProductsAmountsModel,
      CategoryModel,
      CustomerModel,
      ProductModel,
    ]),
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    {
      provide: IOrderRepository,
      useClass: OrderModelRepository,
    },
    {
      provide: IOrdersService,
      useClass: OrdersService,
    },
    {
      provide: ICustomerRepository,
      useClass: CustomerModelRepository,
    },
    {
      provide: IProductRepository,
      useClass: ProductModelRepository,
    },
  ],
})
export class OrdersModule {}
