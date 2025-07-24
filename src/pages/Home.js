import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Avatar, Box, Container, Paper, Select, MenuItem, Button, CardContent, Grid, Card, IconButton, Tooltip, Tab, Tabs } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import LogoutIcon from '@mui/icons-material/Logout';
import AddInvoice from '../components/AddInvoice.modal';

import InvoicesPage from '../components/Invoices.page';
import PartnersPage from '../components/Partners.page';
import ExpenseReportsPage from '../components/ExpenseReports.page.';
import { useAuth } from '../context/AuthContext';
import {  useNavigate } from 'react-router-dom';


const Home = () => {
  const { setUserSession, authUser } = useAuth();
  const [tab, setTab] = useState('INVOICES')
  const navigate = useNavigate()

  const handleLogout = () => {
    setUserSession(null)
    localStorage.removeItem('user')
    navigate('/login', { replace: true });

  }
  
  const role = authUser?.ownedSiteId ? 'OWNER' : 'PARTNER'
  const site = authUser?.ownedSiteId ? authUser?.sites?.find(i=> i?.id === authUser?.ownedSiteId)?.name : authUser?.sites?.[0]?.name

  return (
    <Box >

      <AppBar
        position="static"
        sx={{ backgroundColor: '#2196f34D', color: 'black', boxShadow: 'none' }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', }}>
          <Box sx={{ width: '100%', bgcolor: 'background.paper', backgroundColor: '#2196f3D' }}>
            <Tabs
              value={tab}
              onChange={(a, b) => setTab(b)}

              textColor="primary"
              indicatorColor="primary"
              TabIndicatorProps={{
                sx: { height: '2px' },
              }}
            >
              <Tab
                label="Invoices"
                value="INVOICES"
                sx={{ textTransform: 'none', fontSize: 16, fontWeight: tab === 'INVOICES' ? 'bold' : 'normal', }}
              />
              {/* <Tab
                label="Partners"
                value="PARTNERS"
                sx={{ textTransform: 'none', fontSize: 16,  fontWeight: tab === 'PARTNERS' ? 'bold' : 'normal', }}
              /> */}
              <Tab
                label="Expense Reports"
                value="EXPENSE"
                sx={{ textTransform: 'none', fontSize: 16, fontWeight: tab === 'EXPENSE' ? 'bold' : 'normal', }}
              />

            </Tabs>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ mr: 2, textAlign: 'right', width : '200px' }}>
              <Typography variant="body1" sx={{ fontStyle: 'italic', fontWeight : 'bold' }}>{authUser?.username}</Typography>
              <Typography variant="body2">{role } - {site}</Typography>
            </Box>
            <Avatar alt="Profile" />
            <Tooltip title="Logout" arrow>
              <IconButton onClick={handleLogout} sx={{ color: 'black', ml: 3 }}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {tab === 'INVOICES' && <InvoicesPage />}
      {tab === 'PARTNERS' && <PartnersPage />}
      {tab === 'EXPENSE' && <ExpenseReportsPage />}
    </Box>
  );
};

export default Home;
