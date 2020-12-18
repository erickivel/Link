import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
  UseMiddleware,
} from 'type-graphql';
import { max, compareAsc, isAfter, isBefore } from 'date-fns';

import Message from '../database/entities/Message';
import User from '../database/entities/User';
import ensureAuthenticated from '../middleware/ensureAuthenticated';
import MyContext from '../types/MyContext';

@ObjectType()
class ContactWithLastMessage {
  @Field()
  user: User;

  @Field()
  message: Message;
}

@Resolver()
export default class MessageResolver {
  @Subscription({
    topics: ({ args }) => args.topic,
  })
  newMessage(@Arg('topic') topic: string, @Root() message: Message): Message {
    return message;
  }

  @Query(() => [Message])
  @UseMiddleware(ensureAuthenticated)
  async listMessagesOfSpecificContact(
    @Ctx() { userId }: MyContext,
    @Arg('contact_id') contact_id: string,
  ): Promise<Message[]> {
    const messagesSent = await Message.find({
      where: {
        from: userId,
        to: contact_id,
      },
    });

    const messagesReceived = await Message.find({
      where: {
        from: contact_id,
        to: userId,
      },
    });

    const messagesSortedByDate = messagesSent
      .concat(messagesReceived)
      .sort((aMessage, bMessage) => {
        if (isBefore(aMessage.created_at, bMessage.created_at)) {
          return -1;
        }
        if (isAfter(aMessage.created_at, bMessage.created_at)) {
          return 1;
        }
        return 0;
      });

    return messagesSortedByDate;
  }

  @Query(() => [ContactWithLastMessage])
  @UseMiddleware(ensureAuthenticated)
  async listFirstMessageOfAllYourConversations(
    @Ctx() { userId }: MyContext,
  ): Promise<ContactWithLastMessage[]> {
    const userMessagesSent = await Message.find({
      where: {
        to: userId,
      },
    });

    const userMessagesReceived = await Message.find({
      where: {
        from: userId,
      },
    });

    const userMessages = userMessagesSent.concat(userMessagesReceived);

    const allContacts = userMessages.map(message =>
      message.to === userId ? message.from : message.to,
    );

    const contactsWithoutDuplicates = allContacts.filter((item, pos) => {
      return allContacts.indexOf(item) === pos;
    });

    const lastMessageOfEachContact = await Promise.all(
      contactsWithoutDuplicates.map(async contact => {
        const allMessagesOfRespectiveContact = userMessages.filter(
          message => message.from === contact || message.to === contact,
        );

        const latestDate = max(
          allMessagesOfRespectiveContact.map(m => m.created_at),
        );

        const message = allMessagesOfRespectiveContact.find(m => {
          return compareAsc(m.created_at, latestDate) === 0;
        });

        if (message === undefined) {
          throw new Error('No messages found');
        }

        const user = await User.findOneOrFail({ id: contact });

        return {
          user,
          message,
        };
      }),
    );
    const lastMessagesSortedByDate = lastMessageOfEachContact.sort(
      (aMessage, bMessage) => {
        if (
          isBefore(aMessage.message.created_at, bMessage.message.created_at)
        ) {
          return 1;
        }
        if (isAfter(aMessage.message.created_at, bMessage.message.created_at)) {
          return -1;
        }
        return 0;
      },
    );

    return lastMessagesSortedByDate;
  }

  @Mutation(() => Message)
  @UseMiddleware(ensureAuthenticated)
  async sendMessage(
    @Ctx() { userId }: MyContext,
    @Arg('to') to: string,
    @Arg('text') text: string,
    @PubSub() pubSub: PubSubEngine,
  ): Promise<Message> {
    const fromUserExists = await User.findOne({ id: to });

    if (!fromUserExists) {
      throw new Error(
        'The user that you are trying to send a message to does not exist',
      );
    }

    const message = Message.create({
      from: userId,
      to,
      text,
    });

    const messageSaved = Message.save(message);

    await pubSub.publish(userId, messageSaved);
    await pubSub.publish(to, messageSaved);

    return messageSaved;
  }
}
