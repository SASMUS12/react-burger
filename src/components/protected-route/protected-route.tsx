// RouteProps & {children?: React.ReactNode}

import React from 'react';
import { useAppSelector } from '../../services/types/index';
import { Route, Redirect, useLocation, RouteProps } from 'react-router-dom';

type TProtectedRouteProps = RouteProps & {
  unAuthorizedOnly?: boolean;
  children?: React.ReactNode | JSX.Element;
};

export const ProtectedRoute = ({
  children,
  unAuthorizedOnly = false,
  ...rest
}: TProtectedRouteProps) => {
  const isAuthenticated = useAppSelector(store => store.userReducer.isAuthenticated);
  const loc = useLocation< { from: Location, background: Location }>();

  if (!isAuthenticated && !unAuthorizedOnly) {
    return (
      <Route {...rest}>
        <Redirect to={{pathname: '/login', state: {from: loc}}} />
      </Route>
    )
  }

  if (isAuthenticated && unAuthorizedOnly) {
    const { from } = loc.state || {from: {pathname: '/'}};

    return (
      <Route {...rest}>
        <Redirect to={from} />
      </Route>
    )
  }

  return (
    <Route {...rest}>
      {children}
    </Route>
  );

}