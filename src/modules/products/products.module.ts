import { Module } from '@nestjs/common';
import { ProductsController } from './controller/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@products/infra/typeorm/entities/product';
import { ProductImage } from '@products/infra/typeorm/entities/productImage';
import { ICategoryRepository } from '@categories/core/category-repository.abstract';
import { CategoryRepository } from '@categories/infra/typeorm/repositories/category.repository';
import { IProductRepository } from './core/product-repository.abstract';
import { ProductRepository } from '@products/infra/typeorm/repositories/product.repository';
import { Category } from '@categories/infra/typeorm/entities/category';
import { CategoryMapper } from '../categories/core/category.mapper';
import { IExceptionService } from '../../shared/exceptions/exceptions.interface';
import { ExceptionsService } from '@shared/infra/exceptions/exceptions.service';
import { ProductMapper } from './core/product.mapper';
import {
  CreateProductUseCase,
  FindAllProductsUseCase,
  RemoveProductUseCase,
  UpdateProductUseCase,
} from './use-cases';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductImage, Category])],
  controllers: [ProductsController],
  providers: [
    {
      provide: ICategoryRepository,
      useClass: CategoryRepository,
    },
    {
      provide: IProductRepository,
      useClass: ProductRepository,
    },
    {
      provide: IExceptionService,
      useClass: ExceptionsService,
    },
    CategoryMapper,
    ProductMapper,
    CreateProductUseCase,
    FindAllProductsUseCase,
    RemoveProductUseCase,
    UpdateProductUseCase,
  ],
})
export class ProductsModule {}
