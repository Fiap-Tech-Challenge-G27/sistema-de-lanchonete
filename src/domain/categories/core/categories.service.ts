import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { ICategoryRepository } from '../repositories/ICategoryRepository';
import { ICategoriesService } from './categories.service.interface';
import { CategoryMapper } from '../mappers/category.mapper';
import { IExceptionService } from 'src/domain/shared/exceptions/exceptions.interface';

@Injectable()
export class CategoriesService implements ICategoriesService {
  constructor(
    @Inject(ICategoryRepository)
    private readonly categoryRepository: ICategoryRepository,
    private readonly categoryMapper: CategoryMapper,
    @Inject(IExceptionService)
    private readonly exceptionService: IExceptionService,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const { slug } = createCategoryDto;

    const categoryAlreadyExists =
      await this.categoryRepository.findCategoryBySlug(slug);

    if (categoryAlreadyExists) {
      this.exceptionService.badRequestException({
        message: 'Category already exists with this slug',
        code: 400,
      });
    }

    const category = this.categoryMapper.mapDtoToEntity(createCategoryDto);

    const createdCategory =
      await this.categoryRepository.createCategory(category);

    return createdCategory;
  }

  async findAll() {
    const listCategories = await this.categoryRepository.findAllCategories();
    return listCategories;
  }

  async findBySlug(slug: string) {
    const category = await this.categoryRepository.findCategoryBySlug(slug);

    if (!category) {
      this.exceptionService.notFoundException({
        message: 'Category not found',
        code: 404,
      });
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const { slug } = updateCategoryDto;

    const categoryExists = await this.categoryRepository.findCategoryById(id);

    if (!categoryExists) {
      this.exceptionService.notFoundException({
        message: 'Category not found',
        code: 404,
      });
    }

    const slugAlreadyExists =
      await this.categoryRepository.findCategoryBySlug(slug);

    if (slugAlreadyExists && slugAlreadyExists.id !== id) {
      this.exceptionService.badRequestException({
        message: 'Category already exists with this slug',
        code: 400,
      });
    }

    const category = this.categoryMapper.mapDtoToEntity(updateCategoryDto);

    const updatedCategory = await this.categoryRepository.updateCategory(
      id,
      category,
    );

    return updatedCategory;
  }
}
