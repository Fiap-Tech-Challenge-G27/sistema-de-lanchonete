import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from '../core/product-repository.abstract';
import { UseCase } from '@shared/core/use-case';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { IExceptionService } from '@shared/exceptions/exceptions.interface';
import { ICategoryRepository } from '@modules/categories/core/category-repository.abstract';

@Injectable()
export class UpdateProductUseCase implements UseCase {
  constructor(
    private readonly categoryRepository: ICategoryRepository,
    private readonly productRepository: IProductRepository,
    @Inject(IExceptionService)
    private readonly exceptionService: IExceptionService,
  ) {}

  async execute(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne(id);

    if (!product) {
      this.exceptionService.notFoundException({
        message: 'Category not found',
        code: 404,
      });
    }

    const { name, description, categoryId, price, quantity, status } =
      updateProductDto;

    const category = await this.categoryRepository.findOne(categoryId);

    product.name = name;
    product.description = description;
    product.category = category;
    product.price = price;
    product.quantity = quantity;
    product.status = status;

    const updatedProduct = await this.productRepository.update(id, product);

    return updatedProduct;
  }
}
