import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { ApolloServer, PubSub } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';

import UserResolver from './resolvers/UserResolver';
import MessageResolver from './resolvers/MessageResolver';
import checkAuthenticated from './utils/checkAuthenticated';

(async () => {
  const app = express();
  app.use(express.json());

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    }),
  );

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
    },
    context: ({ req, res }) => ({ req, res, pubsub }),
  });

  apolloServer.applyMiddleware({ app });

  const httpServer = http.createServer(app);
  apolloServer.installSubscriptionHandlers(httpServer);

  httpServer.listen({ port: 4000 }, () =>
    console.log('🚀 Server is running on port 4000'),
  );
})();
