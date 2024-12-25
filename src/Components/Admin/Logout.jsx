import React, { useContext, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { AppContext } from '../../Utils/IsAdmin';
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const { isAuth, setIsAuth } = useContext(AppContext); // Assuming setIsAuth is available
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/admin/logout`,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Clear localStorage
      window.localStorage.removeItem('accessToken');
      window.localStorage.removeItem('refreshToken');

      // Update authentication state
      setIsAuth(false);
      navigate("/");
      toast.success(response?.data?.message || 'Logout successful!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Logout failed!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleLogout}
        disabled={isLoading}
        className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 disabled:bg-gray-400 font-semibold"
      >
        {isLoading ? 'Logging Out...' : 'Logout'}
      </button>
      <Toaster />
    </>
  );
};

export default Logout;
