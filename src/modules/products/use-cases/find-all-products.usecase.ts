import { Injectable } from '@nestjs/common';
import { IProductRepository } from '../core/product-repository.abstract';
import { UseCase } from '@shared/core/use-case';

@Injectable()
export class FindAllProductsUseCase implements UseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute() {
    const listOfProducts = await this.productRepository.findAll();

    return listOfProducts;
  }
}
