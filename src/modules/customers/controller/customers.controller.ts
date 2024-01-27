import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { UpdateCustomerDto } from '../dtos/update-customer.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateCustomerUseCase,
  FindAllCustomersUseCase,
  FindCustomerUseCase,
  RemoveCustomerUseCase,
  UpdateCustomerUseCase,
} from 'src/modules/customers/use-cases';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(
    private readonly createCustomer: CreateCustomerUseCase,
    private readonly updateCustomer: UpdateCustomerUseCase,
    private readonly findCustomer: FindCustomerUseCase,
    private readonly findAllCustomers: FindAllCustomersUseCase,
    private readonly removeCustomer: RemoveCustomerUseCase,
  ) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.createCustomer.execute(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.findAllCustomers.execute();
  }

  @Get(':cpf')
  findOne(@Param('cpf') cpf: string) {
    return this.findCustomer.execute(cpf);
  }

  @Patch(':cpf')
  update(
    @Param('cpf') cpf: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.updateCustomer.execute(cpf, updateCustomerDto);
  }

  @Delete(':cpf')
  remove(@Param('cpf') cpf: string) {
    return this.removeCustomer.execute(cpf);
  }
}
