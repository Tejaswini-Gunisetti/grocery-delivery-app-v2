import React, { useState } from 'react';
import Toast from '../components/Toast';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setToastMsg("Thank you! Your message has been sent successfully.");
    setShowToast(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="container-custom py-16 max-sm:py-8 min-h-[70vh] flex flex-col justify-center items-center">
      <Toast message={toastMsg} show={showToast} onClose={() => setShowToast(false)} />
      
      <div className="w-full max-w-[800px] bg-white border border-gray-200 rounded-2xl shadow-md p-10 max-sm:p-6 grid grid-cols-2 gap-10 max-md:grid-cols-1">
        {/* Contact Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-[28px] font-bold text-gray-800 mb-4">Contact <span className="text-primary">Us</span></h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Have questions about your order, delivery, or fresh produce? Reach out to us and we'll get back to you within 24 hours!
            </p>
          </div>
          
          <div className="flex flex-col gap-5 text-sm font-semibold text-gray-700">
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 font-bold">Email Address</p>
              <p className="text-gray-800">support@greencart.com</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 font-bold">Phone Number</p>
              <p className="text-gray-800">+1 (555) 123-4567</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1 font-bold">Main Office</p>
              <p className="text-gray-800 leading-relaxed">
                123 Green Avenue, Fresh City,<br />FC 54321
              </p>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-6 uppercase tracking-wider">Send a Message</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <input 
                type="text" 
                placeholder="Your Name" 
                required 
                value={name}
                onChange={e => setName(e.target.value)}
                className="form-input bg-gray-50/50" 
              />
            </div>
            <div>
              <input 
                type="email" 
                placeholder="Email Address" 
                required 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="form-input bg-gray-50/50" 
              />
            </div>
            <div>
              <textarea 
                placeholder="How can we help you?" 
                rows="4" 
                required 
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="form-input bg-gray-50/50 resize-none"
              ></textarea>
            </div>
            <button type="submit" className="btn-primary py-3 font-bold shadow-md hover:shadow-lg shadow-green-100 mt-2">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
