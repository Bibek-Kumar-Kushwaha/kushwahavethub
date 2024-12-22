import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const AddCustomer = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        role: 'CUSTOMER', // Default role
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/user/add`,
                formData);
            toast.success('Customer added successfully!');
            console.log(response.data); // Handle response
            setFormData({ name: '', phone: '', address: '', role: 'CUSTOMER' }); // Reset form
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to add customer';
            toast.error(errorMessage);
            console.error(errorMessage);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-200 to-green-200 flex items-center justify-center py-10">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
                <h1 className="text-2xl font-bold text-blue-500 mb-4 text-center">Add Customer</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter customer name"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="Enter phone number"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                        <textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            placeholder="Enter address"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                    </div>

                    {/* Role (Hidden Input) */}
                    <input type="hidden" name="role" value="CUSTOMER" />

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                        >
                            Add Customer
                        </button>
                    </div>
                </form>
            </div>
            <Toaster />
        </div>
    );
};

export default AddCustomer;
