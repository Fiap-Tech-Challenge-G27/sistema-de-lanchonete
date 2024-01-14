import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '@products/entities/product.entity';
import { IProductRepository } from '@products/respositories/IProductRepository';
import { ProductModel } from '../models/product.model';
import { Repository } from 'typeorm';
import { CategoryEntity } from '@categories/entities/category.entity';

export class ProductModelRepository implements IProductRepository {
  constructor(
    @InjectRepository(ProductModel)
    private readonly productRepository: Repository<ProductModel>,
  ) {}
  async createProduct(product: ProductEntity): Promise<ProductEntity> {
    const productModel = new ProductModel();
    productModel.name = product.name;
    productModel.description = product.description;
    productModel.category = <any>product.category;
    productModel.price = product.price;
    productModel.quantity = product.quantity;
    productModel.status = product.status;

    const productCreated = await this.productRepository.save(productModel);

    const getProduct = await this.productRepository.findOne({
      where: { id: productCreated.id },
      relations: ['category'],
      loadEagerRelations: false,
    });

    return this.modelToEntity(getProduct);
  }

  async findAllProducts(): Promise<ProductEntity[]> {
    const listOfProducts = await this.productRepository.find({
      relations: ['category'],
      loadEagerRelations: false,
    });

    return listOfProducts.map((product) => this.modelToEntity(product));
  }

  async findProductById(id: string): Promise<ProductEntity> {
    try {
      const productModel = await this.productRepository.findOne({
        where: { id },
        relations: ['category'],
        loadEagerRelations: false,
      });

      return this.modelToEntity(productModel);
    } catch (error) {
      return null;
    }
  }

  async deleteProduct(id: string) {
    await this.productRepository.softDelete(id);
  }

  async updateProduct(
    id: string,
    product: ProductEntity,
  ): Promise<ProductEntity> {
    const productModel = await this.productRepository.findOne({
      where: { id },
    });

    productModel.name = product.name;
    productModel.description = product.description;
    productModel.category = <any>product.category;
    productModel.price = product.price;
    productModel.quantity = product.quantity;
    productModel.status = product.status;

    const productUpdated = await this.productRepository.save(productModel);

    return this.modelToEntity(productUpdated);
  }

  modelToEntity(productModel: ProductModel): ProductEntity {
    const product = new ProductEntity(
      productModel.name,
      productModel.description,
      productModel.price,
      productModel.quantity,
      productModel.status,
      new CategoryEntity(
        productModel.category.name,
        productModel.category.slug,
        productModel.category.description,
      ),
    );
    product.id = productModel.id;
    product.createdAt = productModel.createdAt;
    product.updatedAt = productModel.updatedAt;
    return product;
  }
}
