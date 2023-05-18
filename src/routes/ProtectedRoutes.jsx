import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ element, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          element
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoutes;