import { useContext } from 'react';
import { ProductsContext } from './productsContextValue';

export const useProducts = () => useContext(ProductsContext);
