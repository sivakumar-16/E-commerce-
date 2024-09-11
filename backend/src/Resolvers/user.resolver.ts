import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { User } from '../models/user.model'; 
import { hash, compare } from 'bcryptjs'; 
import { AuthenticationError } from 'apollo-server-express'; 

@Resolver(of => User)
export class UserResolver {
  @Query(() => [User])
  async getUsers() {
    return await User.find();
  }

  @Query(() => User, { nullable: true })
  async getUser(@Arg('id') id: number) {
    return await User.findOneBy({ id });
  }

  @Mutation(() => User)
  async register(
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<User> {
    const existingUser = await User.findOneBy({ email });
    if (existingUser) {
      throw new Error('User with this email already exists.');
    }

    const hashedPassword = await hash(password, 10);
    const user = User.create({ name, email, password: hashedPassword });
    return await user.save();
  }

  @Mutation(() => User)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<User> {
    const user = await User.findOneBy({ email });
    if (!user) {
      throw new AuthenticationError('Invalid email or password');
    }

    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      throw new AuthenticationError('Invalid email or password');
    }

    return user;
  }

  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Arg('id') id: number,
    @Arg('name', { nullable: true }) name: string,
    @Arg('email', { nullable: true }) email: string,
    @Arg('password', { nullable: true }) password: string
  ): Promise<User | null> {
    const user = await User.findOneBy({ id });
    if (!user) return null;

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await hash(password, 12);

    await user.save();
    return user;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg('id') id: number): Promise<boolean> {
    const result = await User.delete(id);
    return result.affected !== 0;
  }
}
