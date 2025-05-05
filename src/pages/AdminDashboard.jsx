import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  UserGroupIcon,
  DocumentTextIcon,
  FolderOpenIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

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

const toDateString = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
};

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
  }, [user]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogRes = await axios.get("http://localhost:4000/api/v1/blogs");
        const userRes = await axios.get("http://localhost:4000/api/v1/users");
        setBlogs(blogRes.data.blogs);
        setUsers(userRes.data.users);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchData();
  }, [blogs,users]);

  const handleDeleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/blogs/${id}`);
      setBlogs(blogs.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Delete blog error:", err);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/users/${id}`);
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Delete user error:", err);
    }
  };

  const categoryCounts = categories.reduce((acc, category) => {
    acc[category] = blogs.filter((b) => b.category === category).length;
    return acc;
  }, {});

  if (user && user.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600">
            You do not have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {/* === TILES === */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white shadow rounded-lg p-4 flex items-center">
          <UserGroupIcon className="h-8 w-8 text-blue-600 mr-4" />
          <div>
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-lg font-bold">{users.length}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex items-center">
          <DocumentTextIcon className="h-8 w-8 text-green-600 mr-4" />
          <div>
            <p className="text-sm text-gray-500">Total Blogs</p>
            <p className="text-lg font-bold">{blogs.length}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex items-center">
          <ChartBarIcon className="h-8 w-8 text-purple-600 mr-4" />
          <div>
            <p className="text-sm text-gray-500">Categories</p>
            <p className="text-lg font-bold">{categories.length}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex items-center">
          <FolderOpenIcon className="h-8 w-8 text-yellow-600 mr-4" />
          <div>
            <p className="text-sm text-gray-500">Blogs per Category</p>
            <p className="text-lg font-bold">See below</p>
          </div>
        </div>
      </div>

      {/* === 2 COLUMNS: USERS + CATEGORY BLOG COUNTS === */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Users list */}
        <div className="bg-white shadow rounded-lg p-4 h-96 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">All Users</h2>
          {users.map((user) => (
            <div key={user._id} className="border-b py-2 flex justify-between">
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <div className="space-x-2">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => {
                    setSelectedUser(user);
                    setUserModalOpen(true);
                  }}
                >
                  View
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Category blog counts */}
        <div className="bg-white shadow rounded-lg p-4 h-96 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Blogs per Category</h2>
          {categories.map((cat) => (
            <div key={cat} className="border-b py-2 flex justify-between">
              <p>{cat}</p>
              <p className="font-bold">{categoryCounts[cat] || 0}</p>
            </div>
          ))}
        </div>
      </div>

      {/* === BLOG TABLE === */}
      <div className="bg-white p-4 rounded-lg shadow mb-10">
        <h2 className="text-xl font-semibold mb-4">All Blogs</h2>
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id} className="border-t">
                <td className="px-4 py-2">{blog.title}</td>
                <td className="px-4 py-2">{blog.category}</td>
                <td className="px-4 py-2">
                  <button
                    className="text-blue-600 hover:underline mr-4"
                    onClick={() => {
                      setSelectedBlog(blog);
                      setBlogModalOpen(true);
                    }}
                  >
                    View
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDeleteBlog(blog._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* === MODALS === */}
      {blogModalOpen && selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-2">{selectedBlog.title}</h2>
            <p className="mb-2">{selectedBlog.content}</p>
            <p className="mb-2 w-fit px-3 py-1 text-sm bg-gray-200 rounded-full">
              {selectedBlog.tags}
            </p>
            <p className="mb-2 w-fit px-3 py-1 text-sm bg-gray-200 rounded-full">
              {selectedBlog.category}
            </p>
            <p className="mb-2">
              Created At : {toDateString(selectedBlog.createdAt)}
            </p>
            <button
              className="bg-gray-600 text-white px-4 py-2 rounded"
              onClick={() => setBlogModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {userModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">{selectedUser.name}</h2>
            <p className="mb-2">Email: {selectedUser.email}</p>
            <p className="mb-2 ">Role: {selectedUser.role}</p>
            <p className="mb-2">
              Created At: {toDateString(selectedUser.createdAt)}
            </p>
            <button
              className="bg-gray-600 text-white px-4 py-2 rounded"
              onClick={() => setUserModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
