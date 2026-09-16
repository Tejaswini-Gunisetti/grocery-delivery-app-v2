import { useContext } from 'react';
import { OrdersContext } from './ordersContextValue';

export const useOrders = () => useContext(OrdersContext);
