import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { ObjectType, Field, ID } from 'type-graphql';
import User from './User';

@ObjectType()
@Entity('messages')
class Message extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  to: string;

  @ManyToOne(() => User, {
    eager: true,
  })
  @JoinColumn({ name: 'to' })
  to_user: User;

  @Field(() => String)
  @Column()
  from: string;

  @ManyToOne(() => User, {
    eager: true,
  })
  @JoinColumn({ name: 'from' })
  from_user: User;

  @Field(() => String)
  @Column()
  text: string;

  @Field(() => Date)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updated_at: Date;
}

export default Message;
