export class CreateOrderDto {
  customer_cpf: string;
  product_id_amount_id: Map<string, number>;
}
