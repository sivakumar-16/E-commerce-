import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, BaseEntity } from 'typeorm';
import { Order } from './order.model';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Product extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column('decimal')
  price: number;

  @Field()
  @Column({ nullable: true })
  imageUrl: string;

  @Field()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Field()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToMany(() => Order, order => order.products)
  orders: Order[];
}
