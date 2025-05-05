import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios"; // Import Axios
import { toast } from "react-toastify";
import { BiLoader } from "react-icons/bi";

const Register = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [name, setName] = useState(""); // State for Name
  const [email, setEmail] = useState(""); // State for Email
  const [password, setPassword] = useState(""); // State for Password
  const [loading, setLoading] = useState(false); // State for loading indicator

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !email || !password) {
      toast.error("Please fill in all fields", {
        className: "bg-red-600 text-white font-semibold rounded-md",
      });
      setLoading(false);
      return;
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters", {
        className: "bg-red-600 text-white font-semibold rounded-md",
      });
      setLoading(false);
      return;
    } else if (!email.includes("@")) {
      toast.error("Please enter a valid email", {
        className: "bg-red-600 text-white font-semibold rounded-md",
      });
      setLoading(false);
      return;
    }

    const userData = {
      name,
      email,
      password,
      role: "user",
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/users/register",
        userData
      );

      if (response.status === 201) {
        toast.success("Registration successful!", {
          className: "bg-green-600 text-white font-semibold rounded-md",
        });
        setTimeout(() => navigate("/login"), 2000); // slight delay to show toast
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed", {
        className: "bg-red-600 text-white font-semibold rounded-md",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20 flex justify-center items-center">
      <motion.div
        className="w-full flex justify-center items-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form
          onSubmit={handleSubmit}
          className="w-[25%] flex flex-col gap-4 p-3 border-2 rounded-xl mt-24"
        >
          <div className="flex justify-center items-center flex-col gap-4">
            <img src={logo} alt="" className="h-24" />
            <p className="text-2xl font-semibold text-center w-full uppercase text-gray-600">
              Register
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-semibold text-gray-600">
              Name
            </label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              type="text"
              className="w-full py-1 font-semibold border-2 border-gray-400 rounded-md indent-2 focus:border-[#b03980] outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold text-gray-600">
              Email
            </label>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              type="email"
              className="w-full py-1 font-semibold border-2 border-gray-400 rounded-md indent-2 focus:border-[#b03980] outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold text-gray-600">
              Password
            </label>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              type="password"
              className="w-full py-1 font-semibold border-2 border-gray-400 rounded-md indent-2 focus:border-[#b03980] outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#b03980] rounded-3xl text-xl text-white"
            disabled={loading}
          >
            {loading ? (
              <p className="flex items-center justify-center">
                <BiLoader size={24} className="animate-spin" />
              </p>
            ) : (
              "Register"
            )}
          </button>
          <Link
            to={"/login"}
            className="w-full text-center font-semibold text-gray-600"
          >
            Don't have an account ?{" "}
            <span className="text-[#b03980]">Login</span>
          </Link>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
