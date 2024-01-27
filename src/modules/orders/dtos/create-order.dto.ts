import { ApiProperty } from '@nestjs/swagger';

export class OrderProducts {
  @ApiProperty()
  productId: string;

  @ApiProperty()
  amount: number;
}

export class CreateOrderDto {
  @ApiProperty()
  customer_cpf: string;

  @ApiProperty({ type: [OrderProducts] })
  orderProducts: OrderProducts[];
}
