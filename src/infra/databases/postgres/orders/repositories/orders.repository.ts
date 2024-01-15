import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity, OrderProductEntity } from '@orders/entities/order.entity';
import { IOrderRepository } from '@domain/orders/repositories/order.repository.interface';
import { Repository } from 'typeorm';
import { OrderModel } from '../models/order.model';
import { OrdersProductsAmountsModel } from '../models/orders_products_amounts.model';
import { ProductModel } from 'src/infra/databases/postgres/products/models/product.model';
import { CustomerEntity } from '@customers/entities/customer.entity';
import { ProductEntity } from '@products/entities/product.entity';
import { CategoryEntity } from '@domain/categories/entities/category.entity';

@Injectable()
export class OrderModelRepository implements IOrderRepository {
  constructor(
    @InjectRepository(OrderModel)
    private readonly orderRepository: Repository<OrderModel>,
    @InjectRepository(OrdersProductsAmountsModel)
    private readonly orderProductAmountRepository: Repository<OrdersProductsAmountsModel>,
  ) {}

  async create(order: OrderEntity): Promise<OrderEntity> {
    const orderModel = this.mapEntityToModel(order);

    const orderCreated = await this.orderRepository.save(orderModel);

    orderCreated.orders_products_amounts = await Promise.all(
      order.orderProducts.map(async (orderProduct) => {
        return await this._saveOrderProductAmountModel(
          orderCreated,
          orderProduct.product,
          orderProduct.amount,
        );
      }),
    );

    return this.mapModelToEntity(orderCreated);
  }

  private async _saveOrderProductAmountModel(
    orderModel: OrderModel,
    product: ProductEntity,
    amount: number,
  ) {
    const order_product_amount_model = new OrdersProductsAmountsModel();
    order_product_amount_model.order_id = orderModel.id;
    order_product_amount_model.order = orderModel;
    order_product_amount_model.amount = amount;

    const productModel = new ProductModel();
    productModel.name = product.name;
    productModel.description = product.description;
    productModel.category = <any>product.category;
    productModel.price = product.price;
    productModel.quantity = product.quantity;
    productModel.status = product.status;
    productModel.id = product.id;

    order_product_amount_model.product_id = product.id;
    order_product_amount_model.product = productModel;

    return await this.orderProductAmountRepository.save(
      order_product_amount_model,
    );
  }

  async findAll(): Promise<OrderEntity[]> {
    const orders = await this.orderRepository.find({
      relations: {
        orders_products_amounts: {
          product: {
            category: true,
          },
        },
      },
    });

    return orders.map((order) => this.mapModelToEntity(order));
  }

  async findById(id: string): Promise<OrderEntity> {
    try {
      const order = await this.orderRepository.findOne({
        where: { id },
        relations: {
          orders_products_amounts: {
            product: {
              category: true,
            },
          },
        },
      });

      return this.mapModelToEntity(order);
    } catch (error) {
      return null;
    }
  }

  mapModelToEntity(orderModel: OrderModel): OrderEntity {
    const order = new OrderEntity(
      new CustomerEntity(
        orderModel.customer.name,
        orderModel.customer.email,
        orderModel.customer.cpf,
      ),
      orderModel.orders_products_amounts.map(function (item) {
        const productItem = item.product;
        const categoryItem = item.product.category;
        const product = new ProductEntity(
          productItem.name,
          productItem.description,

          productItem.price,
          productItem.quantity,
          productItem.status,
          new CategoryEntity(
            categoryItem.name,
            categoryItem.slug,
            categoryItem.description,
          ),
          productItem.id,
        );
        return new OrderProductEntity(product, item.amount);
      }),
      orderModel.state,
    );

    order.id = orderModel.id;
    order.createdAt = orderModel.createdAt;
    order.updatedAt = orderModel.updatedAt;

    return order;
  }

  mapEntityToModel(dataEntity: OrderEntity): OrderModel {
    const orderModel = new OrderModel();
    orderModel.state = dataEntity.state;
    orderModel.customer = dataEntity.customer;

    return orderModel;
  }
}
