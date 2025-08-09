import React from "react";
import { FaHandsHelping } from "react-icons/fa";

const AboutUs = () => {
  return (
    <section className="px-4 lg:px-16 bg-base-100 rounded-lg shadow-lg py-10">
      
        <div className="flex items-center justify-center mb-6">
          <FaHandsHelping className="text-5xl text-primary mr-3" />
          <h2 className="text-4xl font-extrabold text-center text-primary">
            About UnityWorks
          </h2>
        </div>

        <p className="text-lg text-base-content/70  leading-relaxed mb-5">
          UnityWorks is a community-driven platform designed to connect individuals passionate about social development initiatives. Our mission is to empower users to easily discover, create, and participate in impactful local events such as road cleanings, tree plantations, and various community service activities.
        </p>

        <p className="text-lg text-base-content/70  leading-relaxed mb-5">
          Through an intuitive interface with powerful features like event management, real-time search and filtering, and secure Firebase authentication, UnityWorks fosters collaboration and drives positive change in neighborhoods worldwide.
        </p>

        <p className="text-lg text-base-content/70  leading-relaxed mb-8">
          We believe that small actions can lead to big impacts. Join UnityWorks to become part of a growing movement dedicated to environmental stewardship and social responsibility.
        </p>

        <div className="flex justify-center">
          <a
            href="/register"
            className="btn btn-primary text-white btn-lg transition duration-300"
          >
            Get Started
          </a>
        </div>
    </section>
  );
};

export default AboutUs;
