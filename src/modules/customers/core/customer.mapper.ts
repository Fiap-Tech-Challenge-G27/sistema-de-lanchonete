import { CustomerEntity } from './customer.entity';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { UpdateCustomerDto } from '../dtos/update-customer.dto';
import { Mapper } from '@shared/core/mapper';

export class CustomerMapper extends Mapper<
  CreateCustomerDto | UpdateCustomerDto,
  CustomerEntity
> {
  mapFrom(param: CreateCustomerDto | UpdateCustomerDto): CustomerEntity {
    const customer = new CustomerEntity(param.name, param.email, param.cpf);
    return customer;
  }
}
