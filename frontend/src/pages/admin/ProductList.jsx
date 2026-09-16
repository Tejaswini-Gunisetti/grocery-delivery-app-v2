import React, { useState } from 'react';
import { useProducts } from '../../context/useProducts';
import { FiX, FiEdit2, FiTrash2, FiAlertCircle } from 'react-icons/fi';
import { formatCurrency } from '../../utils/helpers';
import Toast from '../../components/Toast';

const ProductList = () => {
  const { products, editProduct, deleteProduct, toggleStockStatus } = useProducts();

  // Modals state
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);

  // Toast state
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Edit Form Fields State
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editImagePreview, setEditImagePreview] = useState('');
  const [editImageBase64, setEditImageBase64] = useState('');

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
  };

  const handleStartEdit = (product) => {
    setEditingProduct(product);
    setEditName(product.name);
    setEditDescription(product.description || '');
    setEditCategory(product.category);
    setEditPrice(product.price);
    setEditImagePreview(product.image);
    setEditImageBase64(''); // If they upload a new one, this gets filled
  };

  const handleEditImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setEditImagePreview(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.onloadend = () => {
      setEditImageBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    const priceNum = Number(editPrice);
    if (isNaN(priceNum) || priceNum <= 0) {
      triggerToast("Please enter a valid price!");
      return;
    }

    const updatedData = {
      name: editName,
      description: editDescription,
      category: editCategory,
      price: priceNum,
      originalPrice: priceNum
    };

    if (editImageBase64) {
      updatedData.image = editImageBase64;
    }

    editProduct(editingProduct._id, updatedData);
    setEditingProduct(null);
    triggerToast("Product updated successfully!");
  };

  const handleStartDelete = (product) => {
    setDeletingProduct(product);
  };

  const handleConfirmDelete = () => {
    if (!deletingProduct) return;
    deleteProduct(deletingProduct._id);
    setDeletingProduct(null);
    triggerToast("Product deleted successfully!");
  };
  console.log("PRODUCTS:", products);
  return (
    <div className="p-10 max-md:p-6 min-h-screen">
      <Toast message={toastMsg} show={showToast} onClose={() => setShowToast(false)} />

      <h2 className="text-[20px] font-bold text-gray-800 mb-8 uppercase tracking-wide">All Products List</h2>

      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto shadow-md">
        <div className="grid min-w-[800px] grid-cols-[80px_2fr_1.2fr_1.2fr_1.5fr_100px] gap-6 p-4 border-b border-gray-200 bg-gray-50 font-bold text-[13px] text-gray-600 tracking-wide uppercase">
          <div>Image</div>
          <div>Name</div>
          <div>Category</div>
          <div>Price</div>
          <div>Stock Status</div>
          <div className="text-center">Action</div>
        </div>

        <div className="flex flex-col">
          {products.length > 0 ? (
            products.map(product => (
              <div key={product._id} className="grid min-w-[800px] grid-cols-[80px_2fr_1.2fr_1.2fr_1.5fr_100px] gap-6 p-4 items-center border-b border-gray-100 last:border-b-0 text-[14px] text-gray-600 font-semibold hover:bg-green-50/20 transition-colors">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-14 h-14 rounded-md object-contain bg-gray-50 p-1 border border-gray-200 shrink-0"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?w=160&q=80";
                  }}
                />
                <div className="font-bold text-gray-800 line-clamp-1">{product.name}</div>
                <div className="text-gray-500 capitalize">{product.category}</div>
                <div className="text-gray-800 font-bold">{formatCurrency(product.price)}</div>

                {/* Stock Toggle Switch */}
                <div className="flex items-center">
                  <button
                    onClick={() => {
                      toggleStockStatus(product._id);
                      triggerToast(`Product status updated to ${product.inStock !== false ? 'Out of Stock' : 'Available'}`);
                    }}
                    className={`w-12 h-6 rounded-full relative transition-colors focus:outline-none shadow-inner cursor-pointer ${product.inStock !== false ? 'bg-primary' : 'bg-gray-300'
                      }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm transition-all duration-200 ${product.inStock !== false ? 'right-0.5' : 'left-0.5'
                        }`}
                    ></div>
                  </button>
                  <span className={`text-[12px] font-bold ml-2.5 ${product.inStock !== false ? 'text-primary' : 'text-gray-400'}`}>
                    {product.inStock !== false ? 'Available' : 'Out of Stock'}
                  </span>
                </div>

                {/* Actions */}
                <div className="text-center flex justify-center gap-2">
                  <button
                    className="text-primary hover:bg-green-50 p-2 rounded-full transition-colors active:scale-95"
                    onClick={() => handleStartEdit(product)}
                  >
                    <FiEdit2 size={16} />
                  </button>
                  <button
                    className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors active:scale-95"
                    onClick={() => handleStartDelete(product)}
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-10 text-center text-gray-500 font-medium">No products in catalog. Add some first!</div>
          )}
        </div>
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-2xl max-w-[650px] w-full max-h-[90vh] overflow-y-auto p-8 relative">
            <button
              className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
              onClick={() => setEditingProduct(null)}
            >
              <FiX size={20} />
            </button>

            <h3 className="text-[20px] font-bold text-gray-800 mb-6 uppercase tracking-wide">Edit Product</h3>

            <form onSubmit={handleSaveEdit} className="flex flex-col gap-5">
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2 uppercase tracking-wider">Product Image</label>
                <label className="w-24 h-24 border-[2px] border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors overflow-hidden">
                  <img src={editImagePreview} alt="Selected" className="w-full h-full object-cover" />
                  <input type="file" accept="image/*" className="hidden" onChange={handleEditImageChange} />
                </label>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2 uppercase tracking-wider">Product Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                  className="form-input bg-gray-50/50 font-semibold"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-2 uppercase tracking-wider">Description</label>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows="3"
                  required
                  className="form-input bg-gray-50/50 resize-none font-semibold"
                />
              </div>

              <div className="flex gap-4 max-sm:flex-col">
                <div className="flex-1">
                  <label className="block text-[13px] font-bold text-gray-700 mb-2 uppercase tracking-wider">Category</label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="form-input bg-white font-semibold cursor-pointer"
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
                  <label className="block text-[13px] font-bold text-gray-700 mb-2 uppercase tracking-wider">Price (₹)</label>
                  <input
                    type="number"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    required
                    className="form-input bg-gray-50/50 font-semibold"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg transition-colors text-[14px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg transition-colors text-[14px] shadow-md shadow-green-100"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-gray-100 flex flex-col items-center text-center">
            <FiAlertCircle className="text-red-500 mb-4" size={42} />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Delete Product</h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete <span className="font-bold text-gray-700">"{deletingProduct.name}"</span>? This action cannot be undone.
            </p>

            <div className="flex gap-3 w-full">
              <button
                onClick={() => setDeletingProduct(null)}
                className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg transition-colors text-sm"
              >
                No, Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-colors text-sm shadow-md shadow-red-100"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
