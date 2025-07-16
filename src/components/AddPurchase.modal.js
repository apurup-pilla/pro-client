import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Typography,
  Box
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

const AddPurchase = ({ open, handleClose }) => {
  const [form, setForm] = useState({
    title: '',
    issueDate: null,
    dueDate: null,
    supplierName: '',
    location: '',
    quantity: '',
    price: '',
    document: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm(prev => ({ ...prev, document: e.target.files[0] }));
  };

  const handleSubmit = () => {
    console.log('Form Data:', form);
    handleClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 2
          }
        }}
      >
        <DialogTitle>
          <Typography variant="h5" fontWeight="bold">Add Purchase</Typography>
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Supplier Name"
                  name="supplierName"
                  value={form.supplierName}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6} sx={{ maxWidth: '222px' }}>
                <DatePicker
                  label="Issue Date"
                  value={form.issueDate}
                  onChange={(value) => handleDateChange('issueDate', value)}
                  renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                />
              </Grid>
              <Grid item xs={6} sx={{ maxWidth: '222px' }}>
                <DatePicker
                  label="Due Date"
                  value={form.dueDate}
                  onChange={(value) => handleDateChange('dueDate', value)}
                  renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Quantity"
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Price"
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  sx={{
                    height: 40,
                    width: '222px',
                    textTransform: 'none',
                    justifyContent: 'flex-start'
                  }}
                >
                  {form.document ? form.document.name : 'Add Document'}
                  <input
                    type="file"
                    hidden
                    onChange={handleFileChange}
                  />
                </Button>
              </Grid>
            </Grid>
          </Box>
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
    </LocalizationProvider>
  );
};

export default AddPurchase;
