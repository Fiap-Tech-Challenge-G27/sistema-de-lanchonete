import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateProductUseCase,
  FindAllProductsUseCase,
  RemoveProductUseCase,
  UpdateProductUseCase,
} from '../use-cases';
import { CreateProductDto } from '../dtos/create-product.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findAllProductsUseCase: FindAllProductsUseCase,
    private readonly removeProductUseCase: RemoveProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.createProductUseCase.execute(createProductDto);
  }

  @Get()
  async findAll() {
    return this.findAllProductsUseCase.execute();
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.updateProductUseCase.execute(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeProductUseCase.execute(id);
  }
}
