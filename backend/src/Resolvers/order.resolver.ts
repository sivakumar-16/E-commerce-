import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Order } from '../models/order.model'; 
import { User } from '../models/user.model'; 
import { Product } from '../models/product.model'; 
import { In } from 'typeorm';

@Resolver(of=>Order)
export class OrderResolver {
  @Query(() => [Order])
  async getOrders() {
    return await Order.find({ relations: ['user', 'products'] }); 
  }

  @Query(() => Order, { nullable: true })
  async getOrder(@Arg('id') id: number) {
    return await Order.findOneBy({ id }); 
  }

  @Mutation(() => Order)
  async createOrder(
    @Arg('userId') userId: number,
    @Arg('productIds', () => [Number]) productIds: number[],
    @Arg('totalPrice') totalPrice: number,
    @Arg('status') status: string
  ): Promise<Order> {
    const user = await User.findOneBy({ id: userId });
    if (!user) throw new Error('User not found');

    const products = await Product.findByIds(productIds);
    if (products.length !== productIds.length) throw new Error('Some products not found');

    const order = Order.create({ user, products, totalPrice, status });
    return await order.save();
  }

  @Mutation(() => Order, { nullable: true })
  async updateOrder(
    @Arg('id') id: number,
    @Arg('totalPrice') totalPrice: number,
    @Arg('status') status: string,
    @Arg('productIds', () => [Number], { nullable: true }) productIds?: number[],
    @Arg('userId') userId?: number
  ): Promise<Order | null> {
    const order = await Order.findOneBy({ id });
    if (!order) return null;

    if (totalPrice !== undefined) order.totalPrice = totalPrice;
    if (status !== undefined) order.status = status;

    if (productIds !== undefined) {
      const products = await Product.findBy({ id: In(productIds) });
      if (products.length !== productIds.length) throw new Error('Some products not found');
      order.products = products;
    }

    if (userId !== undefined) {
      const user = await User.findOneBy({ id: userId });
      if (!user) throw new Error('User not found');
      order.user = user;
    }

    await order.save();
    return order;
  }

  @Mutation(() => Boolean)
  async deleteOrder(@Arg('id') id: number): Promise<boolean> {
    const result = await Order.delete(id);
    return result.affected !== 0; 
  }
}
