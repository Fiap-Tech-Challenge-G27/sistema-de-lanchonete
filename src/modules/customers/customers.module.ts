import { Module } from '@nestjs/common';
import { CustomersController } from './controller/customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '@customers/infra/typeorm/entities/customer';
import { IExceptionService } from 'src/shared/exceptions/exceptions.interface';
import { ExceptionsService } from '@shared/infra/exceptions/exceptions.service';
import { CustomerMapper } from './core/customer.mapper';
import { ICustomerRepository } from './core/customer-repository.abstract';
import { CustomerRepository } from '@customers/infra/typeorm/repositories/customer.repository';

import {
  CreateCustomerUseCase,
  FindAllCustomersUseCase,
  FindCustomerUseCase,
  RemoveCustomerUseCase,
  UpdateCustomerUseCase,
} from './use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomersController],
  providers: [
    {
      provide: ICustomerRepository,
      useClass: CustomerRepository,
    },
    {
      provide: IExceptionService,
      useClass: ExceptionsService,
    },
    CreateCustomerUseCase,
    UpdateCustomerUseCase,
    FindCustomerUseCase,
    FindAllCustomersUseCase,
    RemoveCustomerUseCase,
    CustomerMapper,
  ],
})
export class CustomersModule {}
