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

const AddInvoiceModal = ({ open, handleClose, selectedData }) => {
  const [form, setForm] = useState({
    invoiceNumber: selectedData?.invoiceNumber || '',
    invoiceDate: null,
    dueDate: null,
    supplierName: '',
    accountHead: '',
    description: '',
    amount: '',
    gst: '',
    totalAmount: '',
    paymentDate: null,
    preview: null,
  });


  useEffect(() => {
    setForm({
      invoiceNumber: selectedData?.invoiceNumber || '',
      siteName: selectedData?.siteName || '',
      invoiceDate: null,
      dueDate: null,
      supplierName: selectedData?.supplierName || '',
      accountHead: selectedData?.accountHead || '',
      description: selectedData?.description || '',
      amount: selectedData?.amount || '',
      gst: selectedData?.gst || '',
      totalAmount: selectedData?.totalAmount || '',
      paymentDate: null,
      directDebit: '',
      paymentType: '',
      preview: selectedData?.preview || null,
    })

  }, [selectedData])

  // const handleChange = (field, value) => {
  //   setForm(prev => ({
  //     ...prev,
  //     [field]: value,
  //     ...(field === 'amount' || field === 'gst') && {
  //       totalAmount: Number(field === 'amount' ? value : form.amount) + Number(field === 'gst' ? value : form.gst)
  //     }
  //   }));
  // };

  const handleChange = (field, value) => {
    setForm((prev) => {
      let updated = {
        ...prev,
        [field]: value,
      };

      if (field === 'amount') {
        const amount = Number(value);
        const gst = Math.round(amount * 0.1);
        updated.gst = gst || '';
        updated.totalAmount = amount + gst;
      }

      else if (field === 'gst') {
        const gst = Number(value);
        const amount = Number(prev.amount);
        updated.totalAmount = amount + gst;
      }

      return updated;
    });
  };


  const handleFileChange = (e) => {
    handleChange('preview', e.target.files[0]);
  };

  const handleSubmit = () => {
    console.log('Submitted Invoice:', form);
    handleClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={open} onClose={handleClose} handleClose={handleClose} maxWidth="sm" fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: 10,
            bgcolor: '#f8f9fa',
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight="bold">{selectedData ? 'Edit' : 'Add'} Invoice</Typography>
        </DialogTitle>
        <DialogContent dividers sx={{ px: 3, py: 1 }}>
          <Grid spacing={2}>

            <Box sx={{ my: 2, display: 'flex' }}>

              <TextField
                label="Invoice Number"
                sx={{ mr: 2, width: '250px' }}
                size="small"
                value={form.invoiceNumber}
                onChange={(e) => handleChange('invoiceNumber', e.target.value)}
              />

              <Autocomplete
                freeSolo
                options={['BP LAWNTON', 'BP HIGHFIELDS']}
                value={form.siteName}
                onChange={(event, newValue) => handleChange('siteName', newValue)}
                onInputChange={(event, newInputValue) => handleChange('siteName', newInputValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Site Name"
                    size="small"
                    sx={{ width: '250px' }}
                  />
                )}
              />

            </Box>


            <Box >
              <DatePicker
                label="Invoice Date"
                value={form.invoiceDate}
                onChange={(date) => handleChange('invoiceDate', date)}
                renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                sx={{ mr: 2, width: '250px' }}
                slotProps={{
                  textField: {
                    size: 'small',
                  },
                }}
              />

              <DatePicker
                label="Due Date"
                sx={{ width: '250px' }}
                value={form.dueDate}
                onChange={(date) => handleChange('dueDate', date)}
                renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                slotProps={{
                  textField: {
                    size: 'small',
                  },
                }}
              />
            </Box>


            <Box sx={{ my: 2, display: 'flex' }}>

              <Autocomplete
                freeSolo
                options={['Amazon', 'Flipkart', 'Tata Consultancy', 'Infosys']}
                value={form.supplierName}
                onChange={(event, newValue) => handleChange('supplierName', newValue)}
                onInputChange={(event, newInputValue) => handleChange('supplierName', newInputValue)}
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
                value={form.accountHead}
                onChange={(event, newValue) => handleChange('accountHead', newValue)}
                onInputChange={(event, newInputValue) => handleChange('accountHead', newInputValue)}
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
                label="description"
                sx={{ width: '100%' }}
                multiline
                minRows={1}
                size="small"
                value={form.description}
                onChange={(e) => handleChange('description', e.target.value)}
              />
            </Box>

            <Box sx={{ my: 2, display: 'flex' }}>

              <TextField
                label="amount (AUD)"
                type="number"
                sx={{ mr: 2, width: '250px' }}
                size="small"
                value={form.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
              />

              <TextField
                label="Non GST Amount (AUD)"
                type="number"
                sx={{ width: '250px' }}
                size="small"
              // value={form.gst}
              // onChange={(e) => handleChange('gst', e.target.value)}
              />


            </Box>

            <Box sx={{ my: 2, display: 'flex' }}>
              <TextField
                label="GST (AUD)"
                type="number"
                sx={{ mr: 2, width: '250px' }}
                size="small"
                value={form.gst}
                onChange={(e) => handleChange('gst', e.target.value)}
              />


              <TextField
                label="Total Amount"
                type="number"
                sx={{ width: '250px' }}
                size="small"
                disabled
                value={form.totalAmount}
              />
            </Box>

            <Box sx={{ my: 2, display: 'flex', }}>


              <DatePicker
                label="Payment Date"
                sx={{ width: '250px', }}
                value={form.paymentDate}
                onChange={(date) => handleChange('paymentDate', date)}
                renderInput={(params) => <TextField sx={{}} fullWidth size="small" {...params} />}
                slotProps={{
                  textField: {
                    size: 'small',
                  },
                }}
              />

            </Box>

            <Box sx={{ my: 2, display: 'flex', }}>
              <FormControl sx={{ minWidth: 120 }} size="small" >
                <InputLabel id="demo-simple-select-label">Direct Debit</InputLabel>
                <Select
                  sx={{ mr: 2, width: '250px', height: '40px' }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={form.directDebit}
                  label="Direct Debit"
                  onChange={(event) => handleChange('directDebit', event.target.value)}
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
              {/* 
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">Payment Type</InputLabel>
                <Select
                  sx={{ width: '250px', height: '40px' }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={form.paymentType}
                  label="Payment Type"
                  onChange={(event) => handleChange('paymentType', event.target.value)}
                >
                  <MenuItem value='cash'>Cash</MenuItem>
                  <MenuItem value='card'>Card</MenuItem>
                </Select>
              </FormControl> */}

              <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">Payment Type</InputLabel>
                <Select
                  sx={{ width: '250px', height: '40px' }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={form.paymentType}
                  label="Payment Type"
                  onChange={(event) => handleChange('paymentType', event.target.value)}
                >
                  <MenuItem value='cash'>Cash</MenuItem>
                  <MenuItem value='card'>Card</MenuItem>
                </Select>
              </FormControl>
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

              {/* {form.preview && (
                <Typography variant="caption" mt={1} color="text.secondary">
                  {form.preview.name}
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

export default AddInvoiceModal;
