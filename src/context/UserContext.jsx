// UserContext.js
import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');

  const updateUserContext = (user) => {
    setName(user.name);
    setEmail(user.email);
    setId(user.id);
  };

  const clearUserContext = () => {
    setName('');
    setEmail('');
    setId('');
  };

  const userContextValue = {
    name,
    email,
    id,
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
