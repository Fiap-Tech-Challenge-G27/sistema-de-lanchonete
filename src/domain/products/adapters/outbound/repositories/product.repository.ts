import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/domain/products/entities/product.entity';
import { IProductRepository } from 'src/domain/products/ports/IProductRepository';
import { ProductModel } from '../models/product.model';
import { Repository } from 'typeorm';

export class ProductModelRepository implements IProductRepository {
  constructor(
    @InjectRepository(ProductModel)
    private readonly productRepository: Repository<ProductModel>,
  ) {}
  async createProduct(product: Product) {
    const productModel = new ProductModel();
    productModel.name = product.name;
    productModel.description = product.description;
    productModel.category = <any>product.category;
    productModel.price = product.price;
    productModel.quantity = product.quantity;
    productModel.status = product.status;

    await this.productRepository.save(productModel);
  }

  async findAllProducts() {
    // get product and category name

    const listOfProducts = await this.productRepository.find({
      relations: ['category'],
      loadEagerRelations: false,
    });

    return listOfProducts.map((product) => {
      return new Product(
        product.name,
        product.description,
        product.category,
        product.price,
        product.quantity,
        product.status,
      );
    });
  }
}
