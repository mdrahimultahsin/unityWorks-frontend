import React, {useState} from "react";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {Link, useLocation, useNavigate} from "react-router";
import google from "../../assets/google.png";

import Swal from "sweetalert2";
import logo from "../../assets/logo.png";
import {MdVisibility, MdVisibilityOff} from "react-icons/md";
import {toast} from "react-toastify";
import useAuth from "../../hooks/useAuth";
const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const {createUser, profileUpdate, loginWithGoogle} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {from} = location.state || {};
 
  const handleRegister = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const {email, password, name, photo} = Object.fromEntries(form);
    if (!/.{6,}/.test(password)) {
      return toast.error("Password Must be 6 characters or longer");
    }
    if (!/[A-Z]/.test(password)) {
      return toast.error("Password must contain at least one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      return toast.error("Password must contain at least one lowercase letter");
    }
    createUser(email, password)
      .then(() => {
        profileUpdate({displayName: name, photoURL: photo}).then(() => {
          Swal.fire({
            title: "Successfully Registered",
            icon: "success",
          });
          navigate(from ? from : "/");
          e.target.reset();
        });
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
    <div className="md:w-11/12 mx-auto px-4">
      <div className="  min-h-screen flex items-center justify-center md:gap-5 py-15 md:py-15 px-4 ">
        <div className="max-w-lg border border-primary rounded-2xl  bg-base-300 w-full text-base-content  shadow-lg p-8 ">
          <img className="w-14 mx-auto" src={logo} alt="" />
          <h2 className="text-2xl font-bold  mb-2 text-center mt-3 font-heading">
            Create an account
          </h2>
          <p className="text-center mb-6 text-neutral">
            Join Taskly to post tasks, find freelance jobs, and manage your work
            easily. It only takes a minute to get started!
          </p>
          <form onSubmit={handleRegister} className="space-y-4 pb-2">
            <div className="relative">
              <label className="block text-sm font-medium text-base-content mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your Name"
                className="w-full bg-transparent border border-primary rounded-full py-3 px-4 pr-12 text-neutral placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-base-content mb-2">
                Photo URL
              </label>
              <input
                type="url"
                name="photo"
                placeholder="Enter your Photo URL"
                className="w-full bg-transparent border border-primary rounded-full py-3 px-4 pr-12 text-neutral placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-base-content mb-2">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your Email"
                className="w-full bg-transparent border border-primary rounded-full py-3 px-4 pr-12 text-neutral placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-base-content mb-2">
                Enter Your Password
              </label>
              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full bg-transparent border border-primary rounded-full py-3 px-4 pr-12 text-neutral placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-13 transform -translate-y-1/2 text-primary text-xl hover:text-primary transition-colors"
              >
                {showPass ? <MdVisibilityOff /> : <MdVisibility />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-primary cursor-pointer text-white font-medium py-2.5 rounded-2xl transition-colors mt-2"
            >
              Register
            </button>
          </form>
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
              className="w-full btn-secondary text-base-content hover:text-white btn-outline btn cursor-pointer font-medium py-6 rounded-2xl transition-colors mt-4 flex items-center justify-center gap-2"
            >
              <img className="w-6" src={google} alt="Google" />
              Login With Google
            </button>
          </div>
          <div className="mt-2 text-center text-sm text-neutral flex gap-2 justify-center">
            <p>Already have an account? </p>
            <Link
              to="/login"
              className="text-base-content border-b border-transparent hover:border-base-content font-medium "
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
