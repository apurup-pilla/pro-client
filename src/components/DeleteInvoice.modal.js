import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import { deleteInvoice } from '../api/api';

const DeleteInvoiceModal = ({ open, handleClose, fetchInvoices }) => {
  const { invoiceId, id = null } = open

  const onInvoiceDelete = async () => {
    if (id) {
      await deleteInvoice(id)
      console.log("invoiceeeeeee Deleteddddddd")
      fetchInvoices();
    }
  }

  return (
    <Dialog open={Boolean(open)} onClose={handleClose} maxWidth="sm" fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: 10,
          bgcolor: '#f8f9fa',
        },
      }}
    >
      <DialogTitle >
        <Typography variant="h6" fontWeight="bold" >

          Delete Invoice
        </Typography>

      </DialogTitle>
      <DialogContent dividers>
        <Typography>
          Are you sure to delete the invoice?
        </Typography>
        <Typography sx={{ fontWeight: 'bold', mt: 1 }}>
          Invoice ID: {invoiceId}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ m: 1 }}>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={onInvoiceDelete} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteInvoiceModal;
