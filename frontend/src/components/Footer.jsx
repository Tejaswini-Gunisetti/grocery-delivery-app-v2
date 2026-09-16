import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-16">
      <div className="bg-white py-16 px-5 text-center">
        <h2 className="text-[28px] text-gray-800 mb-3 font-medium">Never Miss a Deal!</h2>
        <p className="text-gray-500 mb-8 max-w-xl mx-auto">Subscribe to get the latest offers, new arrivals, and exclusive discounts</p>
        <div className="flex max-w-[500px] mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email id" 
            className="flex-1 border border-gray-200 border-r-0 rounded-l-md px-5 py-3.5 outline-none focus:border-primary text-sm"
          />
          <button className="bg-primary text-white px-8 py-3.5 rounded-r-md font-medium hover:bg-primary-hover transition-colors whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </div>

      <div className="bg-[#e8f5e9] flex justify-between px-5 md:px-[10%] py-16 gap-10 flex-wrap">
        <div className="flex-[2] min-w-[300px]">
          <div className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-primary">🛒</span> GreenCart
          </div>
          <p className="text-gray-500 mt-5 text-[14px] leading-relaxed max-w-sm">
            We deliver fresh groceries and snacks straight to your door. Trusted by thousands, we aim to make your shopping experience simple and affordable.
          </p>
        </div>

        <div className="flex-1 min-w-[150px]">
          <h3 className="text-[15px] font-semibold text-gray-800 mb-5">Quick Links</h3>
          <ul className="flex flex-col gap-3.5">
            <li><Link to="/" className="text-[14px] text-gray-500 hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/products" className="text-[14px] text-gray-500 hover:text-primary transition-colors">Best Sellers</Link></li>
            <li><Link to="/offers" className="text-[14px] text-gray-500 hover:text-primary transition-colors">Offers & Deals</Link></li>
            <li><Link to="/contact" className="text-[14px] text-gray-500 hover:text-primary transition-colors">Contact</Link></li>
            <li><Link to="/faq" className="text-[14px] text-gray-500 hover:text-primary transition-colors">FAQs</Link></li>
          </ul>
        </div>

        <div className="flex-1 min-w-[150px]">
          <h3 className="text-[15px] font-semibold text-gray-800 mb-5">Need help?</h3>
          <ul className="flex flex-col gap-3.5">
            <li><Link to="/info" className="text-[14px] text-gray-500 hover:text-primary transition-colors">Delivery Information</Link></li>
            <li><Link to="/return" className="text-[14px] text-gray-500 hover:text-primary transition-colors">Return & Refund Policy</Link></li>
            <li><Link to="/payment" className="text-[14px] text-gray-500 hover:text-primary transition-colors">Payment Methods</Link></li>
            <li><Link to="/track" className="text-[14px] text-gray-500 hover:text-primary transition-colors">Track your Order</Link></li>
            <li><Link to="/contact" className="text-[14px] text-gray-500 hover:text-primary transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div className="flex-1 min-w-[150px]">
          <h3 className="text-[15px] font-semibold text-gray-800 mb-5">Follow Us</h3>
          <ul className="flex flex-col gap-3.5">
            <li><a href="#" className="text-[14px] text-gray-500 hover:text-primary transition-colors">Instagram</a></li>
            <li><a href="#" className="text-[14px] text-gray-500 hover:text-primary transition-colors">Twitter</a></li>
            <li><a href="#" className="text-[14px] text-gray-500 hover:text-primary transition-colors">Facebook</a></li>
            <li><a href="#" className="text-[14px] text-gray-500 hover:text-primary transition-colors">YouTube</a></li>
          </ul>
        </div>
      </div>
      
      <div className="text-center py-5 bg-[#e8f5e9] border-t border-black/5">
        <p className="text-[13px] text-gray-800 font-medium">Copyright 2025 © GreatStack.dev All Right Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
