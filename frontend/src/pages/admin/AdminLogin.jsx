import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../../context/useAuth';

const AdminLogin = () => {
  const { adminLogin } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    adminLogin();
    navigate('/admin/add');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-12 rounded-2xl w-full max-w-[450px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-gray-100">
        <h2 className="text-[32px] text-center mb-10 text-gray-800 font-bold">Seller <span className="font-semibold text-gray-800">Login</span></h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div>
            <label className="text-[14px] font-semibold block mb-2 text-gray-700">Email Address</label>
            <input type="email" placeholder="example@email.com" required className="form-input bg-gray-50/50" />
          </div>
          <div>
            <label className="text-[14px] font-semibold block mb-2 text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                required
                className="form-input bg-gray-50/50 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors focus:outline-none p-1 flex items-center justify-center cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn-primary w-full mt-4 py-3.5 text-[16px]">Login to Dashboard</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
