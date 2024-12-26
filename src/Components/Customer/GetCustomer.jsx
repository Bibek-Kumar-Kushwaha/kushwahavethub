import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AppContext } from '../../Utils/IsAdmin';
import { useNavigate } from 'react-router-dom';

const GetCustomer = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuth, setIsAuth } = useContext(AppContext);
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

    useEffect(() => {
      if (!isAuth) {
        navigate("/login");
      }
    }, [isAuth, navigate]);
  
  useEffect(() => {
    setLoading(true);
    setError("");
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/user/get/all`,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        setUsers(response.data.data.allUser);
        toast.success(response?.data?.message || 'All Customer Profiles Fetched');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to fetch Customers');
        setError(err.response?.data?.message || 'Failed to fetch Customers');
      } finally {
        setLoading(false);
      }
    };
    if (isAuth) {
      fetchUsers();
    }
  }, [isAuth]);

  if (loading) {
    return <p className="text-green-500 text-xl">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-xl">{error}</p>;
  }

  if (!users.length) {
    return <p className="text-red-500 text-xl">No User data available</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-semibold">
      <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">Customer List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user._id} className="bg-white shadow-lg rounded-lg p-4">
            {/* Header Section */}
            <div className="flex items-center mb-4 border-b pb-4">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
                {user.avatar?.secure_url ? (
                  <img
                    src={user.avatar.secure_url}
                    alt={user.name}
                    className="w-full h-full rounded-full"
                  />
                ) : (
                  <span className="text-lg font-bold text-purple-800 uppercase">{user.name[0]}</span>
                )}
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold uppercase text-purple-800">{user.name}</h2>
                <p className="text-sm text-gray-600">{user.email || 'No Email'}</p>
              </div>
            </div>

            {/* Details Section */}
            <div className="text-sm space-y-2">
              <p>
                <span className="font-bold">Phone:</span> {user.phone || 'N/A'}
              </p>
              <p>
                <span className="font-bold">Address:</span> {user.address || 'N/A'}
              </p>
              <p>
                <span className="font-bold">Role:</span> {user.role}
              </p>
              <p>
                <span className="font-bold">Created At:</span>{' '}
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
              <p>
                <span className="font-bold">Updated At:</span>{' '}
                {new Date(user.updatedAt).toLocaleDateString()}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-4">
              <Link
                to={`/customer/view/${user._id}`}
                className="flex items-center px-4 py-2 text-green-500 border border-green-500 rounded-md hover:bg-green-500 hover:text-white transition"
              >
                <FaEye className="mr-2" />
                View
              </Link>
              <div className="flex space-x-2">
                <Link
                  to={`/customer/update/${user._id}`}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition"
                >
                  <FaEdit className="mr-2" />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition"
                >
                  <FaTrash className="mr-2" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        <Toaster />
      </div>
    </div>
  );
};

export default GetCustomer;