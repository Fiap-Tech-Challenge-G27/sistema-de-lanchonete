export class CreateProductDto {
  name: string;
  description: string;
  categoryId: string;
  price: number;
  quantity: number;
  imageUrls: string[];
  status: string;
}
