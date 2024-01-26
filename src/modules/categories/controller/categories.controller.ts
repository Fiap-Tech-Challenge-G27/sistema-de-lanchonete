import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateCategoryUseCase,
  UpdateCategoryUseCase,
  FindCategoryUseCase,
  FindAllCategoriesUseCase,
} from '../use-cases';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly findAllCategoriesUseCase: FindAllCategoriesUseCase,
    private readonly findCategoryUseCase: FindCategoryUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
  ) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.createCategoryUseCase.execute(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.findAllCategoriesUseCase.execute();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.findCategoryUseCase.execute(slug, 'slug');
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.updateCategoryUseCase.execute(id, updateCategoryDto);
  }
}
