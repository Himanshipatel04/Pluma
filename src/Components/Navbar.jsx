import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    let userData = localStorage.getItem("user");
    userData = JSON.parse(userData);
    setUser(userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logout Successfully");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="bg-gradient-to-br from-white via-white to-pink-200 shadow-md px-6 fixed bg-blend-overlay w-full h-[10vh]">
      <div className="flex items-center justify-between">
        <Link
          to={"/"}
          className="h-20 w-44 ml-10 items-center justify-center flex"
        >
          <img className="h-16" src={logo} alt="Logo" />
        </Link>
        <div className="hidden md:flex items-center text-[#ba438a]">
          <ul className="flex space-x-28 font-medium text-xl">
            <li>
              <Link
                to={"/"}
                className=" hover:bg-pink-100 px-3 rounded-md py-1 duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={"/blogs"}
                className=" hover:bg-pink-100 px-3 rounded-md py-1 duration-200"
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                to={"/aboutus"}
                className=" hover:bg-pink-100 px-3 rounded-md py-1 duration-200"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to={"/contact"}
                className=" hover:bg-pink-100 px-3 rounded-md py-1"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        {user ? (
          <>
            <div className="flex items-center gap-4">
              <button
                onClick={handleLogout}
                className="bg-[#ba438a] text-white px-4 py-2 rounded-md hover:bg-[#b03980] duration-200"
              >
                Logout
              </button>
              {user.role === "admin" ? (
                <Link
                  to="/adminDashboard"
                  className="text-[#ba438a] font-semibold text-lg hover:text-[#922d69] duration-200"
                >
                  <FaUserCircle className="text-4xl" />
                </Link>
              ) : (
                <Link
                  to={`/profile/${user._id}`}
                  className="text-[#ba438a] font-semibold text-lg hover:text-[#922d69] duration-200"
                >
                  <FaUserCircle className="text-4xl" />
                </Link>
              )}
            </div>
          </>
        ) : (
          <div className="">
            <Link
              to="/login"
              className="px-4 py-3 bg-[#ba438a] text-center rounded-md font-semibold text-white hover:bg-[#922d69] hover:scale-95 transition"
            >
              Login / Signup
            </Link>
          </div>
        )}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
          >
            <div className="space-y-1">
              <div className="w-6 h-0.5 bg-gray-700"></div>
              <div className="w-6 h-0.5 bg-gray-700"></div>
              <div className="w-6 h-0.5 bg-gray-700"></div>
            </div>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4 text-gray-700 font-medium">
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-600">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-600">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/college" className="hover:text-blue-600">
                College
              </Link>
            </li>
          </ul>
          <div className="space-y-2 pt-2">
            <button className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-100 transition">
              Sign Up
            </button>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
