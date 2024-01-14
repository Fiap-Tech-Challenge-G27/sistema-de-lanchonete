import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { IProductService } from './products.service.interface';
import { ProductEntity } from '../entities/product.entity';
import { ICategoryRepository } from '@categories/repositories/ICategoryRepository';
import { IProductRepository } from '../respositories/IProductRepository';
import { IExceptionService } from '@shared/exceptions/exceptions.interface';

@Injectable()
export class ProductsService implements IProductService {
  constructor(
    @Inject(ICategoryRepository)
    private readonly categoryRepository: ICategoryRepository,
    @Inject(IProductRepository)
    private readonly productRepository: IProductRepository,
    @Inject(IExceptionService)
    private readonly exceptionService: IExceptionService,
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

    const product = new ProductEntity(
      name,
      description,
      price,
      quantity,
      status,
      category,
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