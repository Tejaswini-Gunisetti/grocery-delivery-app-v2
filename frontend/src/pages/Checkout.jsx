import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { useAuth } from '../context/useAuth';
import Toast from '../components/Toast';
import deliveryGraphic from '../assets/images/delivery_graphic.png';

const Checkout = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (isAdmin) {
      navigate('/admin/orders');
    }
  }, [isAdmin, navigate]);
  const { saveAddress, address } = useCart();
  const [toast, setToast] = useState(false);
  const [errors, setErrors] = useState({});

  // Initialize values with existing saved address if present
  const [formValues, setFormValues] = useState({
    firstName: address?.firstName || '',
    lastName: address?.lastName || '',
    email: address?.email || '',
    street: address?.street || '',
    city: address?.city || '',
    state: address?.state || '',
    pinCode: address?.pinCode || '',
    country: address?.country || 'India',
    phone: address?.phone || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
    // Clear errors as user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!/^\d{6}$/.test(formValues.pinCode)) {
      newErrors.pinCode = "Please enter a valid 6-digit PIN code.";
    }

    if (!/^\d{10}$/.test(formValues.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    saveAddress(formValues);
    setToast(true);
    setTimeout(() => {
      navigate('/cart');
    }, 1500);
  };

  return (
    <div className="container-custom py-16 max-sm:py-8">
      <Toast message="Address saved successfully" show={toast} onClose={() => setToast(false)} />

      <div className="flex justify-between items-center gap-16 max-lg:flex-col max-lg:gap-10">
        <div className="flex-[1.2] w-full max-w-[650px] bg-white p-10 max-sm:p-6 rounded-2xl border border-gray-100 shadow-md">
          <h2 className="text-[32px] max-sm:text-[26px] text-gray-800 font-bold mb-10">
            Add Shipping <span className="text-primary">Address</span>
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex gap-6 max-sm:flex-col">
              <div className="flex-1">
                <input
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  required
                  value={formValues.firstName}
                  onChange={handleInputChange}
                  className="form-input bg-gray-50/50"
                />
              </div>
              <div className="flex-1">
                <input
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  required
                  value={formValues.lastName}
                  onChange={handleInputChange}
                  className="form-input bg-gray-50/50"
                />
              </div>
            </div>

            <div>
              <input
                name="email"
                type="email"
                placeholder="Email address"
                required
                value={formValues.email}
                onChange={handleInputChange}
                className={`form-input bg-gray-50/50 ${errors.email ? 'border-red-400 focus:border-red-400' : ''}`}
              />
              {errors.email && <p className="text-xs text-red-500 font-semibold mt-1.5 pl-1">{errors.email}</p>}
            </div>

            <div>
              <input
                name="street"
                type="text"
                placeholder="Street"
                required
                value={formValues.street}
                onChange={handleInputChange}
                className="form-input bg-gray-50/50"
              />
            </div>

            <div className="flex gap-6 max-sm:flex-col">
              <div className="flex-1">
                <input
                  name="city"
                  type="text"
                  placeholder="City"
                  required
                  value={formValues.city}
                  onChange={handleInputChange}
                  className="form-input bg-gray-50/50"
                />
              </div>
              <div className="flex-1">
                <input
                  name="state"
                  type="text"
                  placeholder="State"
                  required
                  value={formValues.state}
                  onChange={handleInputChange}
                  className="form-input bg-gray-50/50"
                />
              </div>
            </div>

            <div className="flex gap-6 max-sm:flex-col">
              <div className="flex-1">
                <input
                  name="pinCode"
                  type="text"
                  placeholder="PIN code (6 digits)"
                  required
                  value={formValues.pinCode}
                  onChange={handleInputChange}
                  className={`form-input bg-gray-50/50 ${errors.pinCode ? 'border-red-400 focus:border-red-400' : ''}`}
                />
                {errors.pinCode && <p className="text-xs text-red-500 font-semibold mt-1.5 pl-1">{errors.pinCode}</p>}
              </div>
              <div className="flex-1">
                <input
                  name="country"
                  type="text"
                  placeholder="Country"
                  required
                  value={formValues.country}
                  onChange={handleInputChange}
                  className="form-input bg-gray-50/50"
                />
              </div>
            </div>

            <div className="w-[calc(50%-12px)] max-sm:w-full">
              <input
                name="phone"
                type="tel"
                placeholder="Phone (10 digits)"
                required
                value={formValues.phone}
                onChange={handleInputChange}
                className={`form-input bg-gray-50/50 ${errors.phone ? 'border-red-400 focus:border-red-400' : ''}`}
              />
              {errors.phone && <p className="text-xs text-red-500 font-semibold mt-1.5 pl-1">{errors.phone}</p>}
            </div>

            <button type="submit" className="btn-primary mt-6 max-w-[220px] py-4 text-[15px] shadow-md hover:shadow-lg shadow-green-100 font-bold">
              SAVE ADDRESS
            </button>
          </form>
        </div>

        <div className="flex-[0.8] flex justify-center w-full max-lg:order-first">
          <div
            className="w-full max-w-[400px] aspect-square bg-contain bg-no-repeat bg-center opacity-90 mix-blend-multiply"
            style={{ backgroundImage: `url(${deliveryGraphic})` }}
          >
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
