import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export const ProtectedRoute = ({ unAuthorizedOnly = false, children }) => {
  const isAuthenticated = useSelector(store => store.userReducer.isAuthenticated);
  const loc = useLocation();

  if (!isAuthenticated && !unAuthorizedOnly) {
    return <Navigate to="/login" state={{ from: loc }} />;
  }

  if (isAuthenticated && unAuthorizedOnly) {
    const { from } = loc.state || { from: { pathname: '/' } };

    return <Navigate to={from} replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  unAuthorizedOnly: PropTypes.bool,
  children: PropTypes.node
};
