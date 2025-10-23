import React, { useState } from "react";
import axios from "axios";
import { socket } from "../../utils/socket";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const AddBlog = () => {
  const {user} = useAuth()
  const [loading, setLoading] = useState(false);
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    bannerImage: "",
    tags: "",
  });
console.log(user.photoURL);
  const apiURL = import.meta.env.VITE_apiURL;

  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please log in to post a blog.");
      return;
    }

    if (!blogData.title || !blogData.content) {
      toast.error("Please fill all required fields.");
      return;
    }

    const newBlog = {
      authorName: user.displayName,
      authorEmail: user.email,
      authorImage: user.photoURL,
      title: blogData.title,
      content: blogData.content,
      bannerImage: blogData.bannerImage || "",
      tags: blogData.tags
        ? blogData.tags.split(",").map((t) => t.trim())
        : [],
      createdAt: new Date(),
    };

    try {
      setLoading(true);
      const res = await axios.post(`${apiURL}/add-blog`, newBlog);

      if (res.status === 201) {
        toast.success("Blog posted successfully!");
        setBlogData({ title: "", content: "", bannerImage: "", tags: "" });

        // 🔔 Real-time update
        socket.emit("newBlogPosted", {
          message: `${user.displayName} posted a new blog.`,
          blogTitle: newBlog.title,
          blogId: res.data.insertedId,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to post blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-12 bg-base-300 p-8 rounded-2xl shadow-md">
      <h2 className="text-3xl font-semibold text-center mb-8 text-green-700">
        ✍️ Add a New Blog
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Blog Title */}
        <div>
          <label className="block text-sm font-medium mb-2 text-base-content">
            Blog Title
          </label>
          <input
            type="text"
            name="title"
            value={blogData.title}
            onChange={handleChange}
            placeholder="Enter your blog title..."
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Banner Image */}
        <div>
          <label className="block text-sm font-medium mb-2 text-base-content">
            Banner Image URL (optional)
          </label>
          <input
            type="text"
            name="bannerImage"
            value={blogData.bannerImage}
            onChange={handleChange}
            placeholder="https://example.com/banner.jpg"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {blogData.bannerImage && (
            <img
              src={blogData.bannerImage}
              alt="Preview"
              className="mt-3 w-full rounded-lg h-56 object-cover border"
            />
          )}
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium mb-2 text-base-content">
            Blog Content
          </label>
          <textarea
            name="content"
            value={blogData.content}
            onChange={handleChange}
            placeholder="Write your blog content here..."
            rows="6"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            required
          ></textarea>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium mb-2 text-base-content">
            Tags (comma separated)
          </label>
          <input
            type="text"
            name="tags"
            value={blogData.tags}
            onChange={handleChange}
            placeholder="e.g., Community, Awareness, Social"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 flex items-center gap-2"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                Posting...
              </>
            ) : (
              "Post Blog"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
