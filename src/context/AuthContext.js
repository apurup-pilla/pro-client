import React, { createContext, useContext, useEffect, useState } from 'react';
import { decryptData } from '../components/utils';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

useEffect(() => {
  const encryptedUser = localStorage.getItem('user');
  let user = null;

  try {
    user = encryptedUser ? decryptData(encryptedUser) : null;
    if (user) {
      setAuthUser(user);
    }
  } catch (error) {
    console.error('Failed to decrypt user:', error);
  }
}, []);


  const setUserSession = (userDetails) => {
    setAuthUser(userDetails);
  };

  return (
    <AuthContext.Provider value={{
      authUser,
      setUserSession,
      isAuthenticated: !!authUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
