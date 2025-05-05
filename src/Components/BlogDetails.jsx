import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { FaRegHeart } from "react-icons/fa"; // ❤️ icons
import { BiRepost } from "react-icons/bi";

const BlogDetails = () => {
  const { id } = useParams(); // blog ID
  // const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(0);
  const [likedByUser, setLikedByUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [likeLoading, setLikeLoading] = useState(false);

  const toDateString = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    const fetchBlogAndLikes = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const [blogRes, likesRes] = await Promise.all([
          axios.get(`http://localhost:4000/api/v1/blogs/${id}`),
          axios.get(`http://localhost:4000/api/v1/likes/${id}`),
        ]);

        setBlog(blogRes.data.blog);
        console.log(blogRes.data.blog);
        setLikes(likesRes.data.likesCount || 0); // Adjust based on your API
        // Check if the user has already liked
        if (user) {
          const likedUsers = likesRes.data.likedUsers || [];
          likedUsers.forEach((like) => {
            if (like.user._id === user.id) {
              setLikedByUser(true);
            }
          });
        }
      } catch (err) {
        toast.error("Failed to load blog or likes.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogAndLikes();
  }, [id, likedByUser]);

  const handleRepost = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      toast.error("You must be logged in to repost a blog.");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/blogs/${id}/${user.id}/repost`
      ); // Adjust the endpoint as needed
      console.log(response);
      toast.success("Blog reposted successfully!"); // Show success message
    } catch (error) {
      toast.error("Failed to repost the blog.");
    }
  };

  const handleLikeToggle = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      toast.error("You must be logged in to like/unlike a blog.");
      return;
    }

    try {
      setLikeLoading(true);

      if (likedByUser) {
        await axios.post(`http://localhost:4000/api/v1/likes/createLike`, {
          userId: user.id,
          blogId: id,
        });
        setLikes((prev) => prev - 1);
        setLikedByUser(false);
      } else {
        await axios.post(`http://localhost:4000/api/v1/likes/createLike`, {
          userId: user.id,
          blogId: id,
        });
        setLikes((prev) => prev + 1);
        setLikedByUser(true);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Action failed.");
    } finally {
      setLikeLoading(false);
      window.location.reload();
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[100vh] ">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#b03980]"></div>
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-[100vh] h-fit bg-gradient-to-br from-pink-100 via-white to-pink-200 py-10">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white w-[90%] md:w-[70%] p-6 rounded-xl relative overflow-auto mt-20"
      >
        {/* <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-xl text-white bg-[#b03980] rounded-full py-0.5 px-2 hover:bg-[#a0286f] transition"
        >
          &times;
        </button> */}
        {/* Reposted Strip */}
        {blog?.repostedBy && (
          <div className="absolute top-1 -left-3">
            <div className="transform -rotate-[20deg] bg-pink-100 text-[#b03980] text-[10px] font-bold pl-7 pr-10 py-0.5 shadow-md ">
              REPOSTED
            </div>
          </div>
        )}
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold mb-2 text-[#b03980]">
            {blog.title || ""}
          </h2>
          {!blog?.repostedBy && (
            <button
              onClick={handleRepost}
              className="bg-gray-300 hover:bg-gray-400 hover:text-gray-200 px-3 space-x-3 py-1 rounded-xl text-gray-800 flex items-center justify-between"
            >
              <BiRepost size={24} /> Repost
            </button>
          )}
        </div>

        {blog.updatedAt > blog.createdAt && (
          <p className="w-fit my-2 px-3 py-1 text-sm bg-gray-200 rounded-full">
            Edited
          </p>
        )}

        {blog.repostedBy ? (
          <div>
            <p className="text-sm text-gray-500 mb-1">
              By {blog.author.name || ""} (Reposted by{" "}
              {blog.repostedBy.name || ""})
            </p>
          </div>
        ) : (
          <p className="text-sm text-gray-500 mb-1">
            By {blog.author.name || ""}
          </p>
        )}
        <p className="text-sm text-gray-500 mb-1">
          Published on: {toDateString(blog.createdAt)}
        </p>

        <div className="flex gap-2 my-4 flex-wrap items-center">
          <span className="px-3 py-1 text-xs bg-gray-200 rounded-full">
            {blog.category}
          </span>
          <span className="px-3 py-1 text-xs bg-gray-200 rounded-full">
            {blog.tags}
          </span>
          <span className="px-3 py-1 text-xs bg-pink-100 rounded-full flex items-center gap-1">
            ❤️ {likes} Likes
          </span>
        </div>

        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {blog.content}
        </p>

        <button
          onClick={handleLikeToggle}
          disabled={likeLoading}
          className="flex items-center gap-2 px-4 mt-5 py-2 text-lg  text-black rounded-full hover:text-[#a0286f] transition"
        >
          {likedByUser ? "❤️" : <FaRegHeart />}
        </button>
      </motion.div>
    </div>
  );
};

export default BlogDetails;
