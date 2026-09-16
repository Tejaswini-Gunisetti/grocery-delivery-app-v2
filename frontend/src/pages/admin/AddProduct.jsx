import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/useProducts';
import Toast from '../../components/Toast';

const AddProduct = () => {
  const { addProduct } = useProducts();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Vegetables');
  const [price, setPrice] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [rating, setRating] = useState(4.5);
  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageBase64) {
      setToastMsg("Please upload a product image!");
      setShowToast(true);
      return;
    }

    const priceNum = Number(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      setToastMsg("Please enter a valid price!");
      setShowToast(true);
      return;
    }

    await addProduct({
      name,
      description,
      category,
      price: priceNum,
      originalPrice: priceNum,
      rating: Number(rating),
      image: imageBase64,
      inStock: true
    });

    setToastMsg("Product added successfully!");
    setShowToast(true);

    setTimeout(() => {
      navigate('/admin/list');
    }, 1500);
  };

  return (
    <div className="p-10 max-md:p-6">
      <Toast message={toastMsg} show={showToast} onClose={() => setShowToast(false)} />
      <h2 className="text-[20px] font-bold text-gray-800 mb-8 uppercase tracking-wide">Add Product</h2>

      <form onSubmit={handleSubmit} className="max-w-[700px] flex flex-col gap-6 bg-white p-8 rounded-xl border border-gray-200 shadow-md">
        <div>
          <label className="block text-[14px] font-bold text-gray-700 mb-3 uppercase tracking-wider">Upload Image</label>
          <label className="w-28 h-28 border-[2px] border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors overflow-hidden">
            {imagePreview ? (
              <img src={imagePreview} alt="Selected product" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-400 text-[14px] font-bold">Upload</span>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </label>
        </div>

        <div>
          <label className="block text-[14px] font-bold text-gray-700 mb-3 uppercase tracking-wider">Product name</label>
          <input
            type="text"
            placeholder="Type name here"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input shadow-sm"
          />
        </div>

        <div>
          <label className="block text-[14px] font-bold text-gray-700 mb-3 uppercase tracking-wider">Product description</label>
          <textarea
            placeholder="Type description here"
            rows="4"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-input shadow-sm resize-none"
          ></textarea>
        </div>

        <div className="flex gap-6 max-sm:flex-col">
          <div className="flex-1">
            <label className="block text-[14px] font-bold text-gray-700 mb-3 uppercase tracking-wider">Product category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-input shadow-sm bg-white cursor-pointer px-4 font-semibold"
            >
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Dairy">Dairy</option>
              <option value="Drinks">Drinks</option>
              <option value="Instant Food">Instant Food</option>
              <option value="Bakery">Bakery</option>
              <option value="Grains">Grains</option>
            </select>
          </div>
          <div className="flex-1">
  <label className="block text-[14px] font-bold text-gray-700 mb-3 uppercase tracking-wider">
    Product Price (₹)
  </label>

  <input
    type="number"
    placeholder="e.g. 25"
    required
    value={price}
    onChange={(e) => setPrice(e.target.value)}
    className="form-input shadow-sm"
  />

  <label className="block text-[14px] font-bold text-gray-700 mt-4 mb-3 uppercase tracking-wider">
    Product Rating (0 - 5)
  </label>

  <input
    type="number"
    min="0"
    max="5"
    step="0.1"
    required
    value={rating}
    onChange={(e) => setRating(e.target.value)}
    className="form-input shadow-sm"
  />
</div>
        </div>

        <button type="submit" className="bg-primary text-white font-bold py-3 px-8 rounded-md hover:bg-primary-hover transition-all duration-200 mt-4 w-[160px] text-[15px] shadow-md hover:shadow-lg shadow-green-100">ADD</button>
      </form>
    </div>
  );
};

export default AddProduct;
