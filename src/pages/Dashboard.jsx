import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category

  const toDateString = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:4000/api/v1/blogs");
        setBlogs(res.data.blogs || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Filter blogs based on search term and selected category
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? blog.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    "Personal",
    "Technology",
    "Health",
    "Travel",
    "Education",
    "Lifestyle",
    "Business",
    "Finance",
    "Food",
    "Entertainment",
    "Others",
  ];

  // Handle category click to toggle selection
  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null); // Deselect category if it's already selected
    } else {
      setSelectedCategory(category); // Select the category
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">
        All Blogs
      </h1>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search blogs by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-[#b03980]"
        />
      </div>

      {/* Category Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category, index) => (
          <span
            key={index}
            onClick={() => handleCategoryClick(category)}
            className={`cursor-pointer px-3 py-1 rounded-full text-md ${
              selectedCategory === category
                ? "bg-[#b03980] text-white"
                : "bg-gray-200 text-gray-700"
            } hover:bg-[#d6499e] hover:text-white transition`}
          >
            {category}
          </span>
        ))}
      </div>

      {/* Show loading spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#b03980]"></div>
        </div>
      ) : filteredBlogs.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredBlogs.map((blog, index) => (
            <div
              key={index}
              className="p-5 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
              onClick={() => setSelectedBlog(blog)}
            >
              <h2 className="text-xl font-semibold text-[#b03980]">
                {blog.title}
              </h2>
              <p className="text-sm text-gray-600">By {blog.author.name}</p>
              <p className="text-gray-700 text-sm">
                {blog.content.split(" ").slice(0, 25).join(" ")}...
              </p>
              <span className="inline-block mt-2 px-3 py-1 text-xs bg-gray-200 rounded-full">
                {blog.category}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-20 text-gray-500">
          <h2 className="text-2xl font-bold">No blogs found</h2>
          <p className="mt-2">Try a different keyword.</p>
        </div>
      )}

      {/* Display selected blog details in modal */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white w-[90%] md:w-[70%] p-6 rounded-xl relative overflow-auto max-h-[90vh]"
          >
            <button
              onClick={() => setSelectedBlog(null)}
              className="absolute top-4 right-4 text-xl text-white bg-[#b03980] rounded-full py-0.5 px-2 hover:bg-[#a0286f] transition"
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold mb-2 text-[#b03980]">
              {selectedBlog.title}
            </h2>
            {selectedBlog.updatedAt > selectedBlog.createdAt && (
              <p className="w-fit my-2 px-3 py-1 text-sm bg-gray-200 rounded-full">
                Edited
              </p>
            )}
            <p className="text-sm text-gray-500 mb-1">
              By {selectedBlog.author.name}
            </p>
            <p className="text-sm text-gray-500 mb-1">
              Pulished on : {toDateString(selectedBlog.createdAt)}
            </p>

            <span className="inline-block my-4 px-3 py-1 text-xs bg-gray-200 rounded-full">
              {selectedBlog.category}
            </span>
            <p className="inline-block my-4 ml-4 px-3 py-1 text-xs bg-gray-200 rounded-full">
              {selectedBlog.tags}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {selectedBlog.content}
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
