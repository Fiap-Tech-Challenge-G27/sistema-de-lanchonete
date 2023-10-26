import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  customer_cpf: string;

  @ApiProperty({
  example: {
    "id_produto_1": 2,
    "id_produto_2": 5
  }
})
  product_id_amount_id: Map<string, number>
}
