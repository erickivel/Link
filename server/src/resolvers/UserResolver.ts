import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver, UseMiddleware } from 'type-graphql';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../database/entities/User';
import MyContext from '../types/MyContext';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated';

import authConfig from '../config/auth';
import { DiskStorage } from '../utils/DiskStorage';

@ObjectType()
class LoginResponse {
  @Field()
  user: User;

  @Field()
  token: string;
}

@Resolver()
export default class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {

    const users = await User.find();

    return users;
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(ensureAuthenticated)
  async me(@Ctx() { userId }:MyContext): Promise<User | undefined> {
    const user = await User.findOne({ id: userId });

    return user;
  }

  @Mutation(() => User)
  async register(
    @Arg('username') username: string,
    @Arg('password') password: string,
    @Arg('about', { nullable: true }) about?: string,

  ): Promise<User> {
    const userExists = await User.findOne({ username });

    if (userExists) {
      throw new Error('User already exists');
    }

    const hashedPassword = await hash(password, 12);

    const user = User.create({
      username,
      password: hashedPassword,
      about,
    });

    await User.save(user);

    return user;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('username') username: string,
    @Arg('password') password: string
  ): Promise<LoginResponse> {
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error('Incorrect email/password combination!');
    }

    const comparePassword = await compare(password, user.password);

    if (!comparePassword) {
      throw new Error('Incorrect email/password combination!');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    }
  }

  @Mutation(() => User)
  @UseMiddleware(ensureAuthenticated)
  async updateUser (
    @Ctx () { userId }:MyContext,
    @Arg('username') username: string,
    @Arg('about') about: string,
    @Arg('old_password', { nullable: true }) old_password: string,
    @Arg('password', { nullable: true }) password: string,
  ): Promise<User> {
    const user = await User.findOne({ id: userId });

    if (!user) {
      throw new Error('User not found!');
    }

    const userWithUpdatedUsername = await User.findOne({ username });

    if (userWithUpdatedUsername && userWithUpdatedUsername.id !== userId) {
      throw new Error('Username already in use');
    }

    user.username = username;
    user.about = about;

    if (password && !old_password) {
      throw new Error('You need to inform the old password to set a new password');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new Error('Old password does not match');
      }

      user.password = await hash(password, 12);
    }

    return User.save(user);
  };

  @Mutation(() => User)
  @UseMiddleware(ensureAuthenticated)
  async updateUserAvatar(
    @Ctx () { userId }: MyContext,
    @Arg('avatarFilename') avatarFilename: string,
  ): Promise<User> {
    const user = await User.findOne({ id: userId });

    if (!user) {
      throw new Error('User not found!');
    }

    if (user.avatar) {
      await DiskStorage.deleteFile(user.avatar);
    }

    const filename = await DiskStorage.saveFile(avatarFilename);

    user.avatar = filename;

    return await User.save(user);
  }
}
