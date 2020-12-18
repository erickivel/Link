import React, { createContext, useCallback, useContext, useState } from 'react';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
  ApolloLink,
  Observable,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

interface User {
  id: string;
  username: string;
  avatar?: number | undefined | null;
  about?: string | undefined | null;
}

interface AuthState {
  token: string;
  user: User;
}

interface ApolloContextData {
  user: User;
  appLogin(userData: AuthState): void;
  appLogout(): void;
  updateUser(user: User): void;
}

export const AppStateContext = createContext<ApolloContextData>(
  {} as ApolloContextData,
);

const AppStateProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Link:token');
    const user = localStorage.getItem('@Link:user');

    if (user && token) {
      return {
        token,
        user: JSON.parse(user),
      };
    }

    return {} as AuthState;
  });

  const appLogin = useCallback(({ token, user }: AuthState) => {
    localStorage.setItem('@Link:token', token);
    localStorage.setItem('@Link:user', JSON.stringify(user));

    setData({
      token,
      user,
    });
  }, []);

  const appLogout = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@Link:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  const cache = new InMemoryCache({});
  const requestLink = new ApolloLink(
    (operation, forward) =>
      new Observable(observer => {
        let handle: any;
        Promise.resolve(operation)
          .then(res => {
            res.setContext({
              headers: { authorization: `Bearer ${data.token}` },
            });
          })
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            });
          })
          .catch(observer.error.bind(observer));
        return () => {
          if (handle) handle.unsubscribe();
        };
      }),
  );

  const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql',
  });

  const wsLink = new WebSocketLink({
    uri: 'ws://localhost:4000/subscriptions',
    options: {
      reconnect: true,
      connectionParams: {
        Authorization: data.token,
      },
    },
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  const client = new ApolloClient({
    link: ApolloLink.from([requestLink, splitLink]),
    cache,
  });

  return (
    <AppStateContext.Provider
      value={{
        user: data.user,
        appLogin,
        appLogout,
        updateUser,
      }}
    >
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </AppStateContext.Provider>
  );
};

function useAppState(): ApolloContextData {
  const context = useContext(AppStateContext);

  return context;
}

export { AppStateProvider, useAppState };
