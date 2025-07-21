import axios from 'axios';

const BASE_URL = 'http://localhost:5093/api';

export const authUser = async ({ username , password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/Auth/login`, { username, password });
    return response.data;
  } catch (error) {
    console.error('Authentication failed:', error);
  }
};

export const getInvoiceByStoreId = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/Invoices/${id}`);
    return response.data;
  } catch (error) {
    console.error('Fetching invoice failed:', error);
 
  }
};


export const createInvoice = async (invoiceData) => {
  try {
    const response = await axios.post(`${BASE_URL}/Invoices`, invoiceData);
    return response.data;
  } catch (error) {
    console.error('Creating invoice failed:', error);
 
  }
};

export const updateInvoice = async (invoiceData) => {
  try {
    const response = await axios.put(`${BASE_URL}/Invoices/${invoiceData?.id}`, invoiceData);
    return response.data;
  } catch (error) {
    console.error('Updating invoice failed:', error);
 
  }
};

export const deleteInvoice = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/Invoices/${id}`);
    return response.data;
  } catch (error) {
    console.error('Deleting invoice failed:', error);
 
  }
};
