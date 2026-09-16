import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';
import { useAuth } from '../context/useAuth';
import Toast from './Toast';

const AuthModal = () => {
  const { showAuthModal, setShowAuthModal, login } = useAuth();

  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  if (!showAuthModal) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const result = await login(email, password);

        if (!result.success) {
          setToastMsg(result.message);
          setShowToast(true);
          return;
        }

        setToastMsg('Login successful!');
        setShowToast(true);

        setTimeout(() => {
          setShowAuthModal(false);
          navigate('/');
        }, 1000);

      } else {
        await axios.post(
          'http://localhost:5000/api/auth/register',
          {
            name,
            email,
            password,
          }
        );

        setToastMsg('Account created successfully!');
        setShowToast(true);

        setTimeout(() => {
          setIsLogin(true);
        }, 1000);
      }
    } catch (error) {
      setToastMsg(
        error.response?.data?.message ||
        'Something went wrong'
      );
      setShowToast(true);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000] p-4"
      onClick={() => setShowAuthModal(false)}
    >
      <div
        className="bg-white p-8 rounded-xl w-full max-w-[400px] relative shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-center text-primary text-2xl font-medium mb-6">
          User {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <div>
              <label className="text-sm font-medium mb-1.5 block text-gray-800">
                Name
              </label>

              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium mb-1.5 block text-gray-800">
              Email
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block text-gray-800">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input pr-10"
                placeholder="••••••••"
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

          <p className="text-[13px] text-gray-800 font-medium">
            {isLogin
              ? 'Create an account? '
              : 'Already have account? '}

            <span
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary cursor-pointer hover:underline"
            >
              click here
            </span>
          </p>

          <button
            type="submit"
            className="btn-primary w-full mt-2 py-3"
          >
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>
      </div>

      <Toast
        message={toastMsg}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>

  );
};

export default AuthModal;