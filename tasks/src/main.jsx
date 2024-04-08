import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import AllRoutes from './Allroutes/Allroutes.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter><AllRoutes/></BrowserRouter>
)
