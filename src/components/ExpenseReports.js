import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Avatar, Box, Container, Paper, Select, MenuItem, Button, CardContent, Grid, Card, FormControl, InputLabel, Tooltip, IconButton, Chip, OutlinedInput } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import AddInvoiceModal from './AddInvoice.modal';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteInvoiceModal from './DeleteInvoice.modal';
import { data } from './utils';




function ExpenseReports() {

  const [selectedSuppliers, setSelectedSuppliers] = useState([]);

  const supplierOptions = [
    'Suppliers1',
    'Suppliers2',
    'Suppliers3',
    'Suppliers4',
  ];

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedSuppliers(typeof value === 'string' ? value.split(',') : value);
  };



  const columns = [
    { accessorKey: 'invoiceId', header: 'Invoice ID', size: 100, },
    { accessorKey: 'siteName', header: 'Site Name', size: 100, },
    { accessorKey: 'supplierName', header: 'Supplier Name', size: 150, },
    {
      accessorKey: 'totalAmount',
      header: (<>
        Total Amount<br />(AUD)
      </>),
      size: 60,
    },

  ];

  const table = useMaterialReactTable({
    columns,
    data: data,
    enableSorting: false,
    enablePagination: false,
    enableDensityToggle: false,
    enableHiding: false,
    enableColumnActions: false,
    enableFullScreenToggle: false,
    enableColumnFilters: false,
    enableGlobalFilter: false,
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

          <FormControl size="small" sx={{ minWidth: 250 }}>
            <InputLabel
              sx={{
                fontSize: 16,
                // fontWeight: 600,
                color: '#333',
                // top: '-8px',
              }}
            >
              Supplier Name
            </InputLabel>
            <Select
              multiple
              value={selectedSuppliers}
              onChange={handleChange}
              input={<OutlinedInput label="Supplier Name" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
            >
              {supplierOptions.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

        </Box>
        <Box >
          <MaterialReactTable table={table} />
        </Box>
      </Box>
    </>
  )
}

export default ExpenseReports;