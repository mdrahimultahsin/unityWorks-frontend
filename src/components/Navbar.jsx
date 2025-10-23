"use client";
import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import {
  FaClipboardList,
  FaHandsHelping,
  FaPlus,
  FaUser,
  FaBell,
  FaPen,
} from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { RiMenu2Fill } from "react-icons/ri";
import { Link, NavLink, useNavigate } from "react-router";
import { FaGear } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { socket } from "../utils/socket";
import axios from "axios";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [notifications, setNotifications] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const apiURL = import.meta.env.VITE_apiURL;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleMobileMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logoutUser().then(() => {
      Swal.fire({ title: "Successfully Logout!", icon: "success" });
    });
  };

  // ✅ Fetch notifications from API
  useEffect(() => {
  const fetchNotifications = async () => {
    if (!user?.email) return;
    try {
      // Get Firebase ID token
      const token = await user?.accessToken; // if using Firebase auth
      const response = await axios.get(`${apiURL}/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { email: user.email },
      });
      setNotifications(response.data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };
  fetchNotifications();
}, [user?.email, apiURL,user]);
console.log(notifications);

  // ✅ Real-time socket notifications
  useEffect(() => {
    if (!user?.email) return;

    socket.connect();
    socket.emit("registerUser", user.email);

    socket.on("newJoinNotification", (data) => {
      setNotifications((prev) => [data, ...prev]);
    });

    return () => {
      socket.off("newJoinNotification");
      socket.disconnect();
    };
  }, [user?.email]);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <div className="navbar border-b border-base-300 px-4 lg:px-16 sticky top-0 z-50 py-4 bg-base-100">
      {/* Navbar Start */}
      <div className="navbar-start">
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
            <ul className="menu menu-sm dropdown-content mt-3 z-[5] p-2 shadow-lg bg-base-300 border border-base-200 rounded-box w-64 top-11">
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
                  <li>
                    <Link
                      to="/add-blog"
                      className="text-base-content hover:text-primary font-medium px-4 py-2 rounded-lg text-base hover:bg-base-300 transition-all duration-200"
                    >
                      <FaPen /> Add Blog
                    </Link>
                  </li>
                  <div className="divider my-2"></div>
                  <li>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="text-red-600 hover:text-red-700 py-2 w-full text-left text-base"
                    >
                      <CiLogout /> Logout
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

        {/* Logo */}
        <Link
          to="/"
          className="cursor-pointer text-xl md:text-2xl font-bold flex items-center font-heading"
        >
          <img className="w-10 md:w-12" src={logo} alt="Logo" />
          UnityWorks
        </Link>
      </div>

      {/* Navbar Center */}
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
              to="/blogs"
              className="text-base-content hover:text-primary font-medium px-4 py-2 rounded-lg text-base hover:bg-base-300 transition-all duration-200"
            >
              <FaPen size={18} color="#4A90E2" /> Blogs
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

      {/* Navbar End */}
      <div className="navbar-end flex items-center gap-4">
        {/* Theme Toggler */}
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className={`btn btn-circle btn-sm ${theme === "light" ? "bg-yellow-400 text-base-100" : "bg-blue-900 text-white"}`}
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "☀️" : "🌙"}
        </button>

        {/* 🔔 Notifications */}
        {user && (
          <div className="relative">
            <button onClick={toggleDrawer} className="btn btn-ghost btn-circle">
              <FaBell size={20} />
              {notifications.filter((n) => !n.read).length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications.filter((n) => !n.read).length}
                </span>
              )}
            </button>

            {isDrawerOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-base-100 shadow-xl rounded-lg border border-base-300 z-50">
                <h3 className="font-bold p-4 border-b border-base-300">
                  Notifications
                </h3>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="p-4 text-gray-500">No notifications</p>
                  ) : (
                    notifications.map((n, idx) => (
                      <div key={idx} className="p-4 border-b border-base-300">
                        <p className="text-sm">{n.message}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(n.createdAt).toLocaleString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 👤 Avatar */}
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ring-2 ring-primary">
                <img src={user?.photoURL} alt="User" />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[50] p-3 shadow-lg bg-base-100 border border-base-200 rounded-box w-56"
            >
              <li className="text-center">
                <p className="font-semibold">{user?.displayName}</p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </li>
              <div className="divider my-2"></div>
              <li>
                <Link to="/create-event">
                  <FaPlus /> Create Event
                </Link>
              </li>
              <li>
                <Link to="/manage-events">
                  <FaGear /> Manage Events
                </Link>
              </li>
              <li>
                <Link to="/joined-events">
                  <FaClipboardList /> Joined Events
                </Link>
              </li>
              <li>
                <Link to="/add-blog">
                  <FaPen /> Add Blog
                </Link>
              </li>
              <div className="divider my-2"></div>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-red-600 flex items-center gap-2"
                >
                  <CiLogout /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="btn btn-primary text-white"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
