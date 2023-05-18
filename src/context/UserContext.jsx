// UserContext.js
import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const updateUserContext = (user) => {
    if(user){
      setUser(user);
      setIsAuthenticated(true);
    }
  };

  const clearUserContext = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const userContextValue = {
    user,
    isAuthenticated,
    updateUserContext,
    clearUserContext,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
