import React, { useEffect, useMemo, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Grid, MenuItem, InputLabel, FormControl, Select,
  Typography,
  Box,
  FormLabel,
  Autocomplete,
  Stack,
  Tooltip
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { createInvoice, getSuppliers, updateInvoice } from '../api/api';
import { useAuth } from '../context/AuthContext';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AddSupplierModal from './AddSupplier.modal';


const AddInvoiceModal = ({ open, handleClose, selectedData, fetchInvoices, selectedSite , setSelectedData}) => {

  const [openSupplierPopup , setOpenSupplierPopup] = useState(false)
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
    setForm({
      ...selectedData,
      invoiceNumber: selectedData?.invoiceNumber || '',
      invoiceDate: selectedData?.invoiceDate ? dayjs(selectedData?.invoiceDate) : null,
      dueDate: selectedData?.dueDate ? dayjs(selectedData?.dueDate) : null,
      supplierName: selectedData?.supplierName || '',
      accountHead: selectedData?.accountHead || '',
      description: selectedData?.description || '',
      amount: selectedData?.amount || 0,
      gst: selectedData?.gst || 0,
      totalAmount: selectedData?.totalAmount || 0,
      paymentDate: selectedData?.paymentDate ? dayjs(selectedData?.paymentDate) : null,
      preview: selectedData?.preview ?? false,
      paymentType: selectedData?.paymentType ?? null,
      paymentStatus : selectedData?.paymentStatus ?? null,
      invoiceType: selectedData?.invoiceType ?? "",
      nonGSTAmount: selectedData?.nonGSTAmount ?? 0,
      directDebit: selectedData?.directDebit ?? null,
      siteId: selectedData?.siteId ? authUser?.sites?.find(i => i?.id == selectedData?.siteId)?.name : null,
    });
  }, [selectedData]);



  const handleChange = (field, value) => {
    setForm((prev) => {
      let updated = {
        ...prev,
        [field]: value,
      };

      if (field === 'amount') {
        const amount = Number(value);
        const gst = ((amount * 10)/100).toFixed(2);
        const nonGSTAmount = Number(prev.nonGSTAmount)
        updated.gst = gst || 0;
        updated.totalAmount = (amount + gst + nonGSTAmount).toFixed(2);
      }

      else if (field === 'gst') {
        const gst = Number(value);
        const amount = Number(prev.amount);
        const nonGSTAmount = Number(prev.nonGSTAmount)
        updated.totalAmount = (amount + gst + nonGSTAmount).toFixed(2);
      }

      else if (field === 'nonGSTAmount') {
        const gst = Number(prev.gst);
        const amount = Number(prev.amount);
        updated.totalAmount = (amount + gst + Number(value)).toFixed(2);
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
      gst : form?.gst || 0,
      nonGSTAmount: form?.nonGSTAmount || 0,
      siteId: authUser?.ownedSiteId
    }

    if (selectedData?.invoiceId) {

      await updateInvoice(payload)
    } else {
      await createInvoice(payload)
    }
    fetchInvoices(selectedSite)
    setForm({})
    setSelectedData(null)
    handleClose();
  };

const submitDisabled = useMemo(() => {
  return !(
    form?.invoiceNumber &&
    form?.invoiceDate &&
    form?.dueDate &&
    form?.supplierName &&
    // form?.accountHead &&
    // form?.description &&
    form?.invoiceType &&
    // form?.nonGSTAmount  &&
    form?.amount &&
    // form?.gst &&
    form?.totalAmount &&
    // form?.paymentDate &&
    // form?.paymentType  &&
    form?.paymentStatus 
    // form?.directDebit 
  );
}, [form]);


  const [supplierList , setSupplierList] = useState([])
  

  const fetchSuppliers = async ()=>{
    const res = await getSuppliers(authUser?.ownedSiteId)
    Array.isArray(res) ? setSupplierList(res) : setSupplierList([]);
  }

  useEffect(()=>{
    if(authUser?.ownedSiteId){
      fetchSuppliers()
    }
  }, [authUser?.ownedSiteId])

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
        <DialogContent dividers sx={{ px: 3, py: 1, "& .MuiFormLabel-asterisk": { color: "red" } }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            <span style={{ color: "red" }}>*</span> indicates mandatory fields
          </Typography>
          <Grid spacing={2}>

            <Box sx={{ my: 2, display: 'flex' }}>
              <TextField
                label="Invoice Number"
                sx={{ mr: 2, width: '250px' }}
                size="small"
                value={form.invoiceNumber}
                required
                onChange={(e) => handleChange('invoiceNumber', e.target.value)}
              />
              <FormControl sx={{ minWidth: 120 }} size="small" required>
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
            </Box>
            <Box >
              <DatePicker
                label="Invoice Date"
                value={form.invoiceDate}
                format="DD/MM/YYYY" 
                onChange={(date) => handleChange('invoiceDate', date)}
                renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                sx={{ mr: 2, width: '250px' }}
                slotProps={{
                  textField: {
                    required: true,
                    size: 'small',
                  },
                }}
              />
              <DatePicker
                label="Due Date"
                sx={{ width: '250px' }}
                value={form.dueDate}
                format="DD/MM/YYYY" 
                onChange={(date) => handleChange('dueDate', date)}
                renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                slotProps={{
                  textField: {
                    required: true,
                    size: 'small',
                  },
                }}
              />
            </Box>
            <Box sx={{ my: 2, display: 'flex' }}>
              <Stack direction='row' >
              {/* <TextField
                value={form.supplierName}
                sx={{ width: '217px' }}
                multiline
                minRows={1}
                size="small"
                required
                onChange={(e) => handleChange('supplierName', e.target.value)}
                label="Supplier Name"
              /> */}
              <Autocomplete
                options={supplierList?.map(i => i?.name)}
                value={form.supplierName || ''}
                onChange={(event, newValue) => handleChange('supplierName', newValue)}
                disableClearable
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Supplier"
                    size="small"
                    sx={{ width: '217px' }}
                    required
                  />
                )}
              /> 

               {/* <FormControl sx={{ minWidth: 120 }} size="small" required>
                <InputLabel id="demo-simple-select-label">Supplier</InputLabel>
                <Select
                  sx={{ width: '217px', height: '40px' }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={form.supplierName}
                  label="Supplier"
                  onChange={(event) => handleChange('supplierName', event.target.value)}
                >
                  {
                    supplierList?.map(item =>
                      <MenuItem value={item?.name}>{item?.name}</MenuItem>
                    )
                  }
                </Select>
              </FormControl> */}
               <Tooltip title="Add Supplier" arrow>
                  <AddCircleOutlineOutlinedIcon
                    sx={{ mr: 2, mt: 1, ml: 1, cursor: 'pointer' }}
                    onClick={() => setOpenSupplierPopup(true)}
                  />
                </Tooltip>

              </Stack>
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
                required
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
                required
                onChange={(e) => handleChange('totalAmount', e.target.value)}
                value={form.totalAmount}
              />
            </Box>

            <Box sx={{ my: 2, display: 'flex', }}>


              <DatePicker
                label="Payment Date"
                sx={{ width: '250px', mr: 2 }}
                format="DD/MM/YYYY" 
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
                  <MenuItem value='Bank Transfer'>Bank Transfer</MenuItem>
                  <MenuItem value='Cash'>Cash</MenuItem>
                  <MenuItem value='Cash'>Credit Card</MenuItem>
                  <MenuItem value='Direct Debit'>Direct Debit</MenuItem>
                </Select>
              </FormControl>


            </Box>

            <Box sx={{ my: 2, display: 'flex', }}>
              {/* <FormControl sx={{ minWidth: 120 }} size="small" >
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
              </FormControl> */}

               <FormControl sx={{ minWidth: 120 }} size="small" required>
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
              {/* <FormControl fullWidth>
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
              </FormControl> */}

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
      <AddSupplierModal open={openSupplierPopup} onClose={()=>{ setOpenSupplierPopup(false) ; fetchSuppliers()}} />
    </LocalizationProvider>
  );
};

export default AddInvoiceModal;
