import { Product } from '@products/infra/typeorm/entities/product';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Order } from './order';

@Entity({ name: 'orders_products' })
export class OrdersProductsAmounts {
  @PrimaryColumn('uuid')
  order_id: string;

  @PrimaryColumn('uuid')
  product_id: string;

  @ManyToOne(() => Order, (order) => order.orders_products_amounts, {
    cascade: true,
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Product, { eager: true })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ name: 'amount', type: 'int', nullable: false })
  amount: number;
}
