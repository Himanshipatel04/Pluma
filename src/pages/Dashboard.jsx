import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [likes, setLikes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogsAndLikes = async () => {
      try {
        setLoading(true);
        const [blogsRes, likesRes] = await Promise.all([
          axios.get("http://localhost:4000/api/v1/blogs"),
          axios.get("http://localhost:4000/api/v1/likes"),
        ]);
        setBlogs(blogsRes.data.blogs || []);
        setLikes(likesRes.data.likes || []);
      } catch (error) {
        console.error("Error fetching blogs or likes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogsAndLikes();
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

  // Get like count for a given blog
  const getLikesCount = (blogId) => {
    return likes.filter((like) => like.blog === blogId).length;
  };

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

  const handleCategoryClick = (category) => {
    setSelectedCategory((prev) =>
      prev === category ? null : category
    );
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
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
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

      {/* Blog Cards */}
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
              onClick={() => navigate(`/blog/${blog._id}`)}
            >
              <h2 className="text-xl font-semibold text-[#b03980]">
                {blog.title}
              </h2>
              <p className="text-sm text-gray-600">By {blog.author.name}</p>
              <p className="text-gray-700 text-sm mt-2">
                {blog.content.split(" ").slice(0, 25).join(" ")}...
              </p>

              <div className="flex justify-between items-center mt-3">
                <span className="inline-block px-3 py-1 text-xs bg-gray-200 rounded-full">
                  {blog.category}
                </span>
                <span className="text-xs text-pink-700 font-medium">
                  ❤️ {getLikesCount(blog._id)} Likes
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-20 text-gray-500">
          <h2 className="text-2xl font-bold">No blogs found</h2>
          <p className="mt-2">Try a different keyword.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
