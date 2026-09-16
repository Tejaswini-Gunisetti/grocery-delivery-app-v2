import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatCurrency } from "../../utils/helpers";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const productsRes = await axios.get(
        "http://localhost:5000/api/products"
      );

      const ordersRes = await axios.get(
        "http://localhost:5000/api/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts(productsRes.data);
      setOrders(ordersRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const totalRevenue = orders
    .filter(order => order.status !== "Cancelled")
    .reduce((sum, order) => sum + order.total, 0);

  const pendingOrders = orders.filter(
    order => order.status === "Pending"
  ).length;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Products</h3>
          <p className="text-3xl font-bold text-green-600">
            {products.length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Orders</h3>
          <p className="text-3xl font-bold text-blue-600">
            {orders.length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Pending</h3>
          <p className="text-3xl font-bold text-orange-500">
            {pendingOrders}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Revenue</h3>
          <p className="text-3xl font-bold text-purple-600">
            {formatCurrency(totalRevenue)}
          </p>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;