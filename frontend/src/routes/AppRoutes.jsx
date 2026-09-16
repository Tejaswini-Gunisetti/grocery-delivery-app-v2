import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';
import AdminSidebar from '../components/AdminSidebar';

import Home from '../pages/Home';
import AllProducts from '../pages/AllProducts';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import MyOrders from '../pages/MyOrders';
import Contact from '../pages/Contact';

import AdminLogin from '../pages/admin/AdminLogin';
import AddProduct from '../pages/admin/AddProduct';
import ProductList from '../pages/admin/ProductList';
import AdminOrders from '../pages/admin/AdminOrders';
import AdminDashboard from '../pages/admin/AdminDashboard';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <AuthModal />
      <Routes>
        <Route path="/*" element={
          <div className="flex flex-col min-h-screen bg-white">
            <Navbar />
            <main className="flex-1 w-full max-w-full overflow-hidden">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<AllProducts />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<MyOrders />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
          </div>
        } />

        <Route path="/admin-login" element={<AdminLogin />} />

        <Route path="/admin/*" element={
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-1 w-full max-w-full">
              <AdminSidebar />
              <div className="flex-1 bg-gray-50 border-l border-gray-200">
                <main className="max-w-[1200px] w-full">
                  <Routes>
                    <Route path="/dashboard" element={<AdminDashboard />} />
                    <Route path="/add" element={<AddProduct />} />
                    <Route path="/list" element={<ProductList />} />
                    <Route path="/orders" element={<AdminOrders />} />
                  </Routes>
                </main>
              </div>
            </div>
          </div>
        } />
      </Routes>
    </>
  );
};

export default AppRoutes;
