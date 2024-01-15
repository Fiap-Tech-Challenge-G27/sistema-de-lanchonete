import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '@products/entities/product.entity';
import { IProductRepository } from '@domain/products/respositories/product.repository.interface';
import { ProductModel } from '../models/product.model';
import { Repository } from 'typeorm';
import { CategoryEntity } from '@categories/entities/category.entity';

export class ProductModelRepository implements IProductRepository {
  constructor(
    @InjectRepository(ProductModel)
    private readonly productRepository: Repository<ProductModel>,
  ) {}
  async createProduct(product: ProductEntity): Promise<ProductEntity> {
    const productModel = this.mapEntityToModel(product);

    const productCreated = await this.productRepository.save(productModel);

    const getProduct = await this.productRepository.findOne({
      where: { id: productCreated.id },
      relations: ['category'],
      loadEagerRelations: false,
    });

    return this.mapModelToEntity(getProduct);
  }

  async findAllProducts(): Promise<ProductEntity[]> {
    const listOfProducts = await this.productRepository.find({
      relations: ['category'],
      loadEagerRelations: false,
    });

    return listOfProducts.map((product) => this.mapModelToEntity(product));
  }

  async findProductById(id: string): Promise<ProductEntity> {
    try {
      const productModel = await this.productRepository.findOne({
        where: { id },
        relations: ['category'],
        loadEagerRelations: false,
      });

      return this.mapModelToEntity(productModel);
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

    return this.mapModelToEntity(productUpdated);
  }

  mapModelToEntity(dataModel: ProductModel): ProductEntity {
    const product = new ProductEntity(
      dataModel.name,
      dataModel.description,
      dataModel.price,
      dataModel.quantity,
      dataModel.status,
      new CategoryEntity(
        dataModel.category.name,
        dataModel.category.slug,
        dataModel.category.description,
      ),
    );
    product.id = dataModel.id;
    product.createdAt = dataModel.createdAt;
    product.updatedAt = dataModel.updatedAt;
    return product;
  }
  mapEntityToModel(dataEntity: ProductEntity): ProductModel {
    const product = new ProductModel();
    product.name = dataEntity.name;
    product.description = dataEntity.description;
    product.category = <any>dataEntity.category;
    product.price = dataEntity.price;
    product.quantity = dataEntity.quantity;
    product.status = dataEntity.status;

    return product;
  }
}
