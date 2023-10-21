import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './adapters/inbound/dtos/create-product.dto';
import { UpdateProductDto } from './adapters/inbound/dtos/update-product.dto';
import { IProductService } from './ports/IProductService';
import { Product } from './entities/product.entity';
import { ICategoryRepository } from '../categories/ports/ICategoryRepository';
import { IProductRepository } from './ports/IProductRepository';

@Injectable()
export class ProductsService implements IProductService {
  constructor(
    @Inject(ICategoryRepository)
    private readonly categoryRepository: ICategoryRepository,
    @Inject(IProductRepository)
    private readonly productRepository: IProductRepository,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const { name, description, categoryId, price, quantity, status } =
      createProductDto;

    console.log(categoryId);

    const category = await this.categoryRepository.findCategoryById(categoryId);

    if (!category) {
      throw new HttpException('Category not found', 404);
    }

    const product = new Product(
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
      throw new HttpException('Product not found', 404);
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
      throw new HttpException('Product not found', 404);
    }

    return await this.productRepository.deleteProduct(id);
  }
}
