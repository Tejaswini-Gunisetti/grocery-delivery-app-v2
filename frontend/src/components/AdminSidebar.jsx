import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiPlusSquare,
  FiList,
  FiCheckSquare
} from 'react-icons/fi';

const AdminSidebar = () => {
  return (
    <div className="min-h-screen border-r border-gray-200 w-16 md:w-[260px] bg-white sticky top-0 shrink-0 transition-all duration-300">
      <div className="flex flex-col mt-8">

        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) => `flex items-center justify-center md:justify-start gap-3.5 px-4 md:px-8 py-4 text-[15px] text-gray-700 font-bold border-r-4 transition-all duration-200 ${isActive ? "bg-green-50 border-primary text-primary" : "border-transparent hover:bg-gray-50"
            }`}
        >
          <FiHome size={20} className="shrink-0" />
          <span className="hidden md:inline">Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/add"
          className={({ isActive }) => `flex items-center justify-center md:justify-start gap-3.5 px-4 md:px-8 py-4 text-[15px] text-gray-700 font-bold border-r-4 transition-all duration-200 ${isActive ? "bg-green-50 border-primary text-primary" : "border-transparent hover:bg-gray-50"
            }`}
        >
          <FiPlusSquare size={20} className="shrink-0" />
          <span className="hidden md:inline">Add Product</span>
        </NavLink>
        <NavLink
          to="/admin/list"
          className={({ isActive }) => `flex items-center justify-center md:justify-start gap-3.5 px-4 md:px-8 py-4 text-[15px] text-gray-700 font-bold border-r-4 transition-all duration-200 ${isActive ? "bg-green-50 border-primary text-primary" : "border-transparent hover:bg-gray-50"
            }`}
        >
          <FiList size={20} className="shrink-0" />
          <span className="hidden md:inline">Product List</span>
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) => `flex items-center justify-center md:justify-start gap-3.5 px-4 md:px-8 py-4 text-[15px] text-gray-700 font-bold border-r-4 transition-all duration-200 ${isActive ? "bg-green-50 border-primary text-primary" : "border-transparent hover:bg-gray-50"
            }`}
        >
          <FiCheckSquare size={20} className="shrink-0" />
          <span className="hidden md:inline">Orders</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
