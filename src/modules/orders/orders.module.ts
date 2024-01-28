import { Module } from '@nestjs/common';
import { OrdersController } from './controller/orders.controller';
import { IOrderRepository } from './core/order-repository.abstract';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '@orders/infra/typeorm/entities/order';
import { OrderRepository } from '@orders/infra/typeorm/repositories/orders.repository';
import { IProductRepository } from '../products/core/product-repository.abstract';
import { ProductRepository } from '@products/infra/typeorm/repositories/product.repository';
import { OrdersProductsAmounts } from '@orders/infra/typeorm/entities/orders-products-amounts';
import { Category } from '@categories/infra/typeorm/entities/category';
import { Customer } from '@customers/infra/typeorm/entities/customer';
import { Product } from '@products/infra/typeorm/entities/product';
import { ExceptionsService } from '@shared/infra/exceptions/exceptions.service';
import { IExceptionService } from 'src/shared/exceptions/exceptions.interface';
import { OrderMapper } from '@orders/core/mappers/order.mapper';
import { OrderProductMapper } from '@orders/core/mappers/order-product.mapper';
import { FindCustomerUseCase } from 'src/modules/customers/use-cases';
import { CustomerRepository } from '@customers/infra/typeorm/repositories/customer.repository';
import { CreateOrderUseCase } from './use-cases/create-order.usecase';
import { FindAllOrdersUseCase } from './use-cases/find-all-orders.usecase';
import { ICustomerRepository } from '@modules/customers/core/customer-repository.abstract';
import { FindOrderUseCase } from './use-cases/find-order.usecase';
import { UpdateOrderUseCase } from './use-cases/update-order.usecase';
import { ConfirmatePaymentUseCase } from './use-cases/confimate-payment.usecase';
import { IPaymentGateway } from './core/payment-gateway';
import { PaymentGateway } from './infra/typeorm/thirdParties/payment-gateway';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrdersProductsAmounts,
      Category,
      Customer,
      Product,
    ])
  ],
  controllers: [OrdersController],
  providers: [
    {
      provide: IOrderRepository,
      useClass: OrderRepository,
    },
    {
      provide: IProductRepository,
      useClass: ProductRepository,
    },
    {
      provide: IExceptionService,
      useClass: ExceptionsService,
    },
    {
      provide: ICustomerRepository,
      useClass: CustomerRepository,
    },
    {
      provide: IPaymentGateway,
      useClass: PaymentGateway
    },
    OrderMapper,
    OrderProductMapper,
    FindCustomerUseCase,
    CreateOrderUseCase,
    FindAllOrdersUseCase,
    FindCustomerUseCase,
    FindOrderUseCase,
    UpdateOrderUseCase,
    ConfirmatePaymentUseCase,
  ],
})
export class OrdersModule { }
