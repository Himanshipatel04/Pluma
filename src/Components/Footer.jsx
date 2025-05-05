import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#000] text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Intro */}
          <div>
            <img
              src={logo}
              alt="Pluma Logo"
              className="h-16 mb-4"
            />
            <p className="text-sm text-gray-400">
              Pluma is your creative space to write, share, and connect. 
              A platform built for voices that want to be heard.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Navigation</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">Explore</li>
              <li className="hover:text-white cursor-pointer">About Us</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Features</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="hover:text-white cursor-pointer">Write</li>
              <li className="hover:text-white cursor-pointer">Share</li>
              <li className="hover:text-white cursor-pointer">Connect</li>
              <li className="hover:text-white cursor-pointer">Community</li>
            </ul>
          </div>

          {/* Social Icons */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <FaFacebookF
                className="text-gray-300 hover:text-white cursor-pointer"
                size={20}
              />
              <FaInstagram
                className="text-gray-300 hover:text-white cursor-pointer"
                size={20}
              />
              <FaTwitter
                className="text-gray-300 hover:text-white cursor-pointer"
                size={20}
              />
              <FaLinkedin
                className="text-gray-300 hover:text-white cursor-pointer"
                size={20}
              />
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-sm text-center text-gray-400">
          © {new Date().getFullYear()} Pluma. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
