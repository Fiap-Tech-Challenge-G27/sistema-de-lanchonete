import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './adapters/inbound/dtos/create-product.dto';
import { UpdateProductDto } from './adapters/inbound/dtos/update-product.dto';
import { IProductService } from './ports/IProductService';
import { Product } from './entities/product.entity';
import { ICategoryRepository } from '../categories/ports/ICategoryRepository';
import { IProductRepository } from './ports/IProductRepository';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(ICategoryRepository)
    private readonly categoryRepository: ICategoryRepository,
    @Inject(IProductRepository)
    private readonly productRepository: IProductRepository,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const { name, description, categoryId, price, stock, imageUrls, status } =
      createProductDto;

    const category = await this.categoryRepository.findCategoryById(categoryId);

    const product = new Product(
      name,
      description,
      category,
      price,
      stock,
      status,
    );

    const createdProduct = await this.productRepository.createProduct(product);
    return createdProduct;
  }

  async findAll() {
    const listOfProducts = await this.productRepository.findAllProducts();

    return listOfProducts;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    return `This action removes a #${id} product`;
  }
}
