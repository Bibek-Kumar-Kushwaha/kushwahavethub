import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Utils/IsAdmin";
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const { isAuth, setIsAuth } = useContext(AppContext);
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
    phone: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValues((values) => ({ ...values, [name]: value }));
  };

  // Handle form submission
  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/admin/login`,
        inputValues,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        // Store tokens in localStorage
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);

        // Reset form and context
        setInputValues({ email: "", password: "" });
        setIsAuth(true);

        // Redirect to dashboard
        navigate("/dashboard");
        toast.success(response?.data?.message);
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email or Phone</label>
          <input
            type="text"
            name="email"
            placeholder="Enter your email or phone"
            value={inputValues.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={inputValues.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-gray-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full text-white py-2 rounded ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <Toaster/>
    </div>
  );
};

export default Login;
