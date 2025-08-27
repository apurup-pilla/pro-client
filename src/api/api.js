import axios from 'axios';

export const BASE_URL = 'http://localhost:5093';

export const authUser = async ({ username , password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/Auth/login`, { username, password });
    return response.data;
  } catch (error) {
    console.error('Authentication failed:', error);
  }
};

export const getInvoiceByStoreId = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/Invoices/${id}`);
    return response.data;
  } catch (error) {
    console.error('Fetching invoice failed:', error);
 
  }
};


export const createInvoice = async (invoiceData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/Invoices`, invoiceData);
    return response.data;
  } catch (error) {
    console.error('Creating invoice failed:', error);
 
  }
};

export const updateInvoice = async (invoiceData) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/Invoices/${invoiceData?.invoiceId}`, invoiceData);
    return response.data;
  } catch (error) {
    console.error('Updating invoice failed:', error);
 
  }
};

export const deleteInvoice = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/Invoices/${id}`);
    return response.data;
  } catch (error) {
    console.error('Deleting invoice failed:', error);
 
  }
};


export const uploadInvoicePdf = async (invoiceId, formData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/invoices/${invoiceId}/upload`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error('PDF upload failed:', error);
    throw error;
  }
};

export const getSuppliers = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/Suppliers/${id}`);
    return response.data;
  } catch (error) {
    console.error('Fetching Suppliers  failed:', error);
  }
};


export const createSupplier = async ({id , Name}) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/Suppliers/${id}`, {Name});
    return response.data;
  } catch (error) {
    console.error('Creating Suppliers failed:', error);
 
  }
};