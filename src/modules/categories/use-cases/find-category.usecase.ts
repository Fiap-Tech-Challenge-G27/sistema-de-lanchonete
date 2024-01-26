import { Inject, Injectable } from '@nestjs/common';
import { IExceptionService } from 'src/shared/exceptions/exceptions.interface';
import { UseCase } from '@shared/core/use-case';
import { ICategoryRepository } from '../core/category-repository.abstract';

@Injectable()
export class FindCategoryUseCase implements UseCase {
  constructor(
    private readonly categoryRepository: ICategoryRepository,
    @Inject(IExceptionService)
    private readonly exceptionService: IExceptionService,
  ) {}

  async execute(idOrSlug: string, type: 'id' | 'slug') {
    const category = await this.categoryRepository.findOne(idOrSlug, type);

    if (!category) {
      this.exceptionService.notFoundException({
        message: 'Category not found',
        code: 404,
      });
    }

    return category;
  }
}
