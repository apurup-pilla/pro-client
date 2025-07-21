import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'daterangepicker/daterangepicker.css';
import 'jquery'; // jQuery is used internally
import 'moment';
import 'daterangepicker';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { AuthProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
