import React, {useEffect, useState} from "react";
import logo from "../assets/logo.png";
import {BiMenu} from "react-icons/bi";
import {CiLogout} from "react-icons/ci";
import {FaClipboardList, FaHandsHelping, FaPlus, FaUser} from "react-icons/fa";
import {Link, NavLink, useNavigate} from "react-router";
import {FaGear} from "react-icons/fa6";
import {RiMenu2Fill} from "react-icons/ri";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const {user, logoutUser} = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    //theme toggle
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogout = () => {
    logoutUser().then(() => {
      Swal.fire({
        title: "Successfully Logout!",
        icon: "success",
      });
    });
  };
  return (
    <div className="navbar border-b border-base-300 px-4 lg:px-16 sticky top-0 z-50 py-4">
      {/* Navbar Start - Logo and Mobile Menu */}
      <div className="navbar-start ">
        {/* Mobile Menu Button */}
        <div className="dropdown lg:hidden">
          <div
            tabIndex={0}
            role="button"
            className="cursor-pointer pr-2"
            onClick={toggleMobileMenu}
          >
            <RiMenu2Fill size={26} />
          </div>
          {isMenuOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[5] p-2 shadow-lg bg-base-300 border border-base-200 rounded-box w-64 top-11"
            >
              <li>
                <Link
                  to="/upcoming-events"
                  className="text-base-content hover:text-primary font-medium px-4 py-3 rounded-lg text-base hover:bg-base-300 transition-all duration-200"
                >
                  📅 Upcoming Events
                </Link>
              </li>
              <li>
                <Link
                  to="/community"
                  className="text-base-content hover:text-primary font-medium px-4 pb-3 rounded-lg text-base hover:bg-base-300 transition-all duration-200"
                >
                  <FaHandsHelping size={18} color="#4A90E2" /> Community
                </Link>
              </li>
              <li>
                <Link
                  to="/aboutUs"
                  className="text-base-content hover:text-primary font-medium px-4 pb-3 rounded-lg text-base hover:bg-base-300 transition-all duration-200"
                >
                  <FaUser size={18} color="#4A90E2" /> About Us
                </Link>
              </li>
              {user ? (
                <>
                  <li className="menu-title">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                      My Account
                    </span>
                  </li>
                  <li>
                    <Link
                      to="/create-event"
                      className="text-base-content hover:text-primary font-medium px-4 py-2 rounded-lg text-base hover:bg-base-300 transition-all duration-200"
                    >
                      <FaPlus /> Create Event
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/manage-events"
                      className="text-base-content hover:text-primary font-medium px-4 py-2 rounded-lg text-base hover:bg-base-300 transition-all duration-200"
                    >
                      <FaGear /> Manage Events
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/joined-events"
                      className="text-base-content hover:text-primary font-medium px-4 py-2 rounded-lg text-base hover:bg-base-300 transition-all duration-200"
                    >
                      <FaClipboardList /> Joined Events
                    </Link>
                  </li>
                  <div className="divider my-2"></div>
                  <li>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="text-red-600 hover:text-red-700 py-2 w-full text-left text-base"
                    >
                      <CiLogout />
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    onClick={() => navigate("/login")}
                    className="btn btn-primary text-white btn-sm mt-2"
                  >
                    Login
                  </button>
                </li>
              )}
            </ul>
          )}
        </div>

        {/* App Logo/Name */}
        <Link
          to="/"
          className="cursor-pointer text-xl md:text-2xl font-bold  flex items-center font-heading"
        >
          <img className="w-10 md:w-12" src={logo} alt="" />
          UnityWorks
        </Link>
      </div>

      {/* Navbar Center - Navigation Links (Desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink
              to="/upcoming-events"
              className="text-base-content hover:text-primary font-medium px-4 py-2 rounded-lg text-base hover:bg-base-300 transition-all duration-200"
            >
              📅 Upcoming Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/community"
              className="text-base-content hover:text-primary font-medium px-4 py-2 rounded-lg text-base hover:bg-base-300 transition-all duration-200"
            >
              <FaHandsHelping size={18} color="#4A90E2" /> Community
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/aboutUs"
              className="text-base-content hover:text-primary font-medium px-4 py-2 rounded-lg text-base hover:bg-base-300 transition-all duration-200"
            >
              <FaUser size={18} color="#4A90E2" /> About Us
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Navbar End - Auth Section */}
      <div className="navbar-end">
        <div className="mr-6">
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              className="theme-controller"
              onChange={() => setTheme(theme === "light" ? "dark" : "light")}
              checked={theme === "dark"}
            />

            {/* sun icon */}
            <svg
              className="swap-off h-7 w-7 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-on h-7 w-7  fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>
        {user ? (
          /* Logged In - Profile Dropdown */
          <div className="dropdown dropdown-end flex gap-4 items-center">
            {/* Avatar and Tooltip Wrapper */}
            <div
              tabIndex={0}
              role="button"
              className="relative group btn w-12 btn-ghost btn-circle avatar text-white"
            >
              {/* Avatar Image */}
              <div className="rounded-full ring-2 ring-blue-200 hover:ring-blue-400 transition-all ">
                <img
                  alt={user?.displayName || "User"}
                  src={user?.photoURL}
                  className="w-full rounded-full cursor-pointer"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://www.freeiconspng.com/uploads/am-a-19-year-old-multimedia-artist-student-from-manila--21.png";
                  }}
                />
              </div>

              {/* Tooltip Below */}
              <div className="absolute hidden opacity-0 group-hover:opacity-100 group-hover:flex md:min-w-20 md:h-10 top-full left-1/2 -translate-x-1/2 mt-6 bg-base-300 text-base-content text-xs px-3 py-2 rounded shadow z-50">
                {user?.displayName || "Anonymous"}
              </div>
            </div>

            {/* Dropdown Menu */}
            <ul
              tabIndex={0}
              className="menu bg-base-300 menu-sm dropdown-content mt-3 z-[10] p-2 shadow-lg top-12 border border-base-200 rounded-box w-64"
            >
              {/* User Info Header */}
              <li className="menu-title">
                <div className="flex items-center gap-3 py-2">
                  <div className="avatar">
                    <div className="w-8 rounded-full">
                      <img
                        alt={user?.displayName || "User"}
                        src={user?.photoURL}
                        className="rounded-full"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://www.freeiconspng.com/uploads/am-a-19-year-old-multimedia-artist-student-from-manila--21.png";
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-base-content">
                      {user.displayName}
                    </div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                </div>
              </li>

              <div className="divider my-1"></div>

              {/* Links */}
              <li>
                <Link
                  to="/create-event"
                  className="text-base-content hover:text-primary text-sm px-4 py-2 rounded-lg hover:bg-base-300 transition-all duration-200"
                >
                  <FaPlus />
                  Create Event
                </Link>
              </li>
              <li>
                <Link
                  to="/manage-events"
                  className="text-base-content hover:text-primary px-4 py-2 rounded-lg text-sm hover:bg-base-300 transition-all duration-200"
                >
                  <FaGear />
                  Manage Events
                </Link>
              </li>
              <li>
                <Link
                  to="/joined-events"
                  className="text-base-content hover:text-primary px-4 py-2 rounded-lg text-sm hover:bg-base-300 transition-all duration-200"
                >
                  <FaClipboardList />
                  Joined Events
                </Link>
              </li>

              <div className="divider my-1"></div>

              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 py-2 w-full text-left text-sm"
                >
                  <CiLogout />
                  Logout
                </button>
              </li>
            </ul>

            {/* Optional Logout Button (md and up) */}
            <div className="hidden md:block">
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-primary btn-outline bg-transparent hover:bg-primary hover:text-white px-6 cursor-pointer py-2 w-full text-left text-sm"
              >
                <CiLogout />
                Logout
              </button>
            </div>
          </div>
        ) : (
          /* Not Logged In - Login Button */
          <button
            onClick={() => navigate("/login")}
            className="btn btn-primary text-white px-6 border cursor-pointer"
          >
            <CiLogout />
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
