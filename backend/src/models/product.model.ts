import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany } from 'typeorm';
import { Order } from './order.model';

@Entity()
export class Product  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  imageUrl: string;

  @Column()
  createdAt: Date;

  @ManyToMany(() => Order, order => order.products)
  orders: Order[]; 
}
