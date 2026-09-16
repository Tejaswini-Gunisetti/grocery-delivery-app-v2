import React from 'react';
import { useCart } from '../context/useCart';
import { useAuth } from '../context/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import RatingStars from './RatingStars';
import { formatCurrency } from '../utils/helpers';

const ProductCard = ({ product }) => {
  const { cartItems, addToCart } = useCart();
  const { user, isAdmin, setShowAuthModal } = useAuth();
  const navigate = useNavigate();

  const isAvailable = product.inStock !== false;

  const isInCart = cartItems.some(
    item => item._id === product._id
  );

  const handleCartAction = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (isInCart) {
      navigate('/cart');
      return;
    }

    addToCart(product, 1);
  };

  return (
    <div className="h-full border border-gray-200 rounded-xl bg-white p-3.5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group flex flex-col relative">
      <Link
        to={`/product/${product._id}`}
        className="block w-full h-[190px] overflow-hidden rounded-lg mb-4 bg-gray-50 p-4 relative flex items-center justify-center"
      >
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80";
          }}
        />

        {!isAvailable && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center">
            <span className="bg-red-500 text-white font-bold px-3 py-1 rounded text-[10px] uppercase tracking-wider">
              Out Of Stock
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col">
        <span className="text-[12px] text-gray-500 font-bold uppercase tracking-wider">
          {product.category}
        </span>

        <h3 className="text-[16px] font-semibold text-gray-800 mt-1 mb-1.5 line-clamp-1">
          {product.name}
        </h3>

        <RatingStars
          rating={product.rating}
          className="text-[12px] mb-3.5"
        />

        <div className="flex justify-between items-center gap-3 mt-auto border-t border-gray-100 pt-3">
          <div className="flex items-center gap-2.5">
            <span className="text-[18px] font-bold text-primary">
              {formatCurrency(product.price)}
            </span>

            {product.originalPrice > product.price && (
              <span className="text-[13px] line-through text-gray-400">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          {!isAdmin && (
            isAvailable ? (
              <button
                className="shrink-0 bg-[#e8f5e9] text-primary px-3.5 py-1.5 rounded text-[13px] font-bold hover:bg-primary hover:text-white transition-colors active:scale-[0.96]"
                onClick={handleCartAction}
              >
                {isInCart ? 'Go To Cart' : '+ Add'}
              </button>
            ) : (
              <button
                disabled
                className="shrink-0 bg-gray-100 text-gray-400 px-3 py-1.5 rounded text-[12px] font-bold cursor-not-allowed"
              >
                Sold Out
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;