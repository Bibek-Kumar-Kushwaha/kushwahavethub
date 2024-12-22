import React, { useContext, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { AppContext } from '../../Utils/IsAdmin';

const Logout = () => {
  const { isAuth, setIsAuth } = useContext(AppContext); // Assuming setIsAuth is available
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true); // Disable button during logout
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
    // localStorage.removeItemItem("accessToken", response.data.data.accessToken);
    // localStorage.removeItemItem("refreshToken", response.data.data.refreshToken);

      // Update authentication state
      setIsAuth(false);
      toast.success(response?.data?.message || 'Logout successful!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Logout failed!');
    } finally {
      setIsLoading(false); // Re-enable button
    }
  };

  return (
    <>
      <button
        onClick={handleLogout}
        disabled={isLoading}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400"
      >
        {isLoading ? 'Logging Out...' : 'Logout'}
      </button>
      <Toaster />
    </>
  );
};

export default Logout;
