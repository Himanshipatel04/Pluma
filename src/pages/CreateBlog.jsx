import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import axios from "axios";
import { BiLoader } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    tags: "",
    author: "", // initially empty
    category: "",
  });
  const [loading, setLoading] = useState(false);


  // Fetch user from localStorage and set author in blogData
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // Assuming user data is stored as a JSON string
    console.log(user, "user");
    if (user && user.id) {
      setBlogData((prevData) => ({
        ...prevData,
        author: user.id, // Set the author from localStorage
      }));
    }
  }, [blogData]);

  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { title, category, content, author } = blogData;
    console.log(blogData);
    if (!author) {
      toast.error("Please Login First!", {
        className: "bg-red-600 text-white font-semibold rounded-md",
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
      setLoading(false);

      return;
    } else if (!title || !category || !content) {
      toast.error("Please fill in all fields", {
        className: "bg-red-600 text-white font-semibold rounded-md",
      });
      setLoading(false);
      return;
    } else if (title.length < 5) {
      toast.error("Title must be at least 5 characters", {
        className: "bg-red-600 text-white font-semibold rounded-md",
      });
      setLoading(false);
      return;
    } else if (content.length < 20) {
      toast.error("Content must be at least 20 characters", {
        className: "bg-red-600 text-white font-semibold rounded-md",
      });
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/blogs/create",
        blogData
      );
      console.log(res);
      toast.success("Blog created successfully!", {
        className: "bg-green-600 text-white font-semibold rounded-md",
      });
      setTimeout(() => {
        navigate("/blogs");
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Error creating blog", {
        className: "bg-red-600 text-white font-semibold rounded-md",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }

    setBlogData({
      title: "",
      category: "",
      content: "",
      tags: "",
      author: "", // clear author on reset
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center py-20 px-4 0">
    <div className="flex flex-col lg:flex-row gap-20 w-full max-w-5xl mt-10 relative">
      {/* Background Illustration */}
      <div className="absolute inset-0 bg-[url('https://illustrations.popsy.co/pink/taking-notes.svg')] bg-center bg-no-repeat bg-cover opacity-20 z-0"></div>
  
      {/* Blog Form */}
      <motion.div
        className="flex-1 rounded-xl p-8 z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-center text-gray-700 mb-8">
          Create Blog
        </h2>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div>
            <label className="block font-semibold text-gray-600">Title</label>
            <input
              type="text"
              name="title"
              value={blogData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              className="w-full py-3 px-4 border-2 border-gray-400 rounded-md font-semibold focus:border-[#b03980] outline-none"
            />
          </div>
  
          <div>
            <label className="block font-semibold text-gray-600">
              Category
            </label>
            <select
              name="category"
              value={blogData.category}
              onChange={handleChange}
              className="w-full py-3 px-4 border-2 border-gray-400 rounded-md font-semibold focus:border-[#b03980] outline-none"
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Personal">Personal</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Travel">Travel</option>
              <option value="Education">Education</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Business">Business</option>
              <option value="Finance">Finance</option>
              <option value="Food">Food</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Others">Others</option>
            </select>
          </div>
  
          <div>
            <label className="block font-semibold text-gray-600">Tags</label>
            <input
              type="text"
              name="tags"
              value={blogData.tags}
              onChange={handleChange}
              placeholder="Write tags for your blog"
              className="w-full py-3 px-4 border-2 border-gray-400 rounded-md font-semibold focus:border-[#b03980] outline-none"
            />
          </div>
  
          <div>
            <label className="block font-semibold text-gray-600">
              Content
            </label>
            <textarea
              name="content"
              value={blogData.content}
              onChange={handleChange}
              placeholder="Write your blog content here..."
              rows="8"
              className="w-full py-3 px-4 border-2 border-gray-400 rounded-md font-semibold focus:border-[#b03980] outline-none resize-none"
            ></textarea>
          </div>
  
          <button
            type="submit"
            className="w-full py-3 bg-[#b03980] rounded-3xl text-white text-lg font-semibold"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <BiLoader size={24} className="animate-spin" />
              </div>
            ) : (
              "Publish Blog"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  </div>
  
  );
};

export default CreateBlog;
