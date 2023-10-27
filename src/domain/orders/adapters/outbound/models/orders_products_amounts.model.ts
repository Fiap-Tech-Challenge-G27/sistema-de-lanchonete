import { ProductModel } from 'src/domain/products/adapters/outbound/models/product.model';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { OrderModel } from './order.model';

@Entity({ name: 'orders_products' })
export class OrdersProductsAmountsModel {
  @PrimaryColumn('uuid')
  order_id: string;

  @PrimaryColumn('uuid')
  product_id: string;

  @ManyToOne(() => OrderModel, (order) => order.orders_products_amounts, {
    cascade: true,
  })
  @JoinColumn({ name: 'order_id' })
  order: OrderModel;

  @ManyToOne(() => ProductModel, { eager: true })
  @JoinColumn({ name: 'product_id' })
  product: ProductModel;

  @Column({ name: 'amount', type: 'int', nullable: false })
  amount: number;

  constructor(order?: OrderModel, product?: ProductModel, amount?: number) {
    this.order = order;
    this.product = product;
    this.amount = amount;
  }
}
