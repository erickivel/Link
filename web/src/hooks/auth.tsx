import React, { createContext, useCallback, useContext, useState } from 'react';

import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

interface User {
  id: string;
  username: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  username: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  // signOut(): void;
  // updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const history = useHistory();
  const [userData, setUserData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Link:token');
    const user = localStorage.getItem('@Link:user');

    if (token && user) {
      return {
        token,
        user: JSON.parse(user),
      };
    }

    return {} as AuthState;
  });

  const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        user {
          id
          username
        }
        token
      }
    }
  `;

  const [login, { data }] = useMutation<
    { login: AuthState },
    { username: string; password: string }
  >(LOGIN, {
    onCompleted(ndata) {
      console.log(ndata);
      localStorage.setItem('@Link:token', ndata.login.token);
      localStorage.setItem('@Link:user', JSON.stringify(ndata.login.user));
      history.push('/dashboard');
    },
  });

  const signIn = useCallback(
    async ({ username, password }: SignInCredentials) => {
      await login({ variables: { username, password } });

      if (data) {
        setUserData(data.login);
      }

      history.push('/dashboard');
      console.log(userData);
    },
    [login, userData, history, data],
  );

  return (
    <AuthContext.Provider value={{ signIn, user: userData.user }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
