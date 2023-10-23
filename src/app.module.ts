import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostgresConfigServiceService } from './libs/databases/postgres.service';

import { AppService } from './domain/app.service';
import { AppController } from './app.controller';

import { ProductsModule } from './domain/products/products.module';
import { CategoriesModule } from './domain/categories/categories.module';
import { CustomersModule } from './domain/customers/customers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigServiceService,
    }),
    CategoriesModule,
    ProductsModule,
    CustomersModule,
  ],
  controllers: [AppController],
  providers: [AppService, PostgresConfigServiceService],
})
export class AppModule {}
