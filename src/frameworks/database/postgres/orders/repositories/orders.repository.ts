import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/domain/orders/entities/order.entity';
import { IOrderRepository } from 'src/domain/orders/repositories/IOrderRepository';
import { Repository } from 'typeorm';
import { OrderModel } from '../models/order.model';
import { OrdersProductsAmountsModel } from '../models/orders_products_amounts.model';
import { ProductModel } from 'src/frameworks/database/postgres/products/models/product.model';
import { Customer } from 'src/domain/customers/entities/customer.entity';
import { Product } from 'src/domain/products/entities/product.entity';
import { Category } from 'src/domain/categories/entities/category.entity';
import { CustomerModel } from 'src/frameworks/database/postgres/customers/models/customer.model';

@Injectable()
export class OrderModelRepository implements IOrderRepository {
  constructor(
    @InjectRepository(OrderModel)
    private readonly orderRepository: Repository<OrderModel>,
    @InjectRepository(OrdersProductsAmountsModel)
    private readonly orderProductAmountRepository: Repository<OrdersProductsAmountsModel>,
  ) {}

  async create(order: Order): Promise<Order> {
    const orderModel = new OrderModel();
    orderModel.state = order.state;

    orderModel.customer = new CustomerModel();
    orderModel.customer.cpf = order.customer.cpf;
    orderModel.customer.name = order.customer.name;
    orderModel.customer.email = order.customer.email;
    orderModel.customer.id = order.customer.id;

    const orderCreated = await this.orderRepository.save(orderModel);

    orderCreated.orders_products_amounts = await Promise.all(
      order.productAmounts.map(async ([product, amount]) => {
        return await this._saveOrderProductAmountModel(
          orderCreated,
          product,
          amount,
        );
      }),
    );

    return this.modelToEntity(orderCreated);
  }

  private async _saveOrderProductAmountModel(
    orderModel: OrderModel,
    product: Product,
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

  async findAll(): Promise<Order[]> {
    const orders = await this.orderRepository.find({
      relations: {
        orders_products_amounts: {
          product: {
            category: true,
          },
        },
      },
    });

    return orders.map((order) => this.modelToEntity(order));
  }

  async findById(id: string): Promise<Order> {
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

      return this.modelToEntity(order);
    } catch (error) {
      return null;
    }
  }

  modelToEntity(orderModel: OrderModel): Order {
    const order = new Order(
      new Customer(
        orderModel.customer.name,
        orderModel.customer.email,
        orderModel.customer.cpf,
      ),
      orderModel.orders_products_amounts.map(function (obj) {
        const product = new Product(
          obj.product.name,
          obj.product.description,
          obj.product.price,
          obj.product.quantity,
          obj.product.status,
          new Category(
            obj.product.category.name,
            obj.product.category.slug,
            obj.product.category.description,
          ),
        );

        return [product, obj.amount];
      }),
      orderModel.state,
    );

    order.id = orderModel.id;
    order.createdAt = orderModel.createdAt;
    order.updatedAt = orderModel.updatedAt;

    return order;
  }
}
