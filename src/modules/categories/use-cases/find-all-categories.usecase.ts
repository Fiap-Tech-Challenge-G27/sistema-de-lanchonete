import { Injectable } from '@nestjs/common';
import { UseCase } from '@shared/core/use-case';
import { ICategoryRepository } from '../core/category-repository.abstract';

@Injectable()
export class FindAllCategoriesUseCase implements UseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute() {
    const listCategories = await this.categoryRepository.findAll();
    return listCategories;
  }
}
