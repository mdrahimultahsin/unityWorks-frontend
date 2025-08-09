import React from "react";
import Navbar from "../components/Navbar";
import {Outlet} from "react-router";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <div>
      <header className="sticky top-0 backdrop-blur-lg bg-neutral-content shadow z-50">
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
};

export default RootLayout;
