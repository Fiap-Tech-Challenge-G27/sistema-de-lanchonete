import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn, ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { OrdersProductsAmountsModel } from './orders_products_amounts.model';
import { CustomerModel } from 'src/domain/customers/adapters/outbound/models/customer.model';
import { OrderState } from 'src/domain/orders/entities/order.entity';

@Entity({ name: 'orders' })
export class OrderModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => OrdersProductsAmountsModel, (order_product_amount) => order_product_amount.order)
  orders_products_amounts: OrdersProductsAmountsModel[];

  @Column({
    type: "enum",
    enum: OrderState
  })
  state: OrderState;

  @ManyToOne(() => CustomerModel, { eager: true, nullable: false })
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerModel

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}

