import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { AppContext } from '../../Utils/IsAdmin';
import { useNavigate } from 'react-router-dom';

const CreditList = () => {
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const { isAuth, setIsAuth } = useContext(AppContext);

    useEffect(() => {
      if (!isAuth) {
        navigate("/login");
      }
    }, [isAuth, navigate]);
  
  useEffect(() => {
    const fetchCredits = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/credit/get/all`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setCredits(response.data.data.creditDetails);
        toast.success(response?.data?.message || 'All Credit Fetched');
        setLoading(false);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch admin profile");
        setError(error.response?.data?.message || "Failed to fetch admin profile");
      } finally {
        setLoading(false);
      }
    };
    if (isAuth) {
      fetchCredits();
    }
  }, [isAuth]);

  if (loading) {
    return <p className="text-green-500 text-xl">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-xl">{error}</p>;
  }

  if (!credits) {
    return <p className="text-red-500 text-xl">No admin data available</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-purple-600 mb-8">Credit Data</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {credits.map((credit) => (
            <div
              key={credit._id}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{credit.name}</h2>
              <p className="text-gray-700">
                <span className="font-medium">Credit Amount:</span> Rs {credit.creditAmount}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Paid Amount:</span> Rs {credit.paidAmount}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Sell Amount:</span> Rs {credit.sellAmount}
              </p>
            </div>
          ))}
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default CreditList;
