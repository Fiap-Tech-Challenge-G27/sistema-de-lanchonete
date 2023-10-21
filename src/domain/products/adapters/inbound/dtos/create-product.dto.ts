import { IsDecimal, IsInt, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  categoryId: string;
  @IsDecimal({ decimal_digits: '2' })
  price: number;
  @IsInt({ each: true })
  @Min(0)
  quantity: number;
  imageUrls: string[];
  @IsString()
  status: string;
}
