import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// 统一浏览器样式
import 'normalize.css'
// Mantine
import { MantineProvider } from '@mantine/core';


ReactDOM.createRoot(document.getElementById('root')).render(
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <App />
  </MantineProvider>
)
