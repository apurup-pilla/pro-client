import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, Tooltip, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { useEffect, useRef, useState } from 'react';
import AddInvoiceModal from './AddInvoice.modal';
import DeleteInvoiceModal from './DeleteInvoice.modal';
import { data } from './utils';
import axios from "axios";
import DateFilter from './DateFilter';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { BASE_URL, deleteInvoice, getInvoiceByStoreId, uploadInvoicePdf } from '../api/api';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

function InvoicesPage() {

  const { authUser } = useAuth()

  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null)
  const [openDelete, setOpenDelete] = useState(false);
  const [sitesData, setSitesData] = useState((authUser?.sites || []));
  const [selectedSite, setSelectedSite] = useState(authUser?.ownedSiteId || 1)

  useEffect(() => {
    setSelectedSite(authUser?.ownedSiteId || authUser?.sites?.[0]?.id)
    setSitesData(authUser?.sites || []);
  }, [authUser])


  console.log('selectedSite', selectedSite)

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const fileInputRefs = useRef({});

  const [invoicesData, setInvoicesData] = useState([]);

  const [allPdfs, setAllPdfs] = useState({})

  console.log('authUser', authUser)

  const fetchInvoices = async (siteId) => {
    const invoiceRes = await getInvoiceByStoreId(siteId)
    console.log("Invoices:", invoiceRes);
    Array.isArray(invoiceRes) && setInvoicesData(invoiceRes);
  };

  const updateSiteDetails = async () => {
    const siteNamePlaceholder = {
      id: 0,
      name: 'Select Site'
    }
    const sitesData = [siteNamePlaceholder, ...(authUser?.sites || [])]
    setSitesData(sitesData);
  }

  useEffect(() => {
    if (selectedSite) {
      fetchInvoices(selectedSite)
    };
  }, [selectedSite]);


  const loadPdf = (invoicesData) => {
    const data = {}
    invoicesData.forEach(each => {
      const pdf = localStorage.getItem(each?.invoiceId)
      if (pdf) {
        data[each?.invoiceId] = pdf
      }
    });
    setAllPdfs(data)
  }


  useEffect(() => {
    loadPdf(invoicesData)
  }, [invoicesData])



  const handleSiteChange = (e) => {
    const siteId = e.target.value;
    setSelectedSite(siteId);
    fetchInvoices(selectedSite);
  }

  const [pdfDataUrl, setPdfDataUrl] = useState(localStorage.getItem("uploadedPdf") || null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result;
        localStorage.setItem(selectedData?.invoiceId, dataUrl);
        setSelectedData(null)
        loadPdf(invoicesData)
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleUploadPdf = async (e) => {

    const file = e.target.files[0];

    if (!file || !["application/pdf", "image/jpeg", "image/jpg"].includes(file.type)) {
      alert("Please upload a valid PDF or JPEG file.");
      return;
    }


    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await uploadInvoicePdf(selectedData?.invoiceId, formData)
      console.log("response PDF upload-", response)
      if (!response?.newFileName) {
        throw new Error("File upload failed.");
      }

      setSelectedData(null)
      fetchInvoices(selectedSite)
    } catch (error) {
      console.error("Upload error:", error);
      setSelectedData(null)
      alert("Error uploading the file.");
    }
  }


  // const handleOpenPdf = (url) => {
  //   if (!url) return;

  //   const byteCharacters = atob(url.split(",")[1]);
  //   const byteNumbers = new Array(byteCharacters.length).fill().map((_, i) => byteCharacters.charCodeAt(i));
  //   const byteArray = new Uint8Array(byteNumbers);
  //   const blob = new Blob([byteArray], { type: "application/pdf" });

  //   const blobUrl = URL.createObjectURL(blob);
  //   window.open(blobUrl, "_blank");
  // }

  const handleOpenPdf = (invoiceUrl) => {
    if (!invoiceUrl) return;
    const formatedUrl = `${BASE_URL}/Invoices/${invoiceUrl}`;
    window.open(formatedUrl, "_blank");
  }


  const columns = [
    { accessorKey: 'invoiceId', header: 'Invoice ID', size: 100, },
    {
      accessorKey: 'siteName', header: 'Site Name', size: 120,
      Cell: ({ row }) => (
        sitesData?.find(i => i?.id == row?.original?.siteId)?.name
      )
    },
    {
      accessorKey: 'invoiceDate', header: 'Invoice Date', size: 100,
      Cell: ({ row }) => {
        const value = row.original.invoiceDate;
        return value ? format(new Date(value), 'dd/MM/yyyy') : '';
      }
    },
    { accessorKey: 'invoiceNumber', header: 'Invoice Number', size: 100, },
    {
      accessorKey: 'dueDate', header: 'Due Date', size: 100,
      Cell: ({ row }) => {
        const value = row.original.dueDate;
        return value ? format(new Date(value), 'dd/MM/yyyy') : '';
      }
    },
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
    {
      accessorKey: 'paymentDate', header: 'Payment Date', size: 100,
      Cell: ({ row }) => {
        const value = row.original.paymentDate;
        return value ? format(new Date(value), 'dd/MM/yyyy') : '';
      }
    },
    { accessorKey: 'directDebit', header: 'Direct Debit', size: 100, },
    { accessorKey: 'paymentType', header: 'Payment Type', size: 100, },
    { accessorKey: 'paymentStatus', header: 'Payment Status', size: 100, },
    { accessorKey: 'invoiceType', header: 'Invoice Type', size: 100, },
    {
      accessorKey: 'preview',
      header: 'Preview',
      size: 100,
      Cell: ({ row }) => (
        <>
          {row.original?.invoiceUrl ? (
            <Typography
              sx={{ color: '#1976d2', textDecoration: 'underline', cursor: "pointer", fontSize: 14, mx: 1 }}
              onClick={() => handleOpenPdf(row.original?.invoiceUrl)}
            >
              View
              <OpenInNewOutlinedIcon
                sx={{ fontSize: 18, ml: "2px" }}
              />
            </Typography>
          ) : (
            // authUser?.ownedSiteId === selectedSite ?
            //   <>
            //     <Button
            //       variant="contained"
            //       color="primary"
            //       sx={{
            //         height: 30,
            //         width: 60,
            //         fontSize: 12,
            //         borderRadius: '8px',
            //         textTransform: 'none',
            //         boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
            //         '&:hover': {
            //           backgroundColor: '#1976d2',
            //           boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            //         },
            //       }}
            //       onClick={() => {
            //         const inputRef = fileInputRefs.current[row.original.invoiceId];
            //         if (inputRef?.value) inputRef.value = "";
            //         inputRef?.click();
            //         setSelectedData(row.original);
            //       }}
            //     >
            //       Upload
            //     </Button>
            //     <input type="file" accept="application/pdf"
            //       style={{ display: "none" }}
            //       ref={(el) => (fileInputRefs.current[row.original.invoiceId] = el)}
            //       // onChange={handleFileChange}
            //       onChange={handleUploadPdf}
            //     />
            //   </>
            //   :

              <div>-</div>

          )}
        </>
      )
    },
  ];

  if (authUser?.ownedSiteId === selectedSite) {
    columns.push(
      {
        accessorKey: 'actions',
        header: 'Actions',
        size: 150,
        Cell: ({ row }) => (
          <>
            <Tooltip title="Upload">
              <IconButton
                color="primary"
                onClick={() => {
                  const inputRef = fileInputRefs.current[row.original.invoiceId];
                  if (inputRef?.value) inputRef.value = "";
                  inputRef?.click();
                  setSelectedData(row.original);
                }}
              >
                <CloudUploadOutlinedIcon fontSize="small" />
              </IconButton>
              <input 
              type="file" 
                accept="application/pdf, image/jpeg, image/jpg"
                style={{ display: "none" }}
                ref={(el) => (fileInputRefs.current[row.original.invoiceId] = el)}
                onChange={handleUploadPdf}
              />
            </Tooltip>
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

    )
  }


  const table = useMaterialReactTable({
    columns,
    // data: [],
    data: invoicesData,
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
                onChange={handleSiteChange}
              >
                {sitesData.map((site) => (
                  <MenuItem value={site.id} >
                    {site.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* <DateFilter onDateChange={handleDateChange} setRange={setRange} range={range} /> */}
          </Box>
          {
            authUser?.ownedSiteId === selectedSite &&
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
          }

        </Box>
        <Box >
          <MaterialReactTable table={table} />
        </Box>
      </Box>
      <AddInvoiceModal
        open={open}
        handleClose={() => setOpen(false)}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        fetchInvoices={fetchInvoices}
        selectedSite={selectedSite}
      />
      <DeleteInvoiceModal
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        fetchInvoices={fetchInvoices}
        selectedSite={selectedSite}
      />
    </>
  )
}

export default InvoicesPage;