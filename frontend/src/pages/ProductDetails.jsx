import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/useProducts';
import { useCart } from '../context/useCart';
import { useAuth } from '../context/useAuth';
import ProductCard from '../components/ProductCard';
import RatingStars from '../components/RatingStars';
import { formatCurrency } from '../utils/helpers';


const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart, cartItems } = useCart();
  const { user, isAdmin, setShowAuthModal } = useAuth();
  console.log("PRODUCT DETAILS ADMIN:", isAdmin);
  const navigate = useNavigate();

  const product = products.find(p => p._id === id);
  const isAvailable = product?.inStock !== false;
  const isInCart = product
    ? cartItems.some(item => item._id === product._id)
    : false;
  const productDetails = product?.description
    ? product.description.split('.').map(item => item.trim()).filter(Boolean)
    : [];

  if (!product) {
    return (
      <div className="container-custom py-16 text-center text-gray-500 font-medium">
        <p className="mb-4">Product not found</p>
        <Link to="/products" className="btn-primary text-sm py-2 px-5">
          Back to Products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (!isAvailable) return;

    if (isInCart) {
      navigate('/cart');
      return;
    }

    addToCart(product, 1);
  };

  const handleBuyNow = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (!isAvailable) return;

    const alreadyInCart = cartItems.find(
      item => item._id === product._id
    );

    if (!alreadyInCart) {
      addToCart(product, 1);
    }

    navigate('/cart');
  };

  return (
    <div className="container-custom py-10 max-sm:py-6">
      <div className="mb-10 text-[14px] text-gray-500 font-medium flex items-center gap-1.5 flex-wrap">
        <Link to="/" className="text-gray-800 hover:text-primary">Home</Link> /
        <Link to="/products" className="text-gray-800 hover:text-primary">Products</Link> /
        <span className="text-gray-400 capitalize">{product.category}</span> /
        <span className="text-primary font-semibold">{product.name}</span>
      </div>

      <div className="flex gap-12 max-md:flex-col max-md:gap-8 mb-24 max-sm:mb-14">
        <div className="flex-[0.9] max-w-[540px] max-md:max-w-full h-[420px] max-md:h-[340px] rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 p-6 flex items-center justify-center shadow-sm relative group">
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
            <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex items-center justify-center">
              <span className="bg-red-500 text-white font-bold px-6 py-2.5 rounded-full shadow-lg tracking-wider text-sm uppercase">
                Out Of Stock
              </span>
            </div>
          )}
        </div>

        <div className="flex-[0.8] md:pr-10 pt-2 max-md:pt-0">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className="bg-green-50 text-primary border border-green-100 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider">
              {product.category}
            </span>

            {isAvailable ? (
              <span className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider">
                Available
              </span>
            ) : (
              <span className="bg-red-500/10 text-red-600 border border-red-500/20 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider">
                Out of stock
              </span>
            )}
          </div>

          <h1 className="text-[32px] max-sm:text-[26px] text-gray-800 font-bold mb-3 leading-tight">
            {product.name}
          </h1>

          <RatingStars rating={product.rating} className="text-[14px] mb-8" />

          <div className="my-8 bg-gray-50/50 p-6 rounded-2xl border border-gray-100 shadow-inner">
            <div className="flex items-baseline gap-3.5 mb-1">
              <span className="text-[30px] font-extrabold text-gray-800">
                {formatCurrency(product.price)}
              </span>

              {product.originalPrice > product.price && (
                <span className="line-through text-gray-400 text-[16px] font-semibold">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="text-[12px] text-gray-400 font-semibold tracking-wide uppercase">
              (Inclusive of all taxes)
            </p>
          </div>

          <div className="my-10">
            <h3 className="text-[16px] font-bold text-gray-800 mb-4 uppercase tracking-wider">
              About Product
            </h3>

            {productDetails.length > 0 ? (
              <ul className="list-disc pl-5 text-gray-600 text-[15px] space-y-2 leading-relaxed font-medium">
                {productDetails.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-[15px] leading-relaxed font-medium">
                {product.description || "No description available."}
              </p>
            )}
          </div>

          {!isAdmin && (
            <div className="flex gap-5 mt-6 max-sm:flex-col">
              <button
                disabled={!isAvailable}
                className={`flex-1 py-4 bg-[#e8f5e9] border border-[#d1efe2] rounded-xl font-bold text-gray-800 hover:bg-[#d1efe2] transition-all duration-200 active:scale-[0.98] ${!isAvailable ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                onClick={handleAddToCart}
              >
                {isInCart ? 'Go To Cart' : 'Add To Cart'}
              </button>

              <button
                disabled={!isAvailable}
                className={`flex-1 py-4 bg-primary border-none rounded-xl text-white font-bold hover:bg-primary-hover transition-all duration-200 active:scale-[0.98] ${!isAvailable
                    ? 'opacity-50 cursor-not-allowed shadow-none'
                    : 'shadow-md hover:shadow-lg shadow-green-200'
                  }`}
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-16 border-t border-gray-100 pt-16">
        <h2 className="text-[24px] font-bold text-center text-gray-800 mb-10 uppercase tracking-wide">
          Related Products
        </h2>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
          {products
            .filter(
              p => p._id !== product._id && p.category === product.category
            )
            .slice(0, 4)
            .map(p => (
              <ProductCard key={p._id} product={p} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;