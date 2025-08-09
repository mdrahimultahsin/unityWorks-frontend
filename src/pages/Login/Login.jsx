import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { MdEmail, MdVisibility, MdVisibilityOff, MdArrowBack } from "react-icons/md";
import logo from "../../assets/logo.png";
import google from "../../assets/google.png"; // ✅ Make sure this path is correct
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Login = () => {
  const { loginUser, loginWithGoogle } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || {};

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    loginUser(email, password)
      .then(() => {
        Swal.fire({
          title: "Login Successfully!",
          icon: "success",
        });

        navigate(from ? from : "/");
        e.target.reset();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleLoginWithGoogle = () => {
    loginWithGoogle()
      .then(() => {
        Swal.fire({
          title: "Successfully Registered",
          icon: "success",
        });
        navigate(from ? from : "/");
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <>
      {/* Login Card with Back Button */}
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-base-300 relative">
          {/* Back to Home Button */}
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline btn-primary btn-sm rounded-full flex items-center gap-2 px-4 py-2 text-md hover:bg-primary hover:text-white transition-colors absolute top-4 left-4 z-10"
          >
            <MdArrowBack className="text-xl" />
            Back to Home
          </button>

          <div className="border border-primary rounded-2xl p-8 shadow-lg pt-12">
            {/* Header */}
            <div className="text-center mb-8">
              <img className="w-10 mx-auto" src={logo} alt="Logo" />
              <h1 className="text-2xl font-bold font-heading">
                Please <span className="text-primary">Login</span> Your
              </h1>
              <h2 className="text-2xl font-bold">Account?</h2>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Input */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your Email"
                  className="w-full bg-transparent border border-primary rounded-full py-3 px-4 pr-12 text-neutral placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
                <MdEmail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary text-xl" />
              </div>

              {/* Password Input */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-full bg-transparent border border-primary rounded-full py-3 px-4 pr-12 text-neutral placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary text-xl hover:text-primary transition-colors"
                >
                  {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary text-white font-bold py-3 px-4 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Login
              </button>

              {/* Forget Password Link */}
              <div className="text-center">
                <button
                  type="button"
                  className="text-gray-400 hover:text-primary text-sm transition-colors"
                >
                  Forget Password?
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-base-200"></div>
              <span className="mx-4 text-gray-500 text-sm">or</span>
              <div className="flex-grow border-t border-base-200"></div>
            </div>

            {/* Google Login */}
            <div className="pb-2">
              <button
                type="button"
                onClick={handleLoginWithGoogle}
                className="w-full btn-primary text-base-content hover:text-white btn-outline btn cursor-pointer font-medium py-6 rounded-2xl transition-colors mt-4 flex items-center justify-center gap-2"
              >
                <img className="w-6" src={google} alt="Google" />
                Login With Google
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-2 text-center text-sm text-base-accent flex gap-2 justify-center">
              <p>Don't have an account?</p>
              <Link
                to="/register"
                className="text-base-content border-b border-transparent hover:border-base-content font-medium"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
