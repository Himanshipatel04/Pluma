import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen  w-full bg-gradient-to-br from-white via-pink-50 to-pink-100 flex items-center justify-center px-6">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-20 md:mt-0">
        {/* Left: Text Content */}
        <div className="space-y-10 text-center md:text-left px-2 md:px-0">
          <motion.p
            className="text-sm md:text-base uppercase tracking-widest text-[#b03980] font-semibold"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Your Creative Space
          </motion.p>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <span className="text-[#b03980]">Welcome to</span> Pluma
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-xl mx-auto md:mx-0"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            A beautiful platform to{" "}
            <span className="text-[#b03980] font-semibold">
              write, share, and connect.
            </span>
            Experience the joy of blogging with elegant tools and a vibrant
            community where your voice matters.
          </motion.p>

         <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">    
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.3 }}
          >
            <Link
              to={"/create-blog"}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#b03980] text-white text-lg font-semibold hover:bg-[#9b2d70] transition duration-300 shadow-lg hover:scale-105"
            >
              Write your first blog
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.3 }}
          >
            <Link
              to={"/blogs"}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#b03980] text-white text-lg font-semibold hover:bg-[#9b2d70] transition duration-300 shadow-lg hover:scale-105"
            >
              Explore Blogs 
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </motion.div>
         </div>
        </div>

        {/* Right: Illustration */}
        <motion.div
          className="w-full flex justify-center"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <img
            src="https://illustrations.popsy.co/pink/digital-nomad.svg"
            alt="Blogging illustration"
            className="w-full max-w-md"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
