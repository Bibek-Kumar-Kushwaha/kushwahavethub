import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { AppContext } from '../../Utils/IsAdmin';
import { useNavigate } from 'react-router-dom';

const GetProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const { isAuth, setIsAuth } = useContext(AppContext);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/product/get/all`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setProducts(response.data.data.allProduct);
        setLoading(false);
        toast.success(response?.data?.message || 'All Product Fetched');
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch admin profile");
        setError(error.response?.data?.message || "Failed to fetch admin profile");
      } finally {
        setLoading(false);
      }
    };
    if (isAuth) {
      fetchProducts();
    }
  }, [isAuth]);

  if (!isAuth) {
    navigate("/");
  }

  const handleView = (id) => {
    console.log(`View product with ID: ${id}`);
    // Add logic for viewing a product
  };

  const handleDelete = async (id) => {
    console.log(`delete item ${id}`)
  };

  if (loading) {
    return <p className="text-green-500 text-xl">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-xl">{error}</p>;
  }

  if (!products) {
    return <p className="text-red-500 text-xl">No admin data available</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-purple-600 mb-8">All Products</h1>
        {products.length === 0 ? (
          <p className="text-center text-gray-600">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105"
              >
                <img
                  src={product.productImage.secure_url || 'https://via.placeholder.com/150'}
                  alt={product.productName}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <div className="mt-4">
                  <h2 className="text-xl font-bold text-gray-800">{product.productName}</h2>
                  <p className="text-gray-600">{product.categoryName}</p>
                  <p className="text-gray-600">
                    Supplier: <span className="font-medium">{product.supplierName}</span>
                  </p>
                  <p className="text-green-600 font-semibold">₹{product.sellingPrice}</p>
                  <p className="text-gray-500 text-sm mt-2">
                    {product.description || 'No description available'}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Stock: {product.stockQuantity > 0 ? product.stockQuantity : 'Out of stock'}
                  </p>
                  <div className="flex space-x-2 mt-4">
                    {/* View Button */}
                    <button
                      onClick={() => handleView(product._id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      View
                    </button>

                    {/* Edit Button */}
                    <Link
                      to={`/product/update/${product._id}`}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                    >
                      Edit
                    </Link>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <Toaster />
      </div>
    </div>
  );
};
export default GetProduct;