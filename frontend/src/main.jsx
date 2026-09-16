import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { ProductsProvider } from './context/ProductsContext'
import { OrdersProvider } from './context/OrdersContext'

import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductsProvider>
          <OrdersProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </OrdersProvider>
        </ProductsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
