import { Module } from '@nestjs/common';
import { CategoriesService } from './core/categories.service';
import { CategoriesController } from './controller/categories.controller';
import { ICategoryRepository } from './repositories/category.repository.interface';
import { CategoryModelRepository } from '@infra/databases/postgres/categories/repositories/category.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModel } from '@infra/databases/postgres/categories/models/category.model';
import { ICategoriesService } from './core/categories.service.interface';
import { CategoryMapper } from './mappers/category.mapper';
import { ExceptionsService } from '@infra/exceptions/exceptions.service';
import { IExceptionService } from '@shared/exceptions/exceptions.interface';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryModel])],
  controllers: [CategoriesController],
  providers: [
    {
      provide: ICategoriesService,
      useClass: CategoriesService,
    },
    {
      provide: ICategoryRepository,
      useClass: CategoryModelRepository,
    },
    {
      provide: ICategoriesService,
      useClass: CategoriesService,
    },
    {
      provide: IExceptionService,
      useClass: ExceptionsService,
    },
    CategoryMapper,
  ],
})
export class CategoriesModule {}
