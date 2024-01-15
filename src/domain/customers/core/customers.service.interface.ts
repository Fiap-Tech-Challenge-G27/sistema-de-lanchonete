import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { UpdateCustomerDto } from '../dtos/update-customer.dto';

export interface ICustomersService {
  create(createCustomeDto: CreateCustomerDto);
  findAll();
  findOne(cpf: string);
  remove(cpf: string);
  update(cpf: string, updateCustomeDto: UpdateCustomerDto);
}

export const ICustomersService = Symbol('ICustomersService');
