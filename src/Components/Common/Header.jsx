import React, { useContext } from 'react';
import Logout from '../Admin/Logout';
import { AppContext } from '../../Utils/IsAdmin';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const { isAuth } = useContext(AppContext);

  return (
    <header className="bg-gradient-to-r from-blue-500 to-green-500 text-white py-4 shadow-md sticky top-0">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          {/* Logo Icon */}
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-500 font-bold text-2xl">K</span>
          </div>
          {/* Logo Text */}
          <h1 className="text-3xl font-extrabold tracking-tight">
            <span className="text-white">Kushwaha </span>
            <span className="text-yellow-300">Pharma</span>
          </h1>
        </div>

        {/* Authentication Section */}
        <div>
          {isAuth ? (
            <Logout />
          ) : (
            <button
              onClick={() => navigate('/')}
              className="bg-purple-700 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-300"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
