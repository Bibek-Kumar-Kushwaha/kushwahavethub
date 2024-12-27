import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const ViewProduct = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/product/view/${id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setProductData(response.data.data.product); // Assuming you want to show the first product
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch product details");
        toast.error(err.response?.data?.message || "Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <p className="text-green-500 text-xl text-center mt-10">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-xl text-center mt-10">{error}</p>;
  }

  const {
    productImage,
    productName,
    categoryName,
    supplierName,
    costPrice,
    sellingPrice,
    markPrice,
    stockQuantity,
    expiryDate,
    description,
    createdAt,
    updatedAt,
  } = productData;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">Product Details</h1>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 space-y-6">
        {/* Product Image */}
        <div className="flex justify-center">

            {/* For Image */}
          {/* <div className="w-32 h-32 bg-gray-300 rounded-lg flex items-center justify-center">
            {productImage?.secure_url ? (
              <img
                src={productImage.secure_url}
                alt={productName}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <span className="text-lg font-bold text-purple-800 uppercase">No Image</span>
            )}
          </div> */}
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <p>
            <span className="font-bold">Product Name:</span> {productName}
          </p>
          <p>
            <span className="font-bold">Category:</span> {categoryName}
          </p>
          <p>
            <span className="font-bold">Supplier:</span> {supplierName}
          </p>
          <p>
            <span className="font-bold">Cost Price:</span> ${costPrice}
          </p>
          <p>
            <span className="font-bold">Selling Price:</span> ${sellingPrice}
          </p>
          <p>
            <span className="font-bold">markPrice:</span> ${markPrice}
          </p>
          <p>
            <span className="font-bold">Stock Quantity:</span> {stockQuantity}
          </p>
          <p>
            <span className="font-bold">Expiry Date:</span> {expiryDate ? new Date(expiryDate).toLocaleDateString() : "N/A"}
          </p>
          <p>
            <span className="font-bold">Description:</span> {description}
          </p>
        </div>

        {/* Timestamps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p>
            <span className="font-bold">Created At:</span> {new Date(createdAt).toLocaleDateString()}
          </p>
          <p>
            <span className="font-bold">Updated At:</span> {new Date(updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default ViewProduct;
