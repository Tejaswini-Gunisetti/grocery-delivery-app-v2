import React from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/useProducts';

const AllProducts = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const filteredProducts = products.filter(product => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) return true;

    return (
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query)
    );
  });

  const handleResetSearch = () => {
    setSearchParams({});
  };

  return (
    <div className="container-custom py-12 max-sm:py-8 min-h-[70vh]">
      <div className="flex justify-between items-center mb-8 gap-4 flex-wrap">
        <h2 className="text-[20px] text-gray-800 font-bold uppercase tracking-wide border-b-2 border-primary pb-1">
          {searchQuery
            ? `Search Results for "${searchQuery}"`
            : "All Products"}
        </h2>

        {searchQuery && (
          <button
            onClick={handleResetSearch}
            className="text-sm font-semibold text-gray-500 hover:text-primary transition-colors bg-gray-100 hover:bg-green-50 px-4 py-1.5 rounded-full"
          >
            Clear Filter
          </button>
        )}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200 w-full">
          <p className="text-[18px] text-gray-500 font-medium mb-4">
            No products found matching your search.
          </p>

          <button
            onClick={handleResetSearch}
            className="btn-primary py-2.5 px-6 text-sm"
          >
            Show All Products
          </button>
        </div>
      )}
    </div>
  );
};

export default AllProducts;