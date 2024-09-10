import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, CreateDateColumn } from 'typeorm';
import { Order } from './order.model';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Order, order => order.user)
  orders: Order[]; 
}
