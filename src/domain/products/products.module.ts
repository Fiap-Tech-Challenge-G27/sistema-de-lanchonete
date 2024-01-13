import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './adapters/inbound/controllers/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModel } from './adapters/outbound/models/product.model';
import { ProductImageModel } from './adapters/outbound/models/productImage.model';
import { ICategoryRepository } from '../categories/ports/ICategoryRepository';
import { CategoryModelRepository } from '../../framworks/data-services/postgres/categories/repositories/category.repository';
import { IProductRepository } from './ports/IProductRepository';
import { ProductModelRepository } from './adapters/outbound/repositories/product.repository';
import { CategoryModel } from '../../framworks/data-services/postgres/categories/models/category.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductModel, ProductImageModel, CategoryModel]),
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: ICategoryRepository,
      useClass: CategoryModelRepository,
    },
    {
      provide: IProductRepository,
      useClass: ProductModelRepository,
    },
  ],
})
export class ProductsModule {}
