import { Module } from '@nestjs/common';
import { CustomersService } from './core/customers.service';
import { CustomersController } from './controller/customers.controller';
import { ICustomerRepository } from './repositories/customer.repository.interface';
import { CustomerModelRepository } from '@infra/databases/postgres/customers/repositories/customer.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModel } from '@infra/databases/postgres/customers/models/customer.model';
import { ICustomersService } from './core/customers.service.interface';
import { IExceptionService } from '@shared/exceptions/exceptions.interface';
import { ExceptionsService } from '@infra/exceptions/exceptions.service';
import { CustomerMapper } from './mappers/customer.mapper';

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
    {
      provide: IExceptionService,
      useClass: ExceptionsService,
    },
    CustomerMapper,
  ],
})
export class CustomersModule {}
