import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { useProducts } from '../context/useProducts';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../utils/helpers';
import { FiClock, FiCheckCircle, FiTruck } from 'react-icons/fi';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const { user, isAdmin } = useAuth();
  if (isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  const { products } = useProducts();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get(
          `http://localhost:5000/api/orders/user/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log('Orders:', response.data);
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  const enrichItem = (item) => {
    const qty = item.quantity || item.qty || 1;

    const prod = products.find(
      p => p.name?.toLowerCase() === item.name?.toLowerCase()
    );

    return {
      name: item.name,
      category: item.category || prod?.category || 'Grocery',
      quantity: qty,
      image:
        item.image ||
        prod?.image ||
        'https://images.unsplash.com/photo-1542838132-92c53300491e?w=160&q=80',
      amount: item.amount || (prod ? prod.price * qty : 0),
    };
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return <FiCheckCircle className="text-emerald-500 shrink-0" size={16} />;

      case 'shipped':
        return <FiTruck className="text-blue-500 shrink-0" size={16} />;
      case 'cancelled':
        return <FiClock className="text-red-500 shrink-0" size={16} />;
      default:
        return <FiClock className="text-amber-500 shrink-0" size={16} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';

      case 'shipped':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-100';
      case 'packed':
        return 'bg-indigo-50 text-indigo-700 border-indigo-100';

      default:
        return 'bg-amber-50 text-amber-700 border-amber-100';
    }
  };

  return (
    <div className="min-h-[70vh] bg-white px-5 py-12 sm:px-12 md:px-24">
      <div className="max-w-[850px] mx-auto">
        <h2 className="text-[22px] font-bold uppercase text-gray-800 tracking-wide border-b-2 border-primary pb-2.5 mb-8">
          My Orders
        </h2>

        {orders.length > 0 ? (
          <div className="flex flex-col gap-8">
            {orders.map((order) => {
              const enrichedItems = order.items.map(enrichItem);

              const orderDate = order.createdAt
                ? new Date(order.createdAt).toLocaleDateString('en-US')
                : '';

              const orderStatus = order.status || 'Pending';

              return (
                <div
                  key={order._id}
                  className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="grid grid-cols-3 items-center gap-4 text-[13px] font-semibold text-gray-700 border-b border-gray-100 pb-4 mb-5 max-sm:grid-cols-1 max-sm:gap-2">
                    <div>
                      <p className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                        Order ID
                      </p>
                      <p className="text-gray-800 font-bold mt-0.5">
                        {order._id}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                        Payment Method
                      </p>
                      <p className="text-gray-800 font-bold mt-0.5">
                        {order.method}
                      </p>
                    </div>

                    <div className="sm:text-right">
                      <p className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                        Total Amount
                      </p>
                      <p className="text-primary font-extrabold text-[16px] mt-0.5">
                        {formatCurrency(order.total)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    {enrichedItems.map((item, index) => (
                      <div
                        key={`${item.name}-${index}`}
                        className={`flex items-center gap-4 text-[13px] font-medium text-gray-700 max-md:flex-col max-md:items-start ${index > 0
                          ? 'border-t border-gray-100 pt-4'
                          : ''
                          }`}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-16 rounded-xl bg-gray-50 object-contain p-1 border border-gray-100 shrink-0"
                          onError={(e) => {
                            e.target.src =
                              'https://images.unsplash.com/photo-1542838132-92c53300491e?w=160&q=80';
                          }}
                        />

                        <div className="flex-1 min-w-0">
                          <h3 className="text-[15px] font-bold text-gray-800 truncate">
                            {item.name}
                          </h3>

                          <p className="text-gray-400 text-xs mt-0.5">
                            Category: {item.category}
                          </p>
                        </div>

                        <div className="flex items-center gap-6 max-md:w-full max-md:justify-between max-md:mt-2">
                          <div className="text-gray-500 font-medium">
                            <p>
                              Quantity:{' '}
                              <span className="font-bold text-gray-800">
                                {item.quantity}
                              </span>
                            </p>

                            <p className="text-xs text-gray-400 mt-0.5">
                              Ordered: {orderDate}
                            </p>
                          </div>

                          <div className="flex items-center gap-4">
                            <span
                              className={`flex items-center gap-1 px-3 py-1 border rounded-full text-xs font-bold ${getStatusColor(
                                orderStatus
                              )}`}
                            >
                              {getStatusIcon(orderStatus)}
                              {orderStatus}
                            </span>
                            {orderStatus.toLowerCase() === "pending" && (
                              <button
                                onClick={async () => {
                                  try {
                                    const token = localStorage.getItem("token");

                                    await axios.put(
                                      `http://localhost:5000/api/orders/${order._id}/cancel`,
                                      {},
                                      {
                                        headers: {
                                          Authorization: `Bearer ${token}`,
                                        },
                                      }
                                    );

                                    setOrders(prev =>
                                      prev.map(o =>
                                        o._id === order._id
                                          ? { ...o, status: "Cancelled" }
                                          : o
                                      )
                                    );
                                  } catch (error) {
                                    console.error(error);
                                    alert("Failed to cancel order");
                                  }
                                }}
                                className="px-3 py-1 text-xs font-bold rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                              >
                                Cancel Order
                              </button>
                            )}

                            <p className="font-bold text-gray-800 text-[14px] text-right min-w-[70px]">
                              {formatCurrency(item.amount)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24 bg-gray-50 border border-dashed border-gray-200 rounded-2xl">
            <p className="text-gray-500 font-medium text-lg mb-4">
              You have not placed any orders yet.
            </p>

            <Link
              to="/products"
              className="btn-primary py-2.5 px-6 text-sm"
            >
              Shop Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;