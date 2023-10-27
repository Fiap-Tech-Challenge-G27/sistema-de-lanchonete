import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './adapters/inbound/controller/orders.controller';
import { IOrderRepository } from './ports/IOrderRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModel } from './adapters/outbound/models/order.model';
import { IOrdersService } from './ports/IOrdersService';
import { OrderModelRepository } from './adapters/outbound/repositories/orders.repository';
import { ICustomerRepository } from '../customers/ports/ICustomerRepository';
import { CustomerModelRepository } from '../customers/adapters/outbound/repositories/customer.repository';
import { IProductRepository } from '../products/ports/IProductRepository';
import { ProductModelRepository } from '../products/adapters/outbound/repositories/product.repository';
import { OrdersProductsAmountsModel } from './adapters/outbound/models/orders_products_amounts.model';
import { CategoryModel } from '../categories/adapters/outbound/models/category.model';
import { CustomerModel } from '../customers/adapters/outbound/models/customer.model';
import { ProductModel } from '../products/adapters/outbound/models/product.model';

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
