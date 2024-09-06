import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, CreateDateColumn, BaseEntity } from 'typeorm';
import { User } from './user.model';
import { Product } from './product.model';

@Entity()
export class Order  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  totalPrice: number;

  @Column()
  status: string; 

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, user => user.orders)
  user: User; 

  @ManyToMany(() => Product)
  @JoinTable({
    name: 'order_products',
    joinColumn: { name: 'order_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
  })
  products: Product[]; 
}
