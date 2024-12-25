import React, { useState } from 'react';

const CreateInvoice = () => {
  const [products, setProducts] = useState([
    { id: 1, name: '', quantity: 1, rate: 0, amount: 0 },
  ]);

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = field === 'quantity' || field === 'rate' 
      ? Number(value) 
      : value;
    updatedProducts[index].amount = updatedProducts[index].quantity * updatedProducts[index].rate;
    setProducts(updatedProducts);
  };

  const addProduct = () => {
    setProducts([...products, { id: products.length + 1, name: '', quantity: 1, rate: 0, amount: 0 }]);
  };

  return (
    <div className="p-6 bg-gray-100">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">Kushwaha Pharma</h1>
        <h2 className="text-lg">Godaita-5, Sarlahi</h2>
      </div>

      {/* Company Info */}
      <div className="flex justify-between mb-4">
        <div className="text-gray-600">Pan Number: 123456789</div>
        <div className="text-gray-600">Logo</div>
      </div>

      <hr className="h-1 bg-red-700 mb-4" />

      {/* Customer and Bill Info */}
      <div className="flex justify-between mb-4">
        <div>
          <div>Name: Customer Name</div>
          <div>Phone: 9876543210</div>
          <div>Address: Customer Address</div>
        </div>
        <div>
          <div>Bill No: 001</div>
          <div>Date: {new Date().toLocaleDateString()}</div>
          <div>ID: INV1234</div>
        </div>
      </div>

      <hr className="h-1 bg-red-700 mb-4" />

      {/* Invoice Title */}
      <div className="text-center text-xl font-semibold mb-4">INVOICE</div>

      {/* Product Table */}
      <div className="bg-white p-4 shadow-md rounded-md">
        <div className="grid grid-cols-5 font-bold border-b border-gray-300 pb-2 mb-2">
          <div>SN</div>
          <div>Product Name</div>
          <div>Quantity</div>
          <div>Rate</div>
          <div>Amount</div>
        </div>
        {products.map((product, index) => (
          <div key={product.id} className="grid grid-cols-5 items-center gap-2 mb-2">
            <div>{index + 1}</div>
            <input
              type="text"
              placeholder="Product Name"
              value={product.name}
              onChange={(e) => handleProductChange(index, 'name', e.target.value)}
              className="border p-1 rounded"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={product.quantity}
              onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
              className="border p-1 rounded"
            />
            <input
              type="number"
              placeholder="Rate"
              value={product.rate}
              onChange={(e) => handleProductChange(index, 'rate', e.target.value)}
              className="border p-1 rounded"
            />
            <div>{product.amount}</div>
          </div>
        ))}
        <button
          onClick={addProduct}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default CreateInvoice;
