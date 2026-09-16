import React, { useState, useEffect } from 'react';
import { CartContext } from './cartContextValue';
import Toast from '../components/Toast';

export const CartProvider = ({ children }) => {

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
  };

  const getCartKey = () => {
    const user = getCurrentUser();
    return user ? `cartItems_${user.id}` : 'cartItems_guest';
  };

  const getAddressKey = () => {
    const user = getCurrentUser();
    return user
      ? `deliveryAddress_${user.id}`
      : 'deliveryAddress_guest';
  };

  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState(null);

  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem(getCartKey());
    const savedAddress = localStorage.getItem(getAddressKey());

    setCartItems(
      savedCart ? JSON.parse(savedCart) : []
    );

    setAddress(
      savedAddress ? JSON.parse(savedAddress) : null
    );
  }, []);

  useEffect(() => {
    localStorage.setItem(
      getCartKey(),
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existingProduct = prev.find(
        item => item._id === product._id
      );

      if (existingProduct) {
        return prev.map(item =>
          item._id === product._id
            ? { ...item, qty: item.qty + quantity }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          qty: quantity,
        },
      ];
    });

    setToastMessage(`${product.name} added to cart!`);
    setShowToast(true);
  };

  const removeFromCart = (productId) => {
    setCartItems(prev =>
      prev.filter(item => item._id !== productId)
    );
  };

  const updateQuantity = (productId, newQty) => {
    const quantity = Math.floor(Number(newQty));

    if (!Number.isFinite(quantity) || quantity < 1) {
      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item._id === productId
          ? { ...item, qty: quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(getCartKey());
  };

  const saveAddress = (newAddress) => {
    setAddress(newAddress);

    localStorage.setItem(
      getAddressKey(),
      JSON.stringify(newAddress)
    );
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.qty,
      0
    );
  };

  const getCartCount = () => {
    return cartItems.reduce(
      (count, item) => count + item.qty,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        address,
        saveAddress,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}

      <Toast
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </CartContext.Provider>
  );
};