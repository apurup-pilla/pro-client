import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Avatar, Box, Container, Paper, Select, MenuItem, Button, CardContent, Grid, Card, FormControl, InputLabel, Tooltip, IconButton } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import AddInvoiceModal from './AddInvoice.modal';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteInvoiceModal from './DeleteInvoice.modal';
import { data } from './utils';





function Invoices() {

  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null)
  const [openDelete, setOpenDelete] = useState(false);

  const columns = [
    { accessorKey: 'invoiceId', header: 'Invoice ID', size: 100, },
    { accessorKey: 'siteName', header: 'Site Name', size: 100, },
    { accessorKey: 'invoiceDate', header: 'Invoice Date', size: 100, },
    { accessorKey: 'invoiceNumber', header: 'Invoice Number', size: 100, },
    { accessorKey: 'dueDate', header: 'Due Date', size: 100, },
    { accessorKey: 'supplierName', header: 'Supplier Name', size: 150, },
    { accessorKey: 'accountHead', header: 'Account Head', size: 150, },
    { accessorKey: 'description', header: 'Description', size: 150, },
    {
      accessorKey: 'amount',
      header: (<>
        Amount <br />(AUD)
      </>),
      size: 60,
    },
    {
      accessorKey: 'gst',
      header: (<>
        GST <br />(AUD)
      </>),
      size: 60,
    },
    {
      accessorKey: 'totalAmount',
      header: (<>
        Total Amount<br />(AUD)
      </>),
      size: 60,
    },
    { accessorKey: 'paymentDate', header: 'Payment Date', size: 100, },
    { accessorKey: 'directDebit', header: 'Direct Debit', size: 100, },
    {
      accessorKey: 'paymentType', header: 'Payment Type', size: 100, enableHiding: true,
    },
    {
      accessorKey: 'preview',
      header: 'Preview',
      size: 100,
      Cell: ({ row }) => (
        <>
          {row.original.preview ? (
            <Typography sx={{ color: '#1976d2', textDecoration: 'underline', cursor: "pointer", fontSize: 14, mx: 1 }}>View<OpenInNewOutlinedIcon sx={{ fontSize: 18, mb: '-4px', ml: "2px" }} /> </Typography>
          ) : (
            <Button
              variant="contained"
              color="primary"
              sx={{
                height: 30,
                width: 60,
                fontSize: 12,
                borderRadius: '8px',
                textTransform: 'none',
                boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
                '&:hover': {
                  backgroundColor: '#1976d2',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                },
              }}
            >
              Upload
            </Button>

          )}
        </>
      )
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      size: 100,
      Cell: ({ row }) => (
        <>
          <Tooltip title="Edit">
            <IconButton
              color="primary"
              onClick={() => { setSelectedData(row.original); setOpen(true) }}
            >
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              color="error"
              onClick={() => {setOpenDelete(row.original)}}
            >
              <DeleteOutlineOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const table = useMaterialReactTable({
    columns, 
    data : data,
    enableSorting: false,
    enablePagination: false,
    enableDensityToggle: false,
    enableHiding: true,
    enableColumnActions: false,
    initialState: {
      columnVisibility: {
        siteName: false,
      },
    },

    muiTablePaperProps: {
      elevation: 3,
      sx: {
        borderRadius: '12px',
      }
    },
    muiTableHeadCellProps: {
      sx: {
        backgroundColor: '#2196f34D',
        color: 'black',
        fontWeight: '200'
      }
    },
    muiTableBodyRowProps: ({ row }) => ({
      sx: {
        '&:nth-of-type(odd)': {
          backgroundColor: '#f9f9f9',
        },
        '&:hover': {
          backgroundColor: '#e0f7fa',
        }
      }
    }),
    muiTableBodyCellProps: {
      sx: {
        padding: '12px',
      }
    }

  })
  return (
    <>
      <Box sx={{ margin: '20px', mt: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <FormControl
            size="small"
            sx={{ minWidth: 150 }}
          >
            <InputLabel
              sx={{
                fontSize: 20,
                fontWeight: 600,
                color: '#333',
                top: '-12px',
              }}
            >
              Site Name
            </InputLabel>
            <Select
              labelId="location-label"
              defaultValue="All"
              label="Location"
              sx={{ width: '200px' }}
            >
              <MenuItem value="All">All sites</MenuItem>
              <MenuItem value="BP_LAWNTON">BP LAWNTON</MenuItem>
              <MenuItem value="BP_HIGHFIELDS">BP HIGHFIELDS</MenuItem>
            </Select>
          </FormControl>


          <Button
            variant="contained"
            color="primary"
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
              '&:hover': {
                backgroundColor: '#1976d2',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              },
            }}
            onClick={() => setOpen(true)}
          >
            Add Invoice
          </Button>

        </Box>
        <Box >
          <MaterialReactTable table={table} />
        </Box>
      </Box>
      <AddInvoiceModal open={open} handleClose={() => setOpen(false)} selectedData={selectedData} />
      <DeleteInvoiceModal open={openDelete} handleClose={() => setOpenDelete(false)} onDelete={() => {}} selectedData={selectedData}  />
    </>
  )
}

export default Invoices;