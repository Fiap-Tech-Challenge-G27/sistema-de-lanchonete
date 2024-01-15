import { Module } from '@nestjs/common';
import { ProductsService } from './core/products.service';
import { ProductsController } from './controllers/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModel } from '@infra/databases/postgres/products/models/product.model';
import { ProductImageModel } from '@infra/databases/postgres/products/models/productImage.model';
import { ICategoryRepository } from '../categories/repositories/category.repository.interface';
import { CategoryModelRepository } from '@infra/databases/postgres/categories/repositories/category.repository';
import { IProductRepository } from './respositories/product.repository.interface';
import { ProductModelRepository } from '@infra/databases/postgres/products/repositories/product.repository';
import { CategoryModel } from '@infra/databases/postgres/categories/models/category.model';
import { IProductService } from './core/products.service.interface';
import { CategoryMapper } from '../categories/mappers/category.mapper';
import { IExceptionService } from '../shared/exceptions/exceptions.interface';
import { ExceptionsService } from 'src/infra/exceptions/exceptions.service';
import { ProductMapper } from './mappers/product.mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductModel, ProductImageModel, CategoryModel]),
  ],
  controllers: [ProductsController],
  providers: [
    {
      useClass: ProductsService,
      provide: IProductService,
    },
    {
      provide: ICategoryRepository,
      useClass: CategoryModelRepository,
    },
    {
      provide: IProductRepository,
      useClass: ProductModelRepository,
    },
    {
      provide: IExceptionService,
      useClass: ExceptionsService,
    },
    CategoryMapper,
    ProductMapper,
  ],
})
export class ProductsModule {}
