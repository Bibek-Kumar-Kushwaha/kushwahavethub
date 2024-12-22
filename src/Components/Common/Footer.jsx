import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-400 text-center py-2 sticky bottom-0">
      <h1 className="text-3xl font-extrabold tracking-tight">
        <span className="text-white">Kushwaha </span>
        <span className="text-yellow-300">Pharma</span>
      </h1>
      <div className="font-bold text-red-700 mt-1">+977 9862804223</div>
      <div className="mt-1 text-sm text-gray-700">
        © {new Date().getFullYear()} Kushwaha Pharma. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
