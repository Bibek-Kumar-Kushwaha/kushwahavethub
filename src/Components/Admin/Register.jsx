import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AppContext } from '../../Utils/IsAdmin';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const { isAuth, setIsAuth } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  // useEffect(() => {
  //    if(isAuth){
  //     navigate('/')
  //    }
  // })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/admin/register`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
      })
      toast.success(response?.data?.message || "Admin registered successfully!");
      navigate("/admin/get");
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 font-semibold capitalize">
      <form
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-extrabold text-purple-600 mb-6 text-center">Register As Admin</h2>

        {error && <p className="text-red-500 text-2xl mb-4">{error}</p>}

        {/* Name */}
        <div className="mb-2">
          <label className="block text-gray-700" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/*  Email*/}
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="email">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 lowercase"
            required
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="phone">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Enter your phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-gray-500"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full px-6 py-3 text-white font-semibold rounded-lg shadow-lg transition-transform duration-300 transform  ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
          disabled={loading}
        >
          {loading ? "Registering...." : "Register"}
        </button>
        <div className="text-center mt-3">
          <p>
            Already have an account?{' '}
            <Link
              className="text-purple-700 hover:underline transition-colors duration-200 font-bold"
              to="/login"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default Register;