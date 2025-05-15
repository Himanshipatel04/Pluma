import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { BiLoader } from "react-icons/bi";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Add this state
  const [formData, setFormData] = useState({
    role: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.role || !formData.email || !formData.password) {
      toast.error("Please fill in all fields", {
        className: "bg-red-600 text-white font-semibold rounded-md",
      });
      setLoading(false);
      return;
    } else if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters", {
        className: "bg-red-600 text-white font-semibold rounded-md",
      });
      setLoading(false);
      return;
    } else if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email", {
        className: "bg-red-600 text-white font-semibold rounded-md",
      });
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "https://pluma-backend.onrender.com/api/v1/users/login",
        formData
      );

      console.log(res.data);

      if (res.status === 200) {
        toast.success("Login successful!");
        localStorage.setItem("user", JSON.stringify(res.data.user));
        if (res.data.user.role === "admin") {
          navigate("/adminDashboard");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          navigate("/");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      }
    } catch (err) {
      toast.error(
        "Login failed: " + (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-fit flex justify-center items-center py-16 md:py-20">
      <motion.div
        className="w-full flex justify-center items-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form
          onSubmit={handleSubmit}
          className="w-[85%] md:w-[25%] flex flex-col gap-4 p-4 border-2 rounded-xl mt-10 md:24"
        >
          <div className="flex justify-center items-center flex-col gap-4">
            <img src={logo} alt="Logo" className="h-24" />
            <p className="text-2xl font-semibold text-center w-full uppercase text-gray-600">
              Login
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="role" className="font-semibold text-gray-600">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full py-1 border-2 border-gray-400 font-semibold rounded-md indent-2 focus:border-[#b03980] outline-none"
            >
              <option value="">Select Role</option>
              <option value="faculty">Admin</option>
              <option value="CEO">User</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold text-gray-600">
              Email
            </label>
            <input
              name="email"
              required
              placeholder="Enter your email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full py-1 font-semibold border-2 border-gray-400 rounded-md indent-2 focus:border-[#b03980] outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold text-gray-600">
              Password
            </label>
            <input
              name="password"
              required
              placeholder="Enter Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full py-1 font-semibold border-2 border-gray-400 rounded-md indent-2 focus:border-[#b03980]  outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#b03980] rounded-3xl text-xl text-white flex justify-center items-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <BiLoader size={24} className="animate-spin" />
              </>
            ) : (
              "Login"
            )}
          </button>

          <Link
            to="/register"
            className="w-full text-center font-semibold text-gray-600"
          >
            Don’t have an account?{" "}
            <span className="text-[#b03980]">Register</span>
          </Link>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
