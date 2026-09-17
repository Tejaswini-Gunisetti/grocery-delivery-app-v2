import API from "../api";
import { useAuth } from "../context/useAuth";
import { useEffect } from 'react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/useProducts';
import { FiX, FiCheck } from 'react-icons/fi';
import Toast from '../components/Toast';
import { useCart } from '../context/useCart';
import { formatCurrency } from '../utils/helpers';


const Cart = () => {
  const { cartItems, address, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { user, isAdmin } = useAuth();
  const { products } = useProducts();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAdmin) {
      navigate("/admin/orders");
    }
  }, [isAdmin, navigate]);
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");

  const shippingFee = 0;
  const taxRate = 0.02;
  const subtotal = getCartTotal();
  const tax = subtotal * taxRate;
  const total = subtotal + tax + shippingFee;
  const fullAddress = address
    ? `${address.street}, ${address.city}, ${address.state}, ${address.pinCode}, ${address.country}`
    : '';

  const handleUpdate = (id, val) => {
    updateQuantity(id, val);
    setToastMsg("Cart Updated");
    setShowToast(true);
  };

  const handleRemove = (id) => {
    removeFromCart(id);
    setToastMsg("Item Removed");
    setShowToast(true);
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return;

    if (!address) {
      setToastMsg("Please add a shipping address first!");
      setShowToast(true);
      return;
    }

    // CHECK STOCK BEFORE ORDER
    const outOfStockItem = cartItems.find(cartItem => {
      const latestProduct = products.find(
        p => p._id === cartItem._id
      );

      return latestProduct && latestProduct.inStock === false;
    });

    if (outOfStockItem) {
      setToastMsg(
        `${outOfStockItem.name} is currently out of stock`
      );
      setShowToast(true);
      return;
    }

    try {
      const orderData = {
        userId: user.id,

        items: cartItems.map(item => ({
          name: item.name,
          category: item.category,
          quantity: item.qty,
          amount: item.price * item.qty,
          image: item.image,
        })),

        customer: {
          name: `${address.firstName} ${address.lastName}`,
          address: fullAddress,
          phone: address.phone,
        },

        total: total,

        method:
          paymentMethod === "Cash On Delivery"
            ? "COD"
            : "Online",
      };

      const token = localStorage.getItem("token");

      await API.post(
        "/orders",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setToastMsg("Order Placed Successfully!");
      setShowToast(true);

      setTimeout(() => {
        clearCart();
        navigate("/orders");
      }, 1500);

    } catch (error) {
      console.log(error);

      setToastMsg("Failed to place order");
      setShowToast(true);
    }
  };
  return (
    <div className="container-custom py-12 max-sm:py-8">
      <Toast message={toastMsg} show={showToast} onClose={() => setShowToast(false)} />

      <div className="flex gap-10 items-start max-lg:flex-col">
        <div className="flex-[2] w-full pt-2">
          <h2 className="text-[24px] text-gray-800 font-medium mb-10 flex items-center gap-4 max-sm:flex-col max-sm:items-start max-sm:gap-2">
            Shopping Cart
            <span className="text-[15px] font-semibold text-primary/80 bg-green-50 px-3 py-1 rounded-full">
              {cartItems.length} items
            </span>
          </h2>

          <div className="flex pb-5 border-b border-gray-200 text-[14px] font-semibold text-gray-400 tracking-wider uppercase max-md:hidden">
            <span className="flex-[2.5]">Product Details</span>
            <span className="flex-1 text-center">Subtotal</span>
            <span className="flex-1 text-center">Action</span>
          </div>

          <div className="flex flex-col">
            {cartItems.map(item => (
              <div key={item._id} className="flex items-center py-6 border-b border-gray-100 max-md:flex-col max-md:items-start max-md:gap-4">
                <div className="flex-[2.5] flex items-center gap-5 max-sm:gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-contain bg-gray-50 p-2 border border-gray-200 rounded-lg shadow-sm" />
                  <div>
                    <h4 className="text-[16px] text-gray-800 mb-1 font-medium">{item.name}</h4>
                    <p className="text-[13px] text-gray-500 mb-2">Weight: N/A</p>
                    <div className="text-[14px] font-medium text-gray-600 bg-gray-50 inline-flex items-center px-3 py-1 rounded-md border border-gray-200">
                      Qty:
                      <input
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) => handleUpdate(item._id, e.target.value)}
                        className="ml-2 w-20 bg-transparent outline-none font-bold text-gray-800"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex-1 text-center max-md:text-left font-bold text-gray-800 text-[18px]">
                  {formatCurrency(item.price * item.qty)}
                </div>

                <div className="flex-1 text-center max-md:text-left">
                  <button onClick={() => handleRemove(item._id)} className="text-red-500 p-2.5 bg-red-50 rounded-full hover:bg-red-500 hover:text-white transition-colors mx-auto max-md:mx-0 inline-flex">
                    <FiX size={18} />
                  </button>
                </div>
              </div>
            ))}

            {cartItems.length === 0 && (
              <div className="py-20 text-center text-gray-500 text-[16px]">Your shopping cart is currently empty.</div>
            )}
          </div>

          <Link to="/products" className="inline-block mt-8 text-primary font-medium hover:underline tracking-wide">&larr; Continue Shopping</Link>
        </div>

        <div className="flex-[1.1] bg-[#e8f5e9] p-8 max-sm:p-6 rounded-2xl w-full sticky top-28 max-lg:static">
          <h3 className="text-[20px] text-gray-800 font-semibold mb-8">Order Summary</h3>

          <div className="mb-8">
            <h4 className="text-[13px] text-gray-500 font-semibold mb-3 uppercase tracking-wider">DELIVERY ADDRESS</h4>
            <div className="flex justify-between items-start gap-4 text-[15px] text-gray-800 bg-white p-4 rounded-lg border border-green-100 shadow-sm">
              {address ? (
                <div className="font-medium text-gray-600 leading-6">
                  <p className="font-semibold text-gray-800">{address.firstName} {address.lastName}</p>
                  <p>{fullAddress}</p>
                  <p>{address.phone}</p>
                </div>
              ) : (
                <p className="font-medium text-gray-600">No address found</p>
              )}
              <Link to="/checkout" className="shrink-0 text-primary bg-none border-none font-semibold hover:underline text-[14px]">
                {address ? 'Change' : 'Add'}
              </Link>
            </div>
          </div>

          <div className="mb-0">
            <h4 className="text-[13px] text-gray-500 font-bold mb-3 uppercase tracking-wider">PAYMENT METHOD</h4>
            <div className="flex flex-col gap-3">
              <div
                onClick={() => setPaymentMethod("Cash On Delivery")}
                className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-200 bg-white ${paymentMethod === 'Cash On Delivery' ? 'border-primary shadow-sm bg-green-50/10' : 'border-transparent hover:border-gray-200'}`}
              >
                <div>
                  <p className="text-[14px] font-bold text-gray-800">Cash On Delivery (COD)</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Pay in cash on delivery</p>
                </div>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center border shrink-0 ${paymentMethod === 'Cash On Delivery' ? 'bg-primary border-primary text-white' : 'border-gray-300 bg-white'}`}>
                  {paymentMethod === 'Cash On Delivery' && <FiCheck size={12} />}
                </div>
              </div>

              <div
                onClick={() => setPaymentMethod("Online Payment")}
                className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-200 bg-white ${paymentMethod === 'Online Payment' ? 'border-primary shadow-sm bg-green-50/10' : 'border-transparent hover:border-gray-200'}`}
              >
                <div>
                  <p className="text-[14px] font-bold text-gray-800">Online Payment</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">UPI, Cards, Wallet, Netbanking</p>
                </div>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center border shrink-0 ${paymentMethod === 'Online Payment' ? 'bg-primary border-primary text-white' : 'border-gray-300 bg-white'}`}>
                  {paymentMethod === 'Online Payment' && <FiCheck size={12} />}
                </div>
              </div>
            </div>
          </div>

          <div className="my-8 py-6 border-y border-dashed border-green-300">
            <div className="flex justify-between mb-4 text-[15px] text-gray-600 font-medium">
              <span>Price</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between mb-4 text-[15px] text-gray-600 font-medium">
              <span>Shipping Fee</span>
              <span className="text-primary font-bold">Free</span>
            </div>
            <div className="flex justify-between text-[15px] text-gray-600 font-medium">
              <span>Tax (2%)</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between font-bold text-[20px] mt-4 pt-4 border-t border-green-200/60 text-gray-800">
              <span>Total Amount:</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          <button className="bg-primary text-white w-full rounded-lg font-semibold hover:bg-primary-hover transition-colors text-[18px] py-4 disabled:opacity-60" onClick={handlePlaceOrder} disabled={cartItems.length === 0}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
