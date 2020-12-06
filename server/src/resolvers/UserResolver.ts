import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../database/entities/User';

@Resolver()
export default class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    const usersRepository = getRepository(User);

    const users = await usersRepository.find();

    return users;
  }

  @Mutation(() => User)
  async register(
    @Arg('name') name: string,
    @Arg('password') password: string,
  ): Promise<User> {
    const hashedPassword = await hash(password, 12);

    const usersRepository = getRepository(User);

    const user = usersRepository.create({
      name,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}
