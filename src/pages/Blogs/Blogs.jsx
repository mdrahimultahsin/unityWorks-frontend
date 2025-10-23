import React from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router";

const Blogs = () => {
  const blogs = useLoaderData();

  if (!blogs?.data || blogs.data.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-gray-500">No blogs found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">All Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.data.map((blog) => (
          <div
            key={blog._id}
            className="bg-base-100 shadow-lg rounded-xl p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-200"
          >
            {/* Blog Header */}
            <div>
              <h2 className="text-2xl font-semibold mb-3">{blog.title}</h2>
              <p className="text-gray-600 text-sm mb-4 line-clamp-4">{blog.content}</p>
            </div>

            {/* Author Info & Date */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-3">
                {blog.authorPhoto ? (
                  <img
                    src={blog.authorPhoto}
                    alt={blog.authorName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
                    {blog.authorName?.charAt(0) || "A"}
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium">{blog.authorName}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Details Button */}
              <Link
                to={`/blogs/${blog._id}`}
                className="btn btn-sm btn-primary text-white"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
