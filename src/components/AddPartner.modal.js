import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Typography
} from '@mui/material';

const AddPartnerModal = ({ open, handleClose }) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    location: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('New Partner:', form);
    handleClose();
    // Optionally clear form
    setForm({ email: '', password: '', location: '' });
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 2
        }
      }}
    >
      <DialogTitle>
        <Typography variant="h5" fontWeight="bold">Add Partner</Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Location"
              name="location"
              value={form.location}
              onChange={handleChange}
              fullWidth
              size="small"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} variant="outlined" sx={{ borderRadius: 2 }}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" sx={{ borderRadius: 2 }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPartnerModal;
