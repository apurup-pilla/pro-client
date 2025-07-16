import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Avatar, Box, Container, Paper, Select, MenuItem, Button, CardContent, Grid, Card } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import AddPurchase from './AddPurchase.modal';


const data = [
  {
    title: "Invoice #1001",
    issueDate: "2025-07-01",
    dueDate: "2025-07-15",
    supplierName: "Alpha Traders",
    price: 5000,
    preview: true,
    location: "Mumbai"
  },
  {
    title: "Invoice #1002",
    issueDate: "2025-07-03",
    dueDate: "2025-07-18",
    supplierName: "Beta Supplies",
    price: 12000,
    preview: false,
    location: "Delhi"
  },
  {
    title: "Invoice #1003",
    issueDate: "2025-07-05",
    dueDate: "2025-07-20",
    supplierName: "Gamma Distributors",
    price: 3000,
    preview: false,
    location: "Bangalore"
  },
  {
    title: "Invoice #1004",
    issueDate: "2025-07-07",
    dueDate: "2025-07-22",
    supplierName: "Delta Corp",
    price: 4500,
    preview: true,
    location: "Hyderabad"
  },
  {
    title: "Invoice #1005",
    issueDate: "2025-07-10",
    dueDate: "2025-07-25",
    supplierName: "Epsilon Co",
    price: 8000,
    preview: true,
    location: "Chennai"
  },
  {
    title: "Invoice #1006",
    issueDate: "2025-07-12",
    dueDate: "2025-07-27",
    supplierName: "Zeta Industries",
    price: 10000,
    preview: true,
    location: "Pune"
  },
  {
    title: "Invoice #1007",
    issueDate: "2025-07-14",
    dueDate: "2025-07-29",
    supplierName: "Eta Logistics",
    price: 3500,
    preview: true,
    location: "Kolkata"
  },
  {
    title: "Invoice #1008",
    issueDate: "2025-07-16",
    dueDate: "2025-07-31",
    supplierName: "Theta Imports",
    price: 6000,
    preview: true,
    location: "Ahmedabad"
  },
  {
    title: "Invoice #1009",
    issueDate: "2025-07-18",
    dueDate: "2025-08-02",
    supplierName: "Iota Retailers",
    price: 2800,
    preview: true,
    location: "Jaipur"
  },
  {
    title: "Invoice #1010",
    issueDate: "2025-07-20",
    dueDate: "2025-08-05",
    supplierName: "Kappa Exports",
    price: 7200,
    preview: true,
    location: "Lucknow"
  }
];


const columns = [
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'issueDate', header: 'Issue Date' },
  { accessorKey: 'dueDate', header: 'Due Date' },
  { accessorKey: 'supplierName', header: 'Supplier Name' },
  { accessorKey: 'location', header: 'Location' },
  { accessorKey: 'price', header: 'Price' },
  {
    accessorKey: 'preview', header: 'Preview',
    Cell: ({ row }) => (
      <>{row.original.preview ?
        <Typography sx={{ color: '#1976d2', textDecoration: 'underline' }}>View</Typography>
        :
        <Typography sx={{ color: '#1976d2', textDecoration: 'underline' }}>Upload</Typography>
      }
      </>
    )
  },
];



function Dashboard() {

  const [open, setOpen] = useState(false);

  const table = useMaterialReactTable({
    columns, data, enableSorting: false,
    enableFilters: true,
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
      <Box sx={{ margin: '20px' , }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Select
            defaultValue='All'
            size="small"
            sx={{
              minWidth: 180,
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              px: 1,
              '&:hover': {
                backgroundColor: '#e0e0e0',
              }
            }}
          >
            <MenuItem value="All">All Locations</MenuItem>
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

          <Button
            variant="contained"
            color="primary"
            sx={{
              borderRadius: '8px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
              '&:hover': {
                backgroundColor: '#1976d2',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              },
            }}
            onClick={() => setOpen(true)}
          >
            Add Purchase
          </Button>

        </Box>
        <Box >
          <MaterialReactTable table={table} />
        </Box>
      </Box>
      <AddPurchase open={open} handleClose={() => setOpen(false)} />
    </>
  )
}

export default Dashboard;