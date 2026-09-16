import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import { categories } from '../utils/mockData';
import { useProducts } from '../context/useProducts';
import { FiHeart, FiTruck } from 'react-icons/fi';
import { TbLeaf, TbCurrencyRupee } from 'react-icons/tb';
import heroImg from '../assets/hero.png';
import promoBg from '../assets/images/promo_bg.png';

const Home = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');

  const categoryMap = {
    "Organic veggies": "Vegetables",
    "Fresh Fruits": "Fruits",
    "Cold Drinks": "Drinks",
    "Instant Food": "Instant Food",
    "Dairy Products": "Dairy",
    "Bakery & Breads": "Bakery",
    "Grains & Cereals": "Grains"
  };

  const handleCategoryClick = (categoryName) => {
    setSearchParams({ category: categoryName });
  };

  if (selectedCategory) {
    const mappedCategory = categoryMap[selectedCategory] || selectedCategory;
    const filteredProducts = products.filter(
      product => product.category.toLowerCase() === mappedCategory.toLowerCase()
    );

    return (
      <div className="pb-16 bg-white shrink-0">
        <section className="container-custom mt-12 min-h-[60vh]">
          <div className="mb-10">
            <button
              onClick={() => setSearchParams({})}
              className="text-gray-500 hover:text-primary transition-colors text-[14px] font-semibold flex items-center gap-1.5 mb-6"
            >
              &larr; Back to Home
            </button>
            <h2 className="text-[28px] max-sm:text-[24px] font-bold text-gray-800 uppercase tracking-wide inline-block border-b-4 border-primary pb-2.5">
              {selectedCategory}
            </h2>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
              {filteredProducts.map(product => (
                  <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 text-gray-500 font-medium bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              No products found in this category.
            </div>
          )}
        </section>
      </div>
    );
  }

  return (
    <div className="pb-16 bg-white shrink-0">
      <section className="container-custom mt-8">
        <div
          className="bg-[#d1efe2] rounded-2xl py-20 px-12 min-h-[450px] flex items-center bg-right bg-no-repeat w-full max-w-full overflow-hidden max-md:px-8 max-md:py-14 max-sm:min-h-[360px] max-sm:bg-bottom max-sm:items-start"
          style={{ backgroundImage: `url(${heroImg})`, backgroundSize: 'contain' }}
        >
          <div>
            <h1 className="text-[48px] max-md:text-[40px] max-sm:text-[30px] text-[#1a4231] font-bold mb-8 leading-[1.15]">
              Freshness You Can<br />Trust, Savings You<br />will Love!
            </h1>
            <div className="flex items-center gap-6 max-sm:flex-col max-sm:items-start max-sm:gap-4">
              <Link to="/products" className="btn-primary px-8">Shop now</Link>
              <Link to="/products" className="text-gray-800 font-semibold hover:text-primary transition-colors text-[15px]">Explore deals &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-custom mt-20">
        <h2 className="text-[22px] font-semibold text-gray-800 mb-8">Categories</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-5">
          {categories.map(category => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={() => handleCategoryClick(category.name)}
            />
          ))}
        </div>
      </section>

      <section className="container-custom mt-20">
        <h2 className="text-[22px] font-semibold text-gray-800 mb-8">Best Sellers</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
          {products.slice(0, 4).map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      <section className="container-custom mt-20">
        <div
          className="bg-[#d1efe2] rounded-2xl p-16 flex justify-end bg-left bg-no-repeat overflow-hidden w-full max-lg:bg-none max-md:p-8"
          style={{ backgroundImage: `url(${promoBg})`, backgroundSize: 'contain' }}
        >
          <div className="w-[55%] pl-10 border-l border-green-300 max-lg:w-full max-lg:pl-0 max-lg:border-l-0">
            <h2 className="text-[32px] max-sm:text-[26px] text-primary font-semibold mb-10">Why We Are the Best?</h2>
            <ul className="flex flex-col gap-8">
              <li className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-sm">
                  <FiTruck size={24} />
                </div>
                <div>
                  <strong className="block text-[18px] text-gray-800 font-semibold mb-0.5">Fastest Delivery</strong>
                  <p className="text-[14px] text-gray-600">Groceries delivered in under 30 minutes.</p>
                </div>
              </li>
              <li className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-sm">
                  <TbLeaf size={24} />
                </div>
                <div>
                  <strong className="block text-[18px] text-gray-800 font-semibold mb-0.5">Freshness Guaranteed</strong>
                  <p className="text-[14px] text-gray-600">Fresh produce straight from the source.</p>
                </div>
              </li>
              <li className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-sm">
                  <TbCurrencyRupee size={24} />
                </div>
                <div>
                  <strong className="block text-[18px] text-gray-800 font-semibold mb-0.5">Affordable Prices</strong>
                  <p className="text-[14px] text-gray-600">Quality groceries at unbeatable prices.</p>
                </div>
              </li>
              <li className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-sm">
                  <FiHeart size={24} />
                </div>
                <div>
                  <strong className="block text-[18px] text-gray-800 font-semibold mb-0.5">Trusted by Thousands</strong>
                  <p className="text-[14px] text-gray-600">Loved by 10,000+ happy customers.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
