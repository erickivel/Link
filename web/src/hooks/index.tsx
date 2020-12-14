import React from 'react';

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  concat,
} from '@apollo/client';

import { AuthProvider } from './auth';

const AppProvider: React.FC = ({ children }) => {
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
  });

  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: localStorage.getItem('@Link:token') || null,
      },
    });

    return forward(operation);
  });

  const client = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <AuthProvider>{children}</AuthProvider>
    </ApolloProvider>
  );
};

export default AppProvider;
