import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAppState } from '../hooks/apollo';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { isTokenExpired } = useAppState();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === isTokenExpired() ? (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : 'dashboard',
              state: { from: location },
            }}
          />
        ) : (
          <Component />
        );
      }}
    />
  );
};

export default Route;
