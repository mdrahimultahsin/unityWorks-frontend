import { Link } from "react-router";
import { FaHome } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 text-center px-4">
      <h1 className="text-9xl font-extrabold text-primary mb-6">404</h1>
      <h2 className="text-3xl font-bold text-base-content mb-4">
        Page Not Found
      </h2>
      <p className="text-base-content/70 mb-6">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary text-white flex items-center gap-2">
        <FaHome />
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
