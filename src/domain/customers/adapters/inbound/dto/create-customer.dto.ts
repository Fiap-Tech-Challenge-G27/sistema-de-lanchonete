import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  cpf: string;
}
