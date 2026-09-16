import React, { useEffect } from 'react';
import { FiCheckCircle } from 'react-icons/fi';

const Toast = ({ message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] transition-all duration-300">
      <div className="bg-white px-5 py-3 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex items-center gap-2.5 text-gray-800 font-medium text-sm">
        <FiCheckCircle className="text-primary text-lg" />
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
