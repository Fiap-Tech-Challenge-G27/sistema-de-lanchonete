import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto, OrderProducts } from '../dtos/create-order.dto';
import { IOrderRepository } from '../repositories/order.repository.interface';
import { IOrdersService } from './orders.service.interface';
import { ICustomerRepository } from '@domain/customers/repositories/customer.repository.interface';
import { IProductRepository } from '@domain/products/respositories/product.repository.interface';
import { IExceptionService } from '@domain/shared/exceptions/exceptions.interface';
import { OrderMapper } from '../mappers/order.mapper';
import { OrderProductMapper } from '../mappers/order-product.mapper';

@Injectable()
export class OrdersService implements IOrdersService {
  constructor(
    @Inject(IOrderRepository)
    private readonly orderRepository: IOrderRepository,
    @Inject(ICustomerRepository)
    private readonly customerRepository: ICustomerRepository,
    @Inject(IProductRepository)
    private readonly productRepository: IProductRepository,
    @Inject(IExceptionService)
    private readonly exceptionService: IExceptionService,
    private readonly orderMapper: OrderMapper,
    private readonly orderProductMapper: OrderProductMapper,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { customer_cpf, orderProducts } = createOrderDto;

    const customer =
      await this.customerRepository.findCustomerByCpf(customer_cpf);

    if (!customer) {
      this.exceptionService.notFoundException({
        message: 'Customer not found',
        code: 404,
      });
    }

    const orderProductsEntity = await this.getOrderProducts(orderProducts);

    const order = this.orderMapper.mapDtoToEntity(
      customer,
      orderProductsEntity,
    );

    return await this.orderRepository.create(order);
  }

  private async getOrderProducts(orderProducts: OrderProducts[]) {
    const orderProdutsEntity = orderProducts.map(
      async ({ productId, amount }) => {
        const product = await this.productRepository.findProductById(productId);

        return this.orderProductMapper.mapDtoToEntity(product, amount);
      },
    );

    return await Promise.all(orderProdutsEntity);
  }

  async findAll() {
    const listOrders = await this.orderRepository.findAll();
    return listOrders;
  }
}
