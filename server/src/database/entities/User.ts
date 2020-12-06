import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity('users')
class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Column()
  password: string;

  @Field(() => String, { nullable: true })
  @Column()
  about: string;

  @Field(() => String, { nullable: true })
  @Column()
  avatar: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
