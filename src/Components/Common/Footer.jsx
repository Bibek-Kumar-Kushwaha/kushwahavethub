import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-300 text-center py-2 sticky bottom-0 capitalize">
      <h1 className="text-3xl font-extrabold tracking-tight">
        <span className="text-black">Kushwaha </span>
        <span className="text-blue-700">VetHub</span>
      </h1>
      <div className="font-bold text-purple-700 mt-1">+977 9862804223</div>
      <div className="mt-1 text-sm text-gray-700">
        © {new Date().getFullYear()} Kushwaha VetHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
