import { Module } from '@nestjs/common';
import { CategoriesController } from './controller/categories.controller';
import { ICategoryRepository } from './core/category-repository.abstract';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '@categories/infra/typeorm/entities/category';
import { CategoryMapper } from './core/category.mapper';
import { ExceptionsService } from '@shared/infra/exceptions/exceptions.service';
import { IExceptionService } from '@shared/exceptions/exceptions.interface';
import { CategoryRepository } from '@categories/infra/typeorm/repositories/category.repository';
import {
  CreateCategoryUseCase,
  FindAllCategoriesUseCase,
  FindCategoryUseCase,
  UpdateCategoryUseCase,
} from './use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [
    {
      provide: ICategoryRepository,
      useClass: CategoryRepository,
    },
    {
      provide: IExceptionService,
      useClass: ExceptionsService,
    },
    CategoryMapper,
    CreateCategoryUseCase,
    UpdateCategoryUseCase,
    FindAllCategoriesUseCase,
    FindCategoryUseCase,
  ],
})
export class CategoriesModule {}
