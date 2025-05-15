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
    <div className="bg-gradient-to-br from-white via-white to-pink-200 shadow-md px-6 fixed w-full h-[7vh] md:h-[10vh] z-50">
      <div className="flex items-center justify-between h-full">
        {/* Logo */}
        <Link
          to="/"
          className="h-20 w-fit ml-2 md:ml-24 flex items-center justify-center"
        >
          <img className="h-12 md:h-16" src={logo} alt="Logo" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center text-[#ba438a]">
          <ul className="flex space-x-6 font-medium text-lg">
            <li><Link to="/" className="hover:bg-pink-100 px-3 py-1 rounded-md duration-200">Home</Link></li>
            <li><Link to="/blogs" className="hover:bg-pink-100 px-3 py-1 rounded-md duration-200">Blogs</Link></li>
            <li><Link to="/aboutus" className="hover:bg-pink-100 px-3 py-1 rounded-md duration-200">About Us</Link></li>
            <li><Link to="/contact" className="hover:bg-pink-100 px-3 py-1 rounded-md duration-200">Contact</Link></li>
          </ul>
        </div>

        {/* User / Auth Buttons */}
        {user ? (
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="bg-[#ba438a] hidden md:block text-white px-4 py-2 rounded-md hover:bg-[#b03980] duration-200"
            >
              Logout
            </button>
            <Link
              to={user.role === "admin" ? "/adminDashboard" : `/profile/${user.id}`}
              className="text-[#ba438a] hidden md:block font-semibold text-lg hover:text-[#922d69] duration-200"
            >
              <FaUserCircle className="text-3xl" />
            </Link>
          </div>
        ) : (
          <div className="hidden md:block">
            <Link
              to="/login"
              className="px-4 py-3 bg-[#ba438a] text-white rounded-md font-semibold hover:bg-[#922d69] hover:scale-95 transition"
            >
              Login / Signup
            </Link>
          </div>
        )}

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(true)} className="focus:outline-none">
            <div className="space-y-1">
              <div className="w-6 h-0.5 bg-gray-700"></div>
              <div className="w-6 h-0.5 bg-gray-700"></div>
              <div className="w-6 h-0.5 bg-gray-700"></div>
            </div>
          </button>
        </div>
      </div>

      {/* Right Drawer */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={() => setMenuOpen(false)}
          ></div>

          {/* Drawer Panel */}
          <div className="fixed top-0 right-0 w-64 h-full bg-white z-50 shadow-lg p-6 transition-transform duration-300 transform translate-x-0">
            <div className="flex justify-end mb-6">
              <button onClick={() => setMenuOpen(false)} className="text-xl text-gray-600 font-bold">✕</button>
            </div>
            <ul className="space-y-4 font-medium text-gray-700">
              <li><Link to="/" className="hover:text-[#ba438a]" onClick={() => setMenuOpen(false)}>Home</Link></li>
              <li><Link to="/blogs" className="hover:text-[#ba438a]" onClick={() => setMenuOpen(false)}>Blogs</Link></li>
              <li><Link to="/aboutus" className="hover:text-[#ba438a]" onClick={() => setMenuOpen(false)}>About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[#ba438a]" onClick={() => setMenuOpen(false)}>Contact</Link></li>
            </ul>
            <div className="pt-6">
              {user ? (
                <>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="w-full bg-[#ba438a] text-white px-4 py-2 rounded-md hover:bg-[#b03980] duration-200"
                  >
                    Logout
                  </button>
                  <Link
                    to={user.role === "admin" ? "/adminDashboard" : `/profile/${user.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center mt-4 gap-2 text-[#ba438a] font-semibold"
                  >
                    <FaUserCircle className="text-2xl" />
                    Profile
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="block w-full px-4 py-2 border border-[#ba438a] text-[#ba438a] rounded hover:bg-pink-50 mt-4"
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block w-full px-4 py-2 bg-[#ba438a] text-white rounded hover:bg-[#922d69] mt-2"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
