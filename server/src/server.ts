import 'reflect-metadata';
import express from 'express';
import { ApolloServer, PubSub } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';

import UserResolver from './resolvers/UserResolver';
import MessageResolver from './resolvers/MessageResolver';

(async () => {
  const app = express();

  await createConnection();

  const pubsub = new PubSub();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, MessageResolver],
    }),
    context: ({ req, res }) => ({ req, res, pubsub }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log('🚀 Server is running on port 4000'),
  );
})();
