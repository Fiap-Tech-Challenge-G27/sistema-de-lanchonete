import { FindCustomerUseCase } from '@customers/use-cases';
import { Inject, Injectable } from '@nestjs/common';
import { IExceptionService } from 'src/shared/exceptions/exceptions.interface';
import { UseCase } from '@shared/core/use-case';
import { CreateOrderDto, OrderProducts } from '../dtos/create-order.dto';
import { OrderMapper } from '../core/mappers/order.mapper';
import { OrderProductMapper } from '../core/mappers/order-product.mapper';
import { OrderProductEntity } from '../core/order.entity';
import { IProductRepository } from '@products/core/product-repository.abstract';
import { IOrderRepository } from '../core/order-repository.abstract';
import { IPaymentGateway } from '../core/payment-gateway';

@Injectable()
export class CreateOrderUseCase implements UseCase {
  constructor(
    private readonly findCustomerUseCase: FindCustomerUseCase,
    @Inject(IExceptionService)
    private readonly exceptionService: IExceptionService,
    @Inject(IPaymentGateway)
    private readonly paymentGateway: IPaymentGateway,
    private readonly orderMapper: OrderMapper,
    private readonly orderProductMapper: OrderProductMapper,
    @Inject(IProductRepository)
    private readonly productRepository: IProductRepository,
    @Inject(IOrderRepository)
    private readonly orderRepository: IOrderRepository,
  ) {}

  private async getOrderProducts(
    orderProducts: OrderProducts[],
  ): Promise<OrderProductEntity[]> {
    const orderProdutsEntity = orderProducts.map(
      async ({ productId, amount }) => {
        const product = await this.productRepository.findOne(productId);
        return this.orderProductMapper.mapFrom({ product, amount });
      },
    );

    return await Promise.all(orderProdutsEntity);
  }

  async execute(createOrderDto: CreateOrderDto) {
    const { customer_cpf, orderProducts } = createOrderDto;

    const customer = await this.findCustomerUseCase.execute(customer_cpf);

    if (!customer) {
      this.exceptionService.notFoundException({
        message: 'Customer not found',
        code: 404,
      });
    }

    if (!orderProducts.length) {
      this.exceptionService.badRequestException({
        message: 'Order products is empty',
        code: 400,
      });
    }

    const orderProductsEntity = await this.getOrderProducts(orderProducts);

    const order = this.orderMapper.mapFrom({ customer, orderProductsEntity });

    const result = await this.orderRepository.create(order);
    await this.paymentGateway.create(result.id)
    

    
    return result
  }
}
