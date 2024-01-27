import { ApiProperty } from '@nestjs/swagger';
import { OrderState, PaymentState } from '@orders/core/order.entity';

export class UpdateOrderDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  state?: OrderState;

  @ApiProperty()
  paymentState?: PaymentState;
}
