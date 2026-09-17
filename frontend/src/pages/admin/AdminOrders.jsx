import API from '../../api';
import { useEffect } from 'react';
import React, { useState } from 'react';
import { FiPackage } from 'react-icons/fi';
import { formatCurrency } from '../../utils/helpers';
import Toast from '../../components/Toast';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get(
        "/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/orders/${orderId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchOrders();

      setToastMsg(`Order updated to "${newStatus}"`);
      setShowToast(true);
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusBgColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';

      case 'shipped':
        return 'bg-blue-50 text-blue-700 border-blue-100';

      case 'packed':
        return 'bg-indigo-50 text-indigo-700 border-indigo-100';

      default:
        return 'bg-amber-50 text-amber-700 border-amber-100';
    }
  };

  return (
    <div className="p-10 max-md:p-6 min-h-screen">
      <Toast
        message={toastMsg}
        show={showToast}
        onClose={() => setShowToast(false)}
      />

      <h2 className="text-[20px] font-bold text-gray-800 mb-8 uppercase tracking-wide">
        Customer Orders
      </h2>

      {orders.length > 0 ? (
        <div className="flex flex-col gap-6">

          {orders.map(order => (
            <div
              key={order._id}
              className="flex gap-8 p-6 bg-white border border-gray-200 rounded-2xl items-center max-md:flex-col max-md:items-start text-[14px] shadow-sm hover:shadow-md hover:border-green-200 transition-all duration-300 w-full"
            >

              <FiPackage
                className="text-primary shrink-0 animate-bounce"
                size={32}
              />

              <div className="flex-[2] min-w-0">

                <div className="font-bold text-gray-800 mb-2 leading-relaxed">
                  {order.items
                    .map(
                      i =>
                        `${i.name} x ${(i.quantity || i.qty || 1)}`
                    )
                    .join(', ')}
                </div>

                <div className="text-gray-600 font-bold mb-1.5">
                  {order.customer?.name || "Customer"}
                </div>

                <div className="text-gray-500 text-[13px] leading-relaxed">
                  <p>{order.customer?.address}</p>

                  <p className="mt-1 font-semibold text-gray-700">
                    {order.customer?.phone}
                  </p>
                </div>

              </div>

              <div className="flex-1 text-gray-600 leading-[1.8] font-semibold max-md:mt-3">

                <p>
                  Items:{' '}
                  <span className="text-gray-800 font-bold">
                    {order.items.length}
                  </span>
                </p>

                <p>
                  Method:{' '}
                  <span className="text-gray-800 font-bold">
                    {order.method || order.payment}
                  </span>
                </p>

                <p>
                  Status:
                  <span
                    className={`ml-2 px-2.5 py-0.5 border text-xs rounded-full font-bold inline-block capitalize ${getStatusBgColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </p>

                <p>
                  Date:{' '}
                  <span className="text-gray-800 font-bold">
                    {new Date(order.createdAt).toLocaleDateString('en-US')}
                  </span>
                </p>

              </div>

              <div className="font-extrabold text-primary text-[20px] max-md:mt-2 shrink-0">
                {formatCurrency(order.total)}
              </div>

              <div className="max-md:mt-3 w-full md:w-44 md:pl-6">

                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 pl-1">
                  Update Status
                </label>

                {order.status === "Cancelled" ? (

                  <div className="w-full px-4 py-3 rounded-xl bg-red-100 text-red-700 font-bold text-center border border-red-200">
                    Cancelled
                  </div>

                ) : (

                  <select
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[14px] font-bold text-gray-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-green-50/20 cursor-pointer shadow-sm"
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(
                        order._id,
                        e.target.value
                      )
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Packed">Packed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>

                )}

              </div>

            </div>
          ))}

        </div>

      ) : (

        <div className="text-center py-20 bg-gray-50 border border-dashed border-gray-200 rounded-2xl">
          <p className="text-gray-500 font-medium">
            No customer orders available.
          </p>
        </div>

      )}

    </div>
  );
};

export default AdminOrders;