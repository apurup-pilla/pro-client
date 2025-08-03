import React, { useEffect, useMemo, useState } from 'react';
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
import { createInvoice, updateInvoice } from '../api/api';
import { useAuth } from '../context/AuthContext';

const AddInvoiceModal = ({ open, handleClose, selectedData, fetchInvoices, selectedSite }) => {

  const { authUser = {} } = useAuth()
  // let sitesObject = {}
  // authUser?.sites?.forEach(i => {
  //   sitesObject[i?.name] = i.id
  // });

  // console.log('sitesObject', sitesObject)
  const [form, setForm] = useState({
    // ...selectedData,
    // invoiceNumber: '',
    // invoiceDate: null,
    // dueDate: null,
    // supplierName: '',
    // accountHead: '',
    // description: '',
    // amount: '',
    // gst: '',
    // totalAmount: '',
    // paymentDate: null,
    // preview: true,
    // paymentType: null,
    // invoiceType: '',
    // nonGSTAmount: null,
    // directDebit: null,
    // siteId: null,
  });

  console.log('form==', form)


  useEffect(() => {
    // setForm({
    //   ...selectedData,
    //   invoiceNumber: selectedData?.invoiceNumber || '',
    //   invoiceDate: selectedData?.invoiceDate ? dayjs(selectedData?.invoiceDate) : null,
    //   dueDate: selectedData?.dueDate ? dayjs(selectedData?.dueDate) : null,
    //   supplierName: selectedData?.supplierName || '',
    //   accountHead: selectedData?.accountHead || '',
    //   description: selectedData?.description || '',
    //   amount: selectedData?.amount || '',
    //   gst: selectedData?.gst || '',
    //   totalAmount: selectedData?.totalAmount || '',
    //   paymentDate: selectedData?.paymentDate ? dayjs(selectedData?.paymentDate) : null,
    //   preview: selectedData?.preview ?? false,
    //   paymentType: selectedData?.paymentType ?? null,
    //   paymentStatus : selectedData?.paymentStatus ?? null,
    //   invoiceType: selectedData?.invoiceType ?? "",
    //   nonGSTAmount: selectedData?.nonGSTAmount ?? null,
    //   directDebit: selectedData?.directDebit ?? null,
    //   siteId: selectedData?.siteId ? authUser?.sites?.find(i => i?.id == selectedData?.siteId)?.name : null,
    // });

    setForm({
    "invoiceNumber": "837834",
    "invoiceType": "Original",
    "invoiceDate": "2025-08-13T18:30:00.000Z",
    "dueDate": "2025-08-12T18:30:00.000Z",
    "supplierName": "jshbdfuy",
    "accountHead": "ksjbfru",
    "description": "skjbfiee",
    "amount": "98375",
    "gst": 9838,
    "totalAmount": 117600,
    "nonGSTAmount": "9387",
    "paymentType": "Cash",
    "paymentDate": "2025-08-21T18:30:00.000Z",
    "directDebit": "Yes",
    "paymentStatus": "Paid"
})
  }, [selectedData]);



  const handleChange = (field, value) => {
    setForm((prev) => {
      let updated = {
        ...prev,
        [field]: value,
      };

      if (field === 'amount') {
        const amount = Number(value);
        const gst = Math.round(amount * 0.1);
        const nonGSTAmount = Number(prev.nonGSTAmount)
        updated.gst = gst || 0;
        updated.totalAmount = amount + gst + nonGSTAmount;
      }

      else if (field === 'gst') {
        const gst = Number(value);
        const amount = Number(prev.amount);
        const nonGSTAmount = Number(prev.nonGSTAmount)
        updated.totalAmount = amount + gst + nonGSTAmount;
      }

      else if (field === 'nonGSTAmount') {
        const gst = Number(prev.gst);
        const amount = Number(prev.amount);
        updated.totalAmount = amount + gst + Number(value);
      }

      return updated;
    });
  };


  const handleFileChange = (e) => {
    // handleChange('preview', e.target.files[0]);
    handleChange('preview', true);

  };

  const handleSubmit = async () => {
    let payload = {
      ...form,
      // siteId: authUser?.sites?.find(i => i.name == form?.siteId)?.id
      siteId: authUser?.ownedSiteId
    }

    if (selectedData?.invoiceId) {

      await updateInvoice(payload)
    } else {
      await createInvoice(payload)
    }
    fetchInvoices(selectedSite)
    setForm({})
    handleClose();
  };

const submitDisabled = useMemo(() => {
  return !(
    form?.invoiceNumber &&
    form?.invoiceDate &&
    form?.dueDate &&
    form?.supplierName &&
    form?.accountHead &&
    form?.description &&
    form?.invoiceType &&
    form?.nonGSTAmount  &&
    form?.amount &&
    form?.gst &&
    form?.totalAmount 
    // form?.paymentDate &&
    // form?.paymentType  &&
    // form?.paymentStatus  &&
    // form?.directDebit 
  );
}, [form]);


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
          <Typography variant="h6" fontWeight="bold">{selectedData ? 'Edit' : 'Add'} Invoice -  {authUser?.sites?.find(i => i?.id == authUser?.ownedSiteId)?.name}</Typography>
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


              <FormControl sx={{ minWidth: 120 }} size="small" >
                <InputLabel id="demo-simple-select-label">Invoice Type</InputLabel>
                <Select
                  sx={{ width: '250px', height: '40px' }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={form.invoiceType}
                  label="Invoice Type"
                  onChange={(event) => handleChange('invoiceType', event.target.value)}
                >
                  <MenuItem value='Original'>Original</MenuItem>
                  <MenuItem value='Dummy'>Dummy</MenuItem>
                </Select>
              </FormControl>
              {/* 
              <Autocomplete
                freeSolo
                options={authUser?.sites?.map(i => i?.name)}
                value={form.siteId}
                onChange={(event, newValue) => handleChange('siteId', newValue)}
                onInputChange={(event, newInputValue) => handleChange('siteId', newInputValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Site Name"
                    size="small"
                    sx={{ width: '250px' }}
                  />
                )}
              /> */}

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
              {/* <Autocomplete
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
              /> */}

              <TextField
                value={form.supplierName}
                sx={{ mr: 2, width: '250px' }}
                multiline
                minRows={1}
                size="small"
                onChange={(e) => handleChange('supplierName', e.target.value)}
                label="Supplier Name"
              />

              {/* <Autocomplete
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
              /> */}
              <TextField
                value={form.accountHead}
                sx={{ mr: 2, width: '250px' }}
                multiline
                minRows={1}
                size="small"
                onChange={(e) => handleChange('accountHead', e.target.value)}
                label="Account Head"
              />
            </Box>



            <Box sx={{ my: 2, display: 'flex' }}>
              <TextField
                label="Description"
                sx={{ width: '96%' }}
                multiline
                minRows={1}
                size="small"
                value={form.description}
                onChange={(e) => handleChange('description', e.target.value)}
              />
            </Box>

            <Box sx={{ my: 2, display: 'flex' }}>

              <TextField
                label="Amount (AUD)"
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
                value={form.nonGSTAmount}
                onChange={(e) => handleChange('nonGSTAmount', e.target.value)}
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
                onChange={(e) => handleChange('totalAmount', e.target.value)}
                value={form.totalAmount}
              />
            </Box>

            <Box sx={{ my: 2, display: 'flex', }}>


              <DatePicker
                label="Payment Date"
                sx={{ width: '250px', mr: 2 }}
                value={form.paymentDate}
                onChange={(date) => handleChange('paymentDate', date)}
                renderInput={(params) => <TextField sx={{}} fullWidth size="small" {...params} />}
                slotProps={{
                  textField: {
                    size: 'small',
                  },
                }}
              />
              <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">Payment Type</InputLabel>
                <Select
                  sx={{ width: '250px', height: '40px' }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={form?.paymentType}
                  label="Payment Type"
                  onChange={(event) => handleChange('paymentType', event.target.value)}
                >
                  <MenuItem value='Cash'>Cash</MenuItem>
                  <MenuItem value='Card'>Card</MenuItem>
                </Select>
              </FormControl>


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
                  <MenuItem value='Yes'>Yes</MenuItem>
                  <MenuItem value='No'>No</MenuItem>
                </Select>
              </FormControl>

               <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">Payment Status</InputLabel>
                <Select
                  sx={{ width: '250px', height: '40px' }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={form.paymentStatus}
                  label="Payment Status"
                  onChange={(event) => handleChange('paymentStatus', event.target.value)}
                >
                  <MenuItem value='Paid'>Paid</MenuItem>
                  <MenuItem value='Due'>Due</MenuItem>
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
          <Button onClick={() => { handleClose(); setForm({}) }} color="">Cancel</Button>
          <Button onClick={handleSubmit} disabled={submitDisabled} variant="contained" color="primary">{selectedData ? 'Edit' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default AddInvoiceModal;
