import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './adapters/inbound/controller/customers.controller';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
