import React, { useState, useEffect } from "react";
import API from "../api";
import { ProductsContext } from "./productsContextValue";

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await API.get("/products");

      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ADD PRODUCT
  const addProduct = async (productData) => {
    try {
      const token = localStorage.getItem("token");

      await API.post("/products", productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // EDIT PRODUCT
  const editProduct = async (id, updatedData) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(`/products/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // TOGGLE STOCK
  const toggleStockStatus = async (id) => {
    try {
      const product = products.find(
        (p) => p._id === id
      );

      if (!product) return;

      const token = localStorage.getItem("token");

      await API.put(
        `/products/${id}`,
        {
          inStock: !product.inStock,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchProducts();
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        fetchProducts,
        addProduct,
        editProduct,
        deleteProduct,
        toggleStockStatus,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};