import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Avatar, Box, Container, Paper, Select, MenuItem, Button, CardContent, Grid, Card, FormControl, InputLabel, Tooltip, IconButton } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import AddInvoice from './AddInvoice.modal';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';


const data = [
  {
    InvoiceID: 1001,
    InvoiceDate: '2025-07-01',
    InvoiceNumber: 'INV-001',
    DueDate: '2025-07-10',
    SupplierName: 'Alpha Supplies',
    AccountHead: 'Office Supplies',
    Description: 'Stationery purchase',
    Amount: 200.0,
    GST: 20.0,
    TotalAmount: 220.0,
    PaymentDate: '2025-07-05',
    Preview: true
  },
  {
    InvoiceID: 1002,
    InvoiceDate: '2025-07-02',
    InvoiceNumber: 'INV-002',
    DueDate: '2025-07-12',
    SupplierName: 'Beta Hardware',
    AccountHead: 'Maintenance',
    Description: 'Repair tools',
    Amount: 150.0,
    GST: 15.0,
    TotalAmount: 165.0,
    PaymentDate: '2025-07-06',
    Preview: false
  },
  {
    InvoiceID: 1003,
    InvoiceDate: '2025-07-03',
    InvoiceNumber: 'INV-003',
    DueDate: '2025-07-13',
    SupplierName: 'Gamma Tech',
    AccountHead: 'IT Equipment',
    Description: 'Laptop purchase',
    Amount: 1200.0,
    GST: 120.0,
    TotalAmount: 1320.0,
    PaymentDate: '2025-07-08',
    Preview: true
  },
  {
    InvoiceID: 1004,
    InvoiceDate: '2025-07-04',
    InvoiceNumber: 'INV-004',
    DueDate: '2025-07-14',
    SupplierName: 'Delta Print',
    AccountHead: 'Printing',
    Description: 'Marketing flyers',
    Amount: 300.0,
    GST: 30.0,
    TotalAmount: 330.0,
    PaymentDate: '2025-07-09',
    Preview: false
  },
  {
    InvoiceID: 1005,
    InvoiceDate: '2025-07-05',
    InvoiceNumber: 'INV-005',
    DueDate: '2025-07-15',
    SupplierName: 'Omega Logistics',
    AccountHead: 'Logistics',
    Description: 'Courier charges',
    Amount: 180.0,
    GST: 18.0,
    TotalAmount: 198.0,
    PaymentDate: '2025-07-10',
    Preview: false
  },
  {
    InvoiceID: 1006,
    InvoiceDate: '2025-07-06',
    InvoiceNumber: 'INV-006',
    DueDate: '2025-07-16',
    SupplierName: 'Sigma Cleaners',
    AccountHead: 'Facility Management',
    Description: 'Office cleaning',
    Amount: 250.0,
    GST: 25.0,
    TotalAmount: 275.0,
    PaymentDate: '2025-07-11',
    Preview: true
  },
  {
    InvoiceID: 1007,
    InvoiceDate: '2025-07-07',
    InvoiceNumber: 'INV-007',
    DueDate: '2025-07-17',
    SupplierName: 'Zeta Networks',
    AccountHead: 'Internet Services',
    Description: 'Monthly broadband',
    Amount: 100.0,
    GST: 10.0,
    TotalAmount: 110.0,
    PaymentDate: '2025-07-12',
    Preview: true
  },
  {
    InvoiceID: 1008,
    InvoiceDate: '2025-07-08',
    InvoiceNumber: 'INV-008',
    DueDate: '2025-07-18',
    SupplierName: 'Theta Travel',
    AccountHead: 'Travel',
    Description: 'Client visit travel',
    Amount: 500.0,
    GST: 50.0,
    TotalAmount: 550.0,
    PaymentDate: '2025-07-13',
    Preview: true
  },
  {
    InvoiceID: 1009,
    InvoiceDate: '2025-07-09',
    InvoiceNumber: 'INV-009',
    DueDate: '2025-07-19',
    SupplierName: 'Lambda Media',
    AccountHead: 'Advertising',
    Description: 'Social media ads',
    Amount: 400.0,
    GST: 40.0,
    TotalAmount: 440.0,
    PaymentDate: '2025-07-14',
    Preview: true
  },
  {
    InvoiceID: 1010,
    InvoiceDate: '2025-07-10',
    InvoiceNumber: 'INV-010',
    DueDate: '2025-07-20',
    SupplierName: 'Nova Legal',
    AccountHead: 'Legal',
    Description: 'Contract review',
    Amount: 1000.0,
    GST: 100.0,
    TotalAmount: 8100.0,
    PaymentDate: '2025-07-15',
    Preview: true
  },
];






