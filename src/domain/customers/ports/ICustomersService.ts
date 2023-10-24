import { CreateCustomerDto } from '../adapters/inbound/dto/create-customer.dto';
import { UpdateCustomerDto } from '../adapters/inbound/dto/update-customer.dto';

export interface ICustomersService {
  create(createCustomeDto: CreateCustomerDto);
  findAll();
  findOne(cpf: string);
  remove(cpf: string);
  update(cpf: string, updateCustomeDto: UpdateCustomerDto);
}

export const ICustomersService = Symbol('ICustomersService');
