import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiSearch, FiShoppingBag, FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../context/useAuth';
import { useCart } from '../context/useCart';
import { useProducts } from '../context/useProducts';
import { formatCurrency } from '../utils/helpers';

const Navbar = () => {
  const { user, isAdmin, logout, setShowAuthModal } = useAuth();
  const { getCartCount } = useCart();
  const { products } = useProducts();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);

  // Sync searchQuery with URL query parameter when navigating
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('search') || '';
    setSearchQuery(q);
  }, [location.search]);

  // Handle suggestion filtering
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, products]);

  // Click outside to close search suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
      setIsMobileMenuOpen(false);
    }
  };

  const handleSuggestionClick = (productId) => {
    setSearchQuery('');
    setShowSuggestions(false);
    navigate(`/product/${productId}`);
  };

  return (
    <nav className="border-b border-gray-200 py-4 bg-white sticky top-0 z-40 shadow-sm">
      <div className="container-custom flex justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          {/* Mobile hamburger menu toggle */}
          <button
            className="md:hidden text-gray-700 hover:text-primary transition-colors focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>

          <Link to="/" className="text-2xl max-sm:text-xl font-bold text-gray-800 flex items-center gap-2">
            <FiShoppingBag className="text-primary animate-pulse" />
            <span className="bg-gradient-to-r from-gray-800 to-green-700 bg-clip-text text-transparent">GreenCart</span>
          </Link>
        </div>

        <div className="hidden md:flex gap-8">
          <Link to="/" className="font-semibold text-gray-800 hover:text-primary transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary hover:after:w-full after:transition-all">Home</Link>
          <Link to="/products" className="font-semibold text-gray-800 hover:text-primary transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary hover:after:w-full after:transition-all">All Product</Link>
          <Link to="/contact" className="font-semibold text-gray-800 hover:text-primary transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary hover:after:w-full after:transition-all">Contact</Link>
        </div>

        <div className="flex items-center gap-5 max-sm:gap-3">
          {/* Desktop Search Input with Suggestions Dropdown */}
          <form onSubmit={handleSearchSubmit} className="relative hidden sm:flex items-center" ref={searchRef}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="pl-4 pr-10 py-2 border border-gray-200 rounded-full w-52 text-sm focus:outline-none focus:border-primary focus:w-64 transition-all duration-300 shadow-inner bg-gray-50/50"
            />
            <button type="submit" className="absolute right-4 text-gray-400 hover:text-primary transition-colors">
              <FiSearch />
            </button>

            {/* Search Suggestions Dropdown */}
            {showSuggestions && searchQuery.trim() && (
              <div className="absolute top-full right-0 left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-72 overflow-y-auto z-50 w-64 p-1 animate-fade-in">
                {suggestions.length > 0 ? (
                  suggestions.map(product => (
                    <div
                      key={product._id}
                      onClick={() => handleSuggestionClick(product._id)}
                      className="flex items-center gap-3 px-3 py-2.5 hover:bg-green-50 rounded-lg cursor-pointer transition-colors border-b border-gray-50 last:border-b-0"
                    >
                      <img src={product.image} alt={product.name} className="w-8 h-8 object-contain bg-gray-50 p-0.5 rounded border border-gray-100 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-800 truncate">{product.name}</p>
                        <p className="text-[11px] text-gray-400">{product.category}</p>
                        <p className="text-[12px] text-primary font-bold">{formatCurrency(product.price)}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-gray-500">
                    No products found
                  </div>
                )}
              </div>
            )}
          </form>

          {user && !isAdmin && (
            <Link
              to="/cart"
              className="relative text-gray-800 hover:text-primary transition-colors flex items-center"
            >
              <FiShoppingCart size={22} />
              <span className="absolute -top-2.5 -right-2.5 bg-primary text-white text-[10px] font-bold h-[18px] w-[18px] rounded-full flex items-center justify-center border border-white shadow-sm">
                {getCartCount()}
              </span>
            </Link>
          )}

          {user || isAdmin ? (
            <div className="relative group">
              <div className="bg-gray-100 hover:bg-gray-200 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-colors">
                <FiUser size={18} className="text-gray-700" />
              </div>
              <div className="absolute right-0 top-full mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col overflow-hidden z-50">
                {isAdmin ? (
                  <Link to="/admin/add" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-primary font-semibold border-b border-gray-50">Dashboard</Link>
                ) : (
                  <Link to="/orders" className="px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-primary font-semibold border-b border-gray-50">My Orders</Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-primary text-left font-semibold"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button className="btn-primary py-2 px-5 max-sm:px-4 text-sm whitespace-nowrap" onClick={() => setShowAuthModal(true)}>
              Login
            </button>
          )}
        </div>
      </div>

      {/* Mobile navigation menu drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-5 py-4 flex flex-col gap-4 shadow-inner mt-4">
          {/* Mobile Search input */}
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-primary bg-gray-50/50"
            />
            <button type="submit" className="absolute right-4 text-gray-400 hover:text-primary transition-colors">
              <FiSearch />
            </button>
          </form>

          {/* Navigation links */}
          <div className="flex flex-col gap-1.5">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold text-gray-700 hover:text-primary py-2.5 border-b border-gray-100 transition-colors">Home</Link>
            <Link to="/products" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold text-gray-700 hover:text-primary py-2.5 border-b border-gray-100 transition-colors">All Product</Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="font-semibold text-gray-700 hover:text-primary py-2.5 transition-colors">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
