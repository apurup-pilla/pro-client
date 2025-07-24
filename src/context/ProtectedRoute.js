import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { decryptData } from '../components/utils';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const encryptedUser = localStorage.getItem('user');
  const user = encryptedUser ? decryptData(encryptedUser) : null;
  const { setUserSession, authUser } = useAuth();


  useEffect(() => {
    if (user && !authUser) {
      setUserSession(user);
    }
  }, [user,authUser,  setUserSession]);

  if (!user || !user.username) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

