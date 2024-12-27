import React, { useContext, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { AppContext } from '../../Utils/IsAdmin';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const { setIsAuth } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/admin/logout`,
        {},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Clear localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      // Update authentication state and navigate
      setIsAuth(false);
      toast.success(response?.data?.message || 'Logout successful!');
      navigate('/login');
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Something went wrong during logout.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleLogout}
        disabled={isLoading}
        className={`px-4 py-2 rounded-lg shadow-md font-semibold transition-colors duration-300 ${
          isLoading
            ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
            : 'bg-red-600 text-white hover:bg-red-700'
        }`}
      >
        {isLoading ? 'Logging Out...' : 'Logout'}
      </button>
      <Toaster />
    </>
  );
};

export default Logout;
