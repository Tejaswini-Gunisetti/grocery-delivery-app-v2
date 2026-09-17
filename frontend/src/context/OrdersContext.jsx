import React, { useState, useEffect } from 'react';
import { OrdersContext } from './ordersContextValue';

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      try {
        return JSON.parse(savedOrders);
      } catch (e) {
        console.error("Error parsing saved orders", e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: 'ORD' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('en-US'),
      status: 'Pending',
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (id, status) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  return (
    <OrdersContext.Provider value={{
      orders,
      addOrder,
      updateOrderStatus
    }}>
      {children}
    </OrdersContext.Provider>
  );
};
