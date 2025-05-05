import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEnvelope, FaUser, FaEye } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/v1/blogs/user/${id}`
        );
        setBlogs(res.data.blogs);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBlogs();
  }, [id]);

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedBlog = {
      ...selectedBlog,
      title: formData.get("title"),
      content: formData.get("content"),
      tags: formData.get("tags"),
    };

    try {
      const res = await axios.put(
        `http://localhost:4000/api/v1/blogs/${selectedBlog._id}`,
        updatedBlog
      );

      setBlogs((prev) =>
        prev.map((b) => (b._id === selectedBlog._id ? res.data.blog : b))
      );
      setEditModalOpen(false);
      setSelectedBlog(null);
      toast.success("Blog updated successfully!");
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog.");
    }
  };

  const handleView = (blog) => {
    setSelectedBlog(blog);
    setViewModalOpen(true);
  };

  const handleDeletePrompt = (blog) => {
    setSelectedBlog(blog);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:4000/api/v1/blogs/${selectedBlog._id}`
      );
      setBlogs(blogs.filter((b) => b._id !== selectedBlog._id));
      setDeleteModalOpen(false);
      setSelectedBlog(null);
      toast.success("Blog deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#b03980]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen pt-20">
      <div className="bg-gradient-to-r from-[#ffe6f0] to-[#fdf1f7] p-6 rounded-2xl mt-10 shadow-lg border border-pink-200 max-w-md mx-auto">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-[#ba438a] text-white rounded-full p-3">
            <FaUser className="text-xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#ba438a]">
              Profile Details
            </h2>
            <p className="text-sm text-gray-500">
              Welcome, {user?.name || "User"}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <FaUser className="text-[#ba438a]" />
            <p>
              <span className="font-semibold text-gray-700">Name:</span>{" "}
              {user?.name}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <FaEnvelope className="text-[#ba438a]" />
            <p>
              <span className="font-semibold text-gray-700">Email:</span>{" "}
              {user?.email}
            </p>
          </div>
        </div>
      </div>

      <hr className="my-6" />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold mb-4">Blogs by {user?.name}</h2>
        <Link
          to={"/create-blog"}
          className="bg-[#ba438a] text-white px-4 py-2 rounded hover:bg-[#8a2b64]"
        >
          + Create Blog
        </Link>
      </div>

      {blogs.length === 0 ? (
        <p className="text-gray-500">No blogs found.</p>
      ) : (
        <ul className="space-y-4">
          {blogs.map((blog) => (
            <li key={blog._id} className="bg-gray-100 p-4 rounded-md shadow">
              <h3 className="text-lg font-bold text-[#b03980]">{blog.title}</h3>
              <p className="text-sm text-gray-700">
                {blog.content.slice(0, 100)}...
              </p>

              <div className="mt-3 flex space-x-3">
                <button
                  onClick={() => handleView(blog)}
                  className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-1"
                >
                  <FaEye />
                  View
                </button>
                <button
                  onClick={() => handleEdit(blog)}
                  className="px-3 py-1 text-sm bg-[#b03980] text-white rounded hover:bg-[#8a2b64]"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePrompt(blog)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* VIEW MODAL */}
      {viewModalOpen && selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-[70%] p-6 rounded-lg shadow-lg relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setViewModalOpen(false)}
              className="absolute top-3 right-4 text-xl font-bold text-gray-600 hover:text-black"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-[#b03980] mb-4">
              {selectedBlog.title}
            </h2>
            <p className="text-gray-700">{selectedBlog.content}</p>
            <span className="inline-block my-4 px-3 py-1 text-xs bg-gray-200 rounded-full">
              {selectedBlog.category}
            </span>
            <p className="inline-block my-4 ml-4 px-3 py-1 text-xs bg-gray-200 rounded-full">
              {selectedBlog.tags}
            </p>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editModalOpen && selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-[70%] p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setEditModalOpen(false)}
              className="absolute top-3 right-4 text-xl font-bold text-gray-600 hover:text-black"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-[#b03980] mb-4">
              Edit Blog
            </h2>
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                name="title"
                defaultValue={selectedBlog.title}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="category"
                disabled
                defaultValue={selectedBlog.category}
                className="w-full p-2 mb-4 border text-gray-500 border-gray-300 rounded"
              />
              <textarea
                name="content"
                defaultValue={selectedBlog.content}
                className="w-full p-2 border border-gray-300 rounded h-40"
              ></textarea>
              <textarea
                name="tags"
                defaultValue={selectedBlog.tags}
                className="w-full p-2 border border-gray-300 rounded h-10"
              ></textarea>
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-[#b03980] text-white rounded hover:bg-[#8a2b64]"
              >
                Update Blog
              </button>
            </form>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteModalOpen && selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-[30%] p-6 rounded-lg shadow-lg relative text-center">
            <h2 className="text-xl font-semibold mb-4">Delete Blog</h2>
            <p>
              Are you sure you want to delete{" "}
              <strong>{selectedBlog.title}</strong>?
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
