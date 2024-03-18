import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist';
import { Customer } from '@modules/customers/infra/typeorm/entities/customer';
import { Product } from '@modules/products/infra/typeorm/entities/product';
import { Order } from '@modules/orders/infra/typeorm/entities/order';
import { Category } from '@modules/categories/infra/typeorm/entities/category';
import { OrdersProductsAmounts } from '@modules/orders/infra/typeorm/entities/orders-products-amounts';

@Injectable()
export class PostgresConfigServiceService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      // type: this.configService.get('TYPEORM_CONNECTION'),
      type: "postgres",
      url: "postgres://fe0x8xEtGHbkj8ME:yTDcAvztw8TW9ixB@postgresapp.c5m86oo0sf33.us-east-1.rds.amazonaws.com:5432/app",
      // url: this.configService.get('TYPEORM_URL'),
      entities: [Customer, Product, Order, Category, OrdersProductsAmounts],
      synchronize: true,
    };
  }
}
