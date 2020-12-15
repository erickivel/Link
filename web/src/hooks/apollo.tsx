import React, { createContext, useContext, useState } from 'react';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  Observable,
} from '@apollo/client';

interface ApolloContextData {
  appState: {
    loggedIn: boolean;
  };
  appSetLogin: (token: string) => void;
  appSetLogout: () => void;
  appSetAuthToken: (token: string) => void;
  appClearAuthToken: () => void;
}

let authToken = localStorage.getItem('@Link:token') || '';

export const AppStateContext = createContext<ApolloContextData>(
  {} as ApolloContextData,
);

const AppStateProvider: React.FC = ({ children }) => {
  const [appState, setAppState] = useState(() => {
    if (localStorage.getItem('@Link:token')) {
      return { loggedIn: true };
    }

    return { loggedIn: false };
  });

  const appSetLogin = (token: string) => {
    authToken = token;
    setAppState({ ...appState, loggedIn: true });
  };

  const appSetLogout = () => {
    authToken = '';
    localStorage.removeItem('@Link:token');
    setAppState({ ...appState, loggedIn: false });
  };

  const appSetAuthToken = (token: string) => {
    authToken = token;
  };
  const appClearAuthToken = () => {
    authToken = '';
  };
  const appGetAuthToken = (): string => {
    return authToken;
  };

  const cache = new InMemoryCache({});
  const requestLink = new ApolloLink(
    (operation, forward) =>
      new Observable(observer => {
        let handle: any;
        Promise.resolve(operation)
          .then(res => {
            res.setContext({
              headers: { authorization: `Bearer ${appGetAuthToken()}` },
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

  const client = new ApolloClient({
    link: ApolloLink.from([
      requestLink,
      new HttpLink({
        uri: 'http://localhost:4000/graphql',
      }),
    ]),
    cache,
  });

  return (
    <AppStateContext.Provider
      value={{
        appState,
        appSetLogin,
        appSetLogout,
        appSetAuthToken,
        appClearAuthToken,
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
