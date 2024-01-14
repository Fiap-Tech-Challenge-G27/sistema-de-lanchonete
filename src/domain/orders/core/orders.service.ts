import { Inject, Injectable } from '@nestjs/common';
import { IOrderRepository } from '../repositories/IOrderRepository';
import { IOrdersService } from './orders.service.interface';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { Order } from '../entities/order.entity';
import { ICustomerRepository } from '@customers/repositories/ICustomerRepository';
import { IProductRepository } from '@products/respositories/IProductRepository';
import { ProductEntity } from '@products/entities/product.entity';

@Injectable()
export class OrdersService implements IOrdersService {
  constructor(
    @Inject(IOrderRepository)
    private readonly orderRepository: IOrderRepository,
    @Inject(ICustomerRepository)
    private readonly customerRepository: ICustomerRepository,
    @Inject(IProductRepository)
    private readonly productRepository: IProductRepository,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { customer_cpf, product_id_amount_id } = createOrderDto;

    const customer =
      await this.customerRepository.findCustomerByCpf(customer_cpf);
    const product_amounts =
      await this.fetch_product_amounts(product_id_amount_id);
    const order = new Order(customer, product_amounts);

    return await this.orderRepository.create(order);
  }

  private async fetch_product_amounts(
    product_id_amount_id: Map<string, number>,
  ) {
    const product_amounts_promises = Object.keys(product_id_amount_id).map(
      async (product_id) => {
        const amount: number = product_id_amount_id[product_id];
        const product =
          await this.productRepository.findProductById(product_id);

        return [product, amount] as [ProductEntity, number];
      },
    );
    return await Promise.all(product_amounts_promises);
  }

  async findAll() {
    const listOrders = await this.orderRepository.findAll();
    return listOrders;
  }
}
