import React from "react";
import { useLoaderData, useNavigate } from "react-router";

const BlogDetails = () => {
  const navigate = useNavigate();
  const data = useLoaderData();
  const blog = data?.data;

  if (!blog) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-gray-500">Blog not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-ghost mb-6"
      >
        ← Back
      </button>

      <div className="bg-base-100 shadow-lg rounded-xl p-6">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

        {/* Author & Date */}
        <div className="flex items-center gap-4 mb-6">
          {blog.authorPhoto ? (
            <img
              src={blog.authorPhoto}
              alt={blog.authorName}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
              {blog.authorName?.charAt(0) || "A"}
            </div>
          )}
          <div>
            <p className="font-semibold">{blog.authorName}</p>
            <p className="text-sm text-gray-500">
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {blog.tags?.map((tag, index) => (
            <span
              key={index}
              className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Content */}
        <p className="text-gray-700 leading-relaxed">{blog.content}</p>

        {/* Votes */}
        <div className="mt-6 flex items-center gap-4">
          <span className="text-sm text-gray-600">👍 {blog.upVotes}</span>
          <span className="text-sm text-gray-600">👎 {blog.downVotes}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
