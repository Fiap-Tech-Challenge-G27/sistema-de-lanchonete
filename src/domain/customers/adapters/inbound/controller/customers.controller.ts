import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { CreateCustomerDto } from '../../../dtos/create-customer.dto';
import { UpdateCustomerDto } from '../../../dtos/update-customer.dto';
import { ApiTags } from '@nestjs/swagger';
import { ICustomersService } from 'src/domain/customers/ports/ICustomersService';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(
    @Inject(ICustomersService)
    private readonly customersService: ICustomersService,
  ) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':cpf')
  findOne(@Param('cpf') cpf: string) {
    return this.customersService.findOne(cpf);
  }

  @Patch(':cpf')
  update(
    @Param('cpf') cpf: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(cpf, updateCustomerDto);
  }

  @Delete(':cpf')
  remove(@Param('cpf') cpf: string) {
    return this.customersService.remove(cpf);
  }
}
