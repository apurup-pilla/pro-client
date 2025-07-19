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
  const [selectedSites, setSelectedSites] = useState([]);

  const supplierOptions = [
    'Suppliers1',
    'Suppliers2',
    'Suppliers3',
    'Suppliers4',
    'Suppliers5',
    'Suppliers6',
    'Suppliers7',
    'Suppliers8',
    'Suppliers9',
    'Suppliers10',
    'Suppliers11',
    'Suppliers12',
    'Suppliers13',
    'Suppliers14',
    'Suppliers15',
    'Suppliers16',
    'Suppliers17',
    'Suppliers18',
    'Suppliers19',
    'Suppliers20',
  ];

  const siteOptions = [
    'Site1',
    'Site2',
    'Site3',
    'Site4',
    'Site5',
    'Site6',
    'Site7',
    'Site8',
    'Site9',
    'Site10',
    'Site11',
    'Site12',
    'Site13',
    'Site14',
    'Site15',
    'Site16',
    'Site17',
    'Site18',
    'Site19',
    'Site20',
  ];



  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedSuppliers(typeof value === 'string' ? value.split(',') : value);
  };


  const handleChangeSites = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedSites(typeof value === 'string' ? value.split(',') : value);
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
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {/* //justifyContent: 'space-between', */}

          <Box sx={{ width: '40%', pr: 2 }}>
            <FormControl size="small" sx={{ minWidth: 250 }}>
              <InputLabel
                sx={{
                  fontSize: 16,
                  color: '#333',
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
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 
                  }}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        size="small"
                        onMouseDown={(e) => e.stopPropagation()}
                        onDelete={(e) => {
                          e.stopPropagation();
                          setSelectedSuppliers((prev) => prev.filter((val) => val !== value));
                        }}
                      />
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
          <Box sx={{ width: '40%', pr: 2 }} >
            <FormControl size="small" sx={{ minWidth: 250 }}>
              <InputLabel
                sx={{
                  fontSize: 16,
                  // fontWeight: 600,
                  color: '#333',
                  // top: '-8px',
                }}
              >
                Site Name
              </InputLabel>
              <Select
                multiple
                value={selectedSites}
                onChange={handleChangeSites}
                input={<OutlinedInput label="Site Name" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} size="small"
                        onMouseDown={(e) => e.stopPropagation()}
                        onDelete={(e) => {
                          e.stopPropagation();
                          setSelectedSites((prev) => prev.filter((val) => val !== value));
                        }}

                      />
                    ))}
                  </Box>
                )}
              >
                {siteOptions.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ width: 'auto', pl: '5%' }} >
            <Typography>
              Total Expense (AUD)
            </Typography>
            <Typography sx={{color : '#1976d2', fontSize : 28}}>
              87347
            </Typography>
          </Box>
        </Box>
        <Box >
          <MaterialReactTable table={table} />
        </Box>
      </Box>
    </>
  )
}

export default ExpenseReports;