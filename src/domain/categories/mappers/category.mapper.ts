import { CategoryEntity } from '../entities/category.entity';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

export class CategoryMapper {
  public mapDtoToEntity(
    dataDto: CreateCategoryDto | UpdateCategoryDto,
  ): CategoryEntity {
    const category = new CategoryEntity(
      dataDto.name,
      dataDto.slug,
      dataDto.description,
    );
    return category;
  }
}
