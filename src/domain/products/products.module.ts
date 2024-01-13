import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './adapters/inbound/controllers/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModel } from '../../frameworks/database/postgres/products/models/product.model';
import { ProductImageModel } from '../../frameworks/database/postgres/products/models/productImage.model';
import { ICategoryRepository } from '../categories/repositories/ICategoryRepository';
import { CategoryModelRepository } from '../../frameworks/database/postgres/categories/repositories/category.repository';
import { IProductRepository } from './respositories/IProductRepository';
import { ProductModelRepository } from '../../frameworks/database/postgres/products/repositories/product.repository';
import { CategoryModel } from '../../frameworks/database/postgres/categories/models/category.model';

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