function Invoices() {

  const [open, setOpen] = useState(false);
  const [selectedData , setSelectedData ] = useState(null)

  const columns = [
  { accessorKey: 'InvoiceID', header: 'Invoice ID', size: 100, },
  { accessorKey: 'InvoiceDate', header: 'Invoice Date', size: 100, },
  { accessorKey: 'InvoiceNumber', header: 'Invoice Number', size: 100, },
  { accessorKey: 'DueDate', header: 'Due Date', size: 100, },
  { accessorKey: 'SupplierName', header: 'Supplier Name', size: 150, },
  { accessorKey: 'AccountHead', header: 'Account Head', size: 180, },
  { accessorKey: 'Description', header: 'Description', size: 180, },
  { accessorKey: 'Amount', header: 'Amount (AUD)', size: 100, },
  { accessorKey: 'GST', header: 'GST (AUD)', size: 100, },
  { accessorKey: 'TotalAmount', header: 'Total Amount (AUD)', size: 100, },
  { accessorKey: 'PaymentDate', header: 'Payment Date', size: 100, },
  {
    accessorKey: 'Preview',
    header: 'Preview',
    Cell: ({ row }) => (
      <>
        {row.original.Preview ? (
          <Typography sx={{ color: '#1976d2', textDecoration: 'underline', cursor: "pointer", fontSize: 14, }}>View Invoice <OpenInNewOutlinedIcon sx={{ fontSize: 18, mb: '-4px' }} /> </Typography>
        ) : (
          <Button
            variant="contained"
            color="primary"
            sx={{
              height: 30,
              width: 120,
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
            Upload Invoice
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
            onClick={() => {setSelectedData(row.original); setOpen(true)}}
          >
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            color="error"
            onClick={() => console.log('Delete:', row.original)}
          >
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </>
    ),
  },
];

  const table = useMaterialReactTable({
    columns, data,
    enableSorting: false,
    enablePagination: false,
    enableDensityToggle: false,
    enableHiding: false,
    enableColumnActions: false,

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
            sx={{minWidth : 150}}
          >
            <InputLabel
              id="location-label"
              sx={{
                fontSize: 14,
                fontWeight: 500,
                color: '#333',
                top: '-7px',
              }}
            >
              Site Name
            </InputLabel>
            <Select
              labelId="location-label"
              defaultValue="All"
              label="Location"
            >
              <MenuItem value="All">All sites</MenuItem>
              <MenuItem value="Mumbai">Mumbai</MenuItem>
              <MenuItem value="Delhi">Delhi</MenuItem>
              <MenuItem value="Bangalore">Bangalore</MenuItem>
              <MenuItem value="Hyderabad">Hyderabad</MenuItem>
              <MenuItem value="Chennai">Chennai</MenuItem>
              <MenuItem value="Pune">Pune</MenuItem>
              <MenuItem value="Kolkata">Kolkata</MenuItem>
              <MenuItem value="Ahmedabad">Ahmedabad</MenuItem>
              <MenuItem value="Jaipur">Jaipur</MenuItem>
              <MenuItem value="Lucknow">Lucknow</MenuItem>
            </Select>
          </FormControl>


          <Button
            variant="contained"
            color="primary"
            sx={{
              borderRadius: '8px',
              textTransform : 'none',
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
      <AddInvoice open={open} handleClose={() => setOpen(false)} selectedData={selectedData} />
    </>
  )
}

export default Invoices;