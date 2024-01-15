import { CustomerEntity } from '../entities/customer.entity';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { UpdateCustomerDto } from '../dtos/update-customer.dto';

export class CustomerMapper {
  public mapDtoToEntity(
    dataDto: CreateCustomerDto | UpdateCustomerDto,
  ): CustomerEntity {
    const customer = new CustomerEntity(
      dataDto.name,
      dataDto.email,
      dataDto.cpf,
    );
    return customer;
  }
}
