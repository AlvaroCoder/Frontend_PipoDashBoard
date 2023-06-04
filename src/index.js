import React from 'react';
import { createRoot } from 'react-dom/client'
import ContainerRoute from './Routes/ContainerRoute';
import './Assets/index.css';
import './Assets/Components/AddProduct.css';
import './Assets/Components/AddClient.css'

import './Assets/Components/Client.css';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ContainerRoute/>
)

