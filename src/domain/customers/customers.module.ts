import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './controller/customers.controller';
import { ICustomerRepository } from './repositories/ICustomerRepository';
import { CustomerModelRepository } from '../../frameworks/database/postgres/customers/repositories/customer.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModel } from '../../frameworks/database/postgres/customers/models/customer.model';
import { ICustomersService } from './ports/ICustomersService';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerModel])],
  controllers: [CustomersController],
  providers: [
    {
      provide: ICustomersService,
      useClass: CustomersService,
    },
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
