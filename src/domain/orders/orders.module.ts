import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './adapters/inbound/controller/orders.controller';
import { IOrderRepository } from './ports/IOrderRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModel } from '../../frameworks/database/postgres/orders/models/order.model';
import { IOrdersService } from './ports/IOrdersService';
import { OrderModelRepository } from '../../frameworks/database/postgres/orders/repositories/orders.repository';
import { ICustomerRepository } from '../customers/ports/ICustomerRepository';
import { CustomerModelRepository } from '../../frameworks/database/postgres/customers/repositories/customer.repository';
import { IProductRepository } from '../products/ports/IProductRepository';
import { ProductModelRepository } from '../../frameworks/database/postgres/products/repositories/product.repository';
import { OrdersProductsAmountsModel } from '../../frameworks/database/postgres/orders/models/orders_products_amounts.model';
import { CategoryModel } from '../../frameworks/database/postgres/categories/models/category.model';
import { CustomerModel } from '../../frameworks/database/postgres/customers/models/customer.model';
import { ProductModel } from '../../frameworks/database/postgres/products/models/product.model';

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
