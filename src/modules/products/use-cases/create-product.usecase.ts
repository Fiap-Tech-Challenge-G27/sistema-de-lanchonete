import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dtos/create-product.dto';
import { ICategoryRepository } from '@categories/core/category-repository.abstract';
import { IProductRepository } from '../core/product-repository.abstract';
import { IExceptionService } from '@shared/exceptions/exceptions.interface';
import { ProductMapper } from '../core/product.mapper';
import { UseCase } from '@shared/core/use-case';

@Injectable()
export class CreateProductUseCase implements UseCase {
  constructor(
    private readonly categoryRepository: ICategoryRepository,
    private readonly productRepository: IProductRepository,
    private readonly productMapper: ProductMapper,
    @Inject(IExceptionService)
    private readonly exceptionService: IExceptionService,
  ) {}

  async execute(dataDto: CreateProductDto) {
    const { categoryId } = dataDto;

    const category = await this.categoryRepository.findOne(categoryId, 'id');

    if (!category) {
      this.exceptionService.notFoundException({
        message: 'Category not found',
        code: 404,
      });
    }

    const product = this.productMapper.mapFrom({ category, dataDto });
    const createdProduct = await this.productRepository.create(product);
    return createdProduct;
  }
}
