import { ApiProperty } from '@nestjs/swagger';

export class OrderProducts {
  @ApiProperty()
  productId: string;

  @ApiProperty()
  amount: number;
}

export class CreateOrderDto {
  @ApiProperty({ type: [OrderProducts] })
  orderProducts: OrderProducts[];
}
