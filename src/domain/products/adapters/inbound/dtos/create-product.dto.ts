import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  categoryId: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  status: string;
}
