import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';

import UserResolver from './resolvers/UserResolver';

(async () => {
  const app = express();

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: ({req, res}) => ({ req, res })
  });

  apolloServer.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log('🚀 Server is running on port 4000'),
  );
})();
