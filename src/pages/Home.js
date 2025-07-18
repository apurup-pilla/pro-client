import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Avatar, Box, Container, Paper, Select, MenuItem, Button, CardContent, Grid, Card, IconButton, Tooltip, Tab, Tabs } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import LogoutIcon from '@mui/icons-material/Logout';
import AddInvoice from '../components/AddInvoice.modal';

import Invoices from '../components/Invoices';
import Partners from '../components/Partners';
import ExpenseReports from '../components/ExpenseReports';


const user = {
  email: "user@example.com",
  role: "OWNER",
  location: "India"
};

const Home = () => {

  const [tab, setTab] = useState('INVOICES')


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
                sx={{ textTransform: 'none', fontSize: 16,  fontWeight: tab === 'INVOICES' ? 'bold' : 'normal', }}
              />
              <Tab
                label="Partners"
                value="PARTNERS"
                sx={{ textTransform: 'none', fontSize: 16,  fontWeight: tab === 'PARTNERS' ? 'bold' : 'normal', }}
              />
               <Tab
                label="Expense Reports"
                value="EXPENSE"
                sx={{ textTransform: 'none', fontSize: 16,  fontWeight: tab === 'EXPENSE' ? 'bold' : 'normal', }}
              />

            </Tabs>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ mr: 2, textAlign: 'right' }}>
              <Typography variant="body1" sx={{ fontStyle: 'italic' }}>{user.email}</Typography>
              <Typography variant="body2">{user.role} - {user.location}</Typography>
            </Box>
            <Avatar alt="Profile" />
            <Tooltip title="Logout" arrow>
              <IconButton onClick={() => { }} sx={{ color: 'black', ml: 3 }}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {tab === 'INVOICES' && <Invoices />}
      {tab === 'PARTNERS' && <Partners />}
      {tab === 'EXPENSE' && <ExpenseReports />}
    </Box>
  );
};

export default Home;
