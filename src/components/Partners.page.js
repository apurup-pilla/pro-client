
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Avatar, Box, Container, Paper, Select, MenuItem, Button, CardContent, Grid, Card } from '@mui/material';
import AddPartnerModal from './AddPartner.modal';


const users = [
  {
    email: 'john@example.com',
    password: 'Jonny@123',
    location: 'New York'
  },
  {
    email: 'jane@example.com',
    password: 'jane_2311',
    location: 'London'
  },
  {
    email: 'bob@example.com',
    password: 'bobbyyy92',
    location: 'Sydney'
  },
  {
    email: 'alice@example.com',
    password: 'Hndye73',
    location: 'Toronto'
  },
];



function PartnersPage() {

  const [open, setOpen] = useState(false);


  return (

    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: "end", alignItems: 'end', mb: 2, width: '100%' }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            borderRadius: '8px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
            '&:hover': {
              backgroundColor: '#1976d2',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            },
          }}
          onClick={() => setOpen(true)}
        >
          Add Partner
        </Button>

      </Box>


      <Grid container spacing={3}>
        {users.map((user, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
            <Card sx={{
              display: 'flex',
              alignItems: 'center',
              p: 2,
              borderRadius: 3,
              boxShadow: 3
            }}>
              <Avatar
                alt={user.email}
                sx={{ width: 56, height: 56, mr: 2, mt: 0, pt: 0 }}
              />
              <CardContent sx={{ p: 0, }}>
                <Typography variant="body1" fontWeight="bold">{user.email}</Typography>
                <Typography variant="body2" color="text.secondary">Password: {user.password}</Typography>
                <Typography variant="body2" color="text.secondary">Location: {user.location}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <AddPartnerModal open={open} handleClose={() => setOpen(false)} />
    </Box>
  )
}


export default PartnersPage;