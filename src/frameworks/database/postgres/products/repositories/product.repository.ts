import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/domain/products/entities/product.entity';
import { IProductRepository } from 'src/domain/products/ports/IProductRepository';
import { ProductModel } from '../models/product.model';
import { Repository } from 'typeorm';
import { Category } from 'src/domain/categories/entities/category.entity';

export class ProductModelRepository implements IProductRepository {
  constructor(
    @InjectRepository(ProductModel)
    private readonly productRepository: Repository<ProductModel>,
  ) {}
  async createProduct(product: Product): Promise<Product> {
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

  async findAllProducts(): Promise<Product[]> {
    const listOfProducts = await this.productRepository.find({
      relations: ['category'],
      loadEagerRelations: false,
    });

    return listOfProducts.map((product) => this.modelToEntity(product));
  }

  async findProductById(id: string): Promise<Product> {
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

  async updateProduct(id: string, product: Product): Promise<Product> {
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

  modelToEntity(productModel: ProductModel): Product {
    const product = new Product(
      productModel.name,
      productModel.description,
      productModel.price,
      productModel.quantity,
      productModel.status,
      new Category(
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
