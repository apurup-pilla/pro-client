import React, { createContext, useContext, useState } from 'react';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  const setUserSession = (userDetails) => {
    setAuthUser(userDetails);
    localStorage.setItem('authUser', JSON.stringify(userDetails));
  };

  const clearUserSession = () => {
    setAuthUser(null);
    localStorage.removeItem('authUser');
  };

  return (
    <AuthContext.Provider value={{
      authUser,
      setUserSession,
      clearUserSession,
      isAuthenticated: !!authUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
