import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, CreateDateColumn, BaseEntity} from 'typeorm';
import { User } from './user.model';
import { Product } from './product.model';
import { Field, ObjectType } from 'type-graphql';
@ObjectType()
@Entity()
export class Order extends BaseEntity {
    @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  totalPrice: number;

  @Field()
  @Column()
  status: string; 

  @Field()
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
