import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { createConnection } from 'typeorm';
import { ApolloServer, PubSub } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import UserResolver from './resolvers/UserResolver';
import MessageResolver from './resolvers/MessageResolver';
import checkAuthenticated from './utils/checkAuthenticated';

(async () => {
  const app = express();

  dotenv.config();

  app.use(express.json());

  app.use(cors());

  await createConnection();

  const pubsub = new PubSub();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, MessageResolver],
    }),
    subscriptions: {
      onConnect: async (connectionParams: any) => {
        if (!connectionParams.Authorization) {
          throw new Error('Token is required');
        }

        const isAuthenticated = await checkAuthenticated(
          connectionParams.Authorization,
        );

        if (!isAuthenticated) {
          throw new Error('Token invalid');
        }
      },
      path: '/subscriptions',
    },
    context: ({ req, res }) => ({ req, res, pubsub }),
  });

  apolloServer.applyMiddleware({ app });

  const httpServer = http.createServer(app);
  apolloServer.installSubscriptionHandlers(httpServer);

  httpServer
    .setMaxListeners(0)
    .listen({ port: process.env.PORT || 4000 }, () =>
      console.log('🚀 Server is running on port 4000'),
    );
})();
