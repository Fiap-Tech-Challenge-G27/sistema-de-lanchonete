import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { IProductService } from './products.service.interface';
import { ProductEntity } from '../entities/product.entity';
import { ICategoryRepository } from '@domain/categories/repositories/category.repository.interface';
import { IProductRepository } from '../respositories/product.repository.interface';
import { IExceptionService } from '@shared/exceptions/exceptions.interface';
import { ProductMapper } from '../mappers/product.mapper';

@Injectable()
export class ProductsService implements IProductService {
  constructor(
    @Inject(ICategoryRepository)
    private readonly categoryRepository: ICategoryRepository,
    @Inject(IProductRepository)
    private readonly productRepository: IProductRepository,
    @Inject(IExceptionService)
    private readonly exceptionService: IExceptionService,
    private readonly productMapper: ProductMapper,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const { name, description, categoryId, price, quantity, status } =
      createProductDto;

    const category = await this.categoryRepository.findCategoryById(categoryId);

    if (!category) {
      this.exceptionService.notFoundException({
        message: 'Category not found',
        code: 404,
      });
    }

    const product = this.productMapper.mapDtoToEntity(
      category,
      createProductDto,
    );

    const createdProduct = await this.productRepository.createProduct(product);
    return createdProduct;
  }

  async findAll() {
    const listOfProducts = await this.productRepository.findAllProducts();

    return listOfProducts;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findProductById(id);

    if (!product) {
      this.exceptionService.notFoundException({
        message: 'Category not found',
        code: 404,
      });
    }

    const { name, description, categoryId, price, quantity, status } =
      updateProductDto;

    const category = await this.categoryRepository.findCategoryById(categoryId);

    product.name = name;
    product.description = description;
    product.category = category;
    product.price = price;
    product.quantity = quantity;
    product.status = status;

    const updatedProduct = await this.productRepository.updateProduct(
      id,
      product,
    );

    return updatedProduct;
  }

  async remove(id: string) {
    const product = await this.productRepository.findProductById(id);

    if (!product) {
      this.exceptionService.notFoundException({
        message: 'Category not found',
        code: 404,
      });
    }

    return await this.productRepository.deleteProduct(id);
  }
}
