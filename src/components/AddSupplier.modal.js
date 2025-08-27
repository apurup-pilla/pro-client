import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { createSupplier } from '../api/api';
import { useAuth } from '../context/AuthContext';

function AddSupplierModal({ open, onClose }) {
  const [value, setValue] = useState('');
  const { authUser = {} } = useAuth()

  const handleAdd = async() => {
    await createSupplier({ id : authUser?.ownedSiteId , Name : value })
    setValue('');
    onClose();
  };

  const handleCancel = () => {
    setValue('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>Add Supplier</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="normal"
          label="Enter Supplier"
          fullWidth
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="">Cancel</Button>
        <Button onClick={handleAdd} variant="contained" color="primary">Add</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddSupplierModal;
