import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './adapters/inbound/controller/customers.controller';
import { ICustomerRepository } from './ports/ICustomerRepository';
import { CustomerModelRepository } from './adapters/outbound/repositories/customer.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModel } from './adapters/outbound/models/customer.model';
import { ICustomersService } from './ports/ICustomersService';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerModel])],
  controllers: [CustomersController],
  providers: [
    CustomersService,
    {
      provide: ICustomerRepository,
      useClass: CustomerModelRepository,
    },
    {
      provide: ICustomersService,
      useClass: CustomersService,
    },
  ],
})
export class CustomersModule {}
