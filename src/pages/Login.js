import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { authUser } from '../api/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { setUserSession } = useAuth()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const userRes = await authUser({ username, password })
    if (userRes.message) {
      alert(userRes.response.data);
    } else {
      // setUserSession(userRes)
      setUserSession({ 
        "Username": username,
        "ownedSiteId": userRes.filter(site => site.roleInSite === 'Owner')[0]?.siteId || null,
        "sites": userRes.map(site => ({
          id: site.siteId,
          name: site.siteName
        }))
      });
      navigate('/home')
    }

  };

  const isFormValid = username.trim() !== '' && password.trim() !== '';

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f7fa'
      }}
    >
      <Box sx={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        backgroundColor: '#2196f3',
        opacity: 0.3,
        borderRadius: '50%',
        top: '-150px',
        left: '-150px'
      }} />
      <Box sx={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        backgroundColor: '#3f51b5',
        opacity: 0.2,
        borderRadius: '45%',
        bottom: '-100px',
        right: '-100px'
      }} />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ zIndex: 1 }}
      >
        <Paper elevation={10} sx={{ p: 5, borderRadius: 4, maxWidth: 400, width: '100%' }}>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
              Six Peers Pty Ltd
            </Typography>
            <Typography variant="body1" align="center" sx={{ mb: 3 }}>
              Please login to your account
            </Typography>
          </motion.div>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 1 }}
          >
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              sx={{ mb: 3 }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              sx={{ mb: 3 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </motion.div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.5 }}
          >
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ borderRadius: '8px' }}
              disabled={!isFormValid}
              onClick={handleLogin}
            >
              Login
            </Button>
          </motion.div>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default Login;
