export class CreateProductDto {
  name: string;
  description: string;
  categoryId: string;
  price: number;
  stock: number;
  imageUrls: string[];
  status: string;
}
