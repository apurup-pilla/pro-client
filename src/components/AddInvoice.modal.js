import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Grid, MenuItem, InputLabel, FormControl, Select,
  Typography,
  Box,
  FormLabel,
  Autocomplete
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

const AddInvoiceDialog = ({ open, handleClose, selectedData }) => {
  const [form, setForm] = useState({
    InvoiceNumber: selectedData?.InvoiceNumber || '',
    InvoiceDate: null,
    DueDate: null,
    SupplierName: '',
    AccountHead: '',
    Description: '',
    Amount: '',
    GST: '',
    TotalAmount: '',
    PaymentDate: null,
    Preview: null,
  });


  useEffect(() => {
    setForm({
      InvoiceNumber: selectedData?.InvoiceNumber || '',
      InvoiceDate:  null,
      DueDate:  null,
      SupplierName: selectedData?.SupplierName || '',
      AccountHead: selectedData?.AccountHead || '',
      Description: selectedData?.Description || '',
      Amount: selectedData?.Amount || '',
      GST: selectedData?.GST || '',
      TotalAmount: selectedData?.TotalAmount || '',
      PaymentDate: null,
      Preview: selectedData?.Preview || null,
    })

  }, [selectedData])

  // const handleChange = (field, value) => {
  //   setForm(prev => ({
  //     ...prev,
  //     [field]: value,
  //     ...(field === 'Amount' || field === 'GST') && {
  //       TotalAmount: Number(field === 'Amount' ? value : form.Amount) + Number(field === 'GST' ? value : form.GST)
  //     }
  //   }));
  // };

  const handleChange = (field, value) => {
    setForm((prev) => {
      let updated = {
        ...prev,
        [field]: value,
      };

      if (field === 'Amount') {
        const amount = Number(value);
        const gst = Math.round(amount * 0.1);
        updated.GST = gst || '';
        updated.TotalAmount = amount + gst;
      }

      else if (field === 'GST') {
        const gst = Number(value);
        const amount = Number(prev.Amount);
        updated.TotalAmount = amount + gst;
      }

      return updated;
    });
  };


  const handleFileChange = (e) => {
    handleChange('Preview', e.target.files[0]);
  };

  const handleSubmit = () => {
    console.log('Submitted Invoice:', form);
    handleClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={open} handleClose={handleClose} maxWidth="sm" fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: 10,
            bgcolor: '#f8f9fa',
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h5" fontWeight="bold">{selectedData ? 'Edit' : 'Add'} Invoice</Typography>
        </DialogTitle>
        <DialogContent dividers sx={{ px: 3, py: 1 }}>
          <Grid spacing={2}>

            <Box sx={{ my: 2, display: 'flex' }}>

              <TextField
                label="Invoice Number"
                sx={{ width: '250px' }}
                size="small"
                value={form.InvoiceNumber}
                onChange={(e) => handleChange('InvoiceNumber', e.target.value)}
              />
            </Box>


            <Box >
              <DatePicker
                label="Invoice Date"
                value={form.InvoiceDate}
                onChange={(date) => handleChange('InvoiceDate', date)}
                renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                sx={{ mr: 2, width: '250px' }}
              />

              <DatePicker
                label="Due Date"
                sx={{ width: '250px' }}
                value={form.DueDate}
                onChange={(date) => handleChange('DueDate', date)}
                renderInput={(params) => <TextField fullWidth size="small" {...params} />}
              />
            </Box>


            <Box sx={{ my: 2, display: 'flex' }}>

              <Autocomplete
                freeSolo
                options={['Amazon', 'Flipkart', 'Tata Consultancy', 'Infosys']}
                value={form.SupplierName}
                onChange={(event, newValue) => handleChange('SupplierName', newValue)}
                onInputChange={(event, newInputValue) => handleChange('SupplierName', newInputValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Supplier Name"
                    size="small"
                    sx={{ mr: 2, width: '250px' }}
                  />
                )}
              />
              <Autocomplete
                freeSolo
                options={[
                  'Office Supplies',
                  'IT Equipment',
                  'Logistics',
                  'Maintenance',
                ]}
                value={form.AccountHead}
                onChange={(event, newValue) => handleChange('AccountHead', newValue)}
                onInputChange={(event, newInputValue) => handleChange('AccountHead', newInputValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Account Head"
                    size="small"
                    sx={{ width: '250px' }}
                  />
                )}
              />
            </Box>



            <Box sx={{ my: 2, display: 'flex' }}>
              <TextField
                label="Description"
                sx={{ width: '400px' }}
                multiline
                minRows={3}
                size="small"
                value={form.Description}
                onChange={(e) => handleChange('Description', e.target.value)}
              />
            </Box>

            <Box sx={{ my: 2, display: 'flex' }}>

              <TextField
                label="Amount (AUD)"
                type="number"
                sx={{ mr: 2 }}
                size="small"
                value={form.Amount}
                onChange={(e) => handleChange('Amount', e.target.value)}
              />

              <TextField
                label="GST (AUD)"
                type="number"
                sx={{ mr: 2 }}
                size="small"
                value={form.GST}
                onChange={(e) => handleChange('GST', e.target.value)}
              />

              <TextField
                label="Total Amount"
                type="number"

                size="small"
                disabled
                value={form.TotalAmount}
              />
            </Box>

            <Box sx={{ my: 2, display: 'flex', }}>


              <DatePicker
                label="Payment Date"
                sx={{ width: '250px', }}
                value={form.PaymentDate}
                onChange={(date) => handleChange('PaymentDate', date)}
                renderInput={(params) => <TextField sx={{}} fullWidth size="small" {...params} />}
              />

            </Box>
            <Box sx={{ my: 2, display: 'flex' }}>
              <FormControl fullWidth>
                <FormLabel sx={{ mb: 0.5, fontSize: '0.875rem', color: 'text.secondary' }}>
                  Upload Invoice Document <Typography component="span" variant="caption" sx={{ color: 'gray' }}>(Optional)</Typography>
                </FormLabel>
                <Button
                  variant="outlined"
                  component="label"
                  sx={{ width: '200px', height: '40px' }}
                  size="small"
                >
                  Upload <CloudUploadOutlinedIcon sx={{ ml: 2 }} />
                  <input type="file" hidden onChange={handleFileChange} />
                </Button>
              </FormControl>

              {/* {form.Preview && (
                <Typography variant="caption" mt={1} color="text.secondary">
                  {form.Preview.name}
                </Typography>
              )} */}

            </Box>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ m: 1 }}>
          <Button onClick={handleClose} color="">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">{selectedData ? 'Edit' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default AddInvoiceDialog;
