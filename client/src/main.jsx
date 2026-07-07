import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import App from './App.jsx'
import './index.css'

// Instantly warm up the Render backend on bundle load
const backendUrl = import.meta.env.VITE_API_BASE_URL || 'https://project-1uqw.onrender.com/api';
axios.get(`${backendUrl}/health`).catch(() => {});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
