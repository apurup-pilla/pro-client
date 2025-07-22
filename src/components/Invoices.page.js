import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, Tooltip, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { useEffect, useState } from 'react';
import AddInvoiceModal from './AddInvoice.modal';
import DeleteInvoiceModal from './DeleteInvoice.modal';
import { data } from './utils';
import axios from "axios";
import DateFilter from './DateFilter';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { deleteInvoice, getInvoiceByStoreId } from '../api/api';
import { useAuth } from '../context/AuthContext';



function InvoicesPage() {

  const { authUser } = useAuth()

  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null)
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedSite, setSelectedSite] = useState('')

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const [invoicesData, setInvoicesData] = useState([])

  const fetchInvoices = async () => {
    if (authUser?.siteId) {
      const invoiceRes = await getInvoiceByStoreId(authUser?.siteId)
      console.log("Invoices:", invoiceRes);
      setInvoicesData(invoiceRes?.data);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

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
      accessorKey: 'nonGSTAmount',
      header: (<>
        Non GST Amount <br />(AUD)
      </>),
      size: 60,
    },
    {
      accessorKey: 'nonGstAmount',
      header: (<>
        Non GST Amount <br />(AUD)
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
    { accessorKey: 'paymentType', header: 'Payment Type', size: 100, },
    { accessorKey: 'invoiceType', header: 'Invoice Type', size: 100, },
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
              onClick={() => { setOpenDelete(row.original) }}
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
    data: data,
    // data : invoicesData, 
    enableSorting: false,
    enablePagination: false,
    enableDensityToggle: false,
    enableHiding: true,
    enableColumnActions: false,
    initialState: {
      columnVisibility: {
        siteName: false,
        invoiceId: false,
        accountHead: false,
        description: false
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



  const [range, setRange] = useState({ startDate: null, endDate: null });

  const handleDateChange = (range) => {
    setRange(range);
  };

  return (
    <>
      <Box sx={{ margin: '20px', mt: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>

          <Box sx={{ display: 'flex' }}>

            <FormControl sx={{ minWidth: 120, mr: 2 }} size="small">
              <InputLabel id="demo-select-small-label"
                sx={selectedSite ? {
                  fontSize: 20,
                  fontWeight: 600,
                  color: '#333',
                  top: '-12px',
                } : {}}
              >Site Name</InputLabel>
              <Select
                sx={{ width: '200px', height: '40px' }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedSite}
                label="Site Name"
                onChange={(e) => setSelectedSite(e.target.value)}
              >
                <MenuItem value="BP_LAWNTON">BP LAWNTON</MenuItem>
                <MenuItem value="BP_HIGHFIELDS">BP HIGHFIELDS</MenuItem>
              </Select>
            </FormControl>

            <DateFilter onDateChange={handleDateChange} setRange={setRange} range={range} />
          </Box>
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
            <AddCircleOutlineOutlinedIcon color='#fffff' sx={{ mr: '5px' }} />
            Add Invoice
          </Button>

        </Box>
        <Box >
          <MaterialReactTable table={table} />
        </Box>
      </Box>
      <AddInvoiceModal open={open} handleClose={() => setOpen(false)} selectedData={selectedData} fetchInvoices={fetchInvoices} />
      <DeleteInvoiceModal open={openDelete} handleClose={() => setOpenDelete(false)} fetchInvoices={fetchInvoices} />
    </>
  )
}

export default InvoicesPage;