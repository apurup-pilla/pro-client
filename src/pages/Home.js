import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Avatar, Box, Container, Paper, Select, MenuItem, Button, CardContent, Grid, Card, IconButton, Tooltip } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import LogoutIcon from '@mui/icons-material/Logout';
import AddPurchase from '../components/AddPurchase.modal';

import Dashboard from '../components/Dashboard';
import Partners from '../components/Partners';


const user = {
  email: "user@example.com",
  role: "OWNER",
  location: "India"
};

const Home = () => {

  const [tab, setTab] = useState('DASHBOARD')


  return (
    <Box >

      <AppBar
        position="static"
        sx={{ backgroundColor: '#2196f34D', color: 'black', boxShadow: 'none' }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex' }}>
            <Typography
              variant="h6"
              sx={{
                mr: '20px',
                cursor: 'pointer',
                fontWeight: tab === 'DASHBOARD' ? 'bold' : 'normal',
                color: tab === 'DASHBOARD' ? '#1976d2' : 'black',
                borderBottom: tab === 'DASHBOARD' ? '2px solid #1976d2' : '2px solid transparent',
                pb: 0.5
              }}
              onClick={() => setTab('DASHBOARD')}
            >
              Dashboard
            </Typography>
            <Typography
              variant="h6"
              sx={{
                cursor: 'pointer',
                fontWeight: tab === 'PARTNERS' ? 'bold' : 'normal',
                color: tab === 'PARTNERS' ? '#1976d2' : 'black',
                borderBottom: tab === 'PARTNERS' ? '2px solid #1976d2' : '2px solid transparent',
                pb: 0.5
              }}
              onClick={() => setTab('PARTNERS')}
            >
              Partners
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ mr: 2, textAlign: 'right' }}>
              <Typography variant="body1" sx={{ fontStyle: 'italic' }}>{user.email}</Typography>
              <Typography variant="body2">{user.role} - {user.location}</Typography>
            </Box>
            <Avatar alt="Profile" />
            <Tooltip title="Logout" arrow>
              <IconButton onClick={()=>{}} sx={{ color: 'black', ml: 3 }}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {tab === 'DASHBOARD' && <Dashboard />}
      {tab === 'PARTNERS' && <Partners />}
    </Box>
  );
};

export default Home;
