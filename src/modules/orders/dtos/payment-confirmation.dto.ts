import { ApiProperty } from '@nestjs/swagger';

class PaymentConfirmationIdentifierDto {
  @ApiProperty()
  order_id: string;
}
export class PaymentConfirmationDto {
  @ApiProperty({ type: PaymentConfirmationIdentifierDto })
  identifier: PaymentConfirmationIdentifierDto;

  @ApiProperty()
  status: string;
}
