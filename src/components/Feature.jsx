import React from 'react';
import {  FaCalendarAlt,  FaHandsHelping, FaLeaf } from 'react-icons/fa';

const Feature = () => {
        const features = [
    {
      icon: FaCalendarAlt,
      title: "Event Discovery",
      description:
        "Find and join community events happening near you. From environmental cleanups to social gatherings.",
      color: "primary",
    },
    {
      icon: FaHandsHelping,
      title: "Easy Volunteering",
      description: "Simple tools to organize, participate, and manage community service activities.",
      color: "secondary",
    },
    {
      icon: FaLeaf,
      title: "Sustainability Focus",
      description: "Emphasis on environmental and social sustainability in all community initiatives.",
      color: "accent",
    },
  ]
        return (
                 <div className="py-20 bg-base-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl text-base-content mb-6 font-bold font-heading">
              Powerful Features for <span className="text-primary">Community Impact</span>
            </h2>
            <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
              Our platform provides everything you need to discover, organize, and participate in meaningful community
              events
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-base-100 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-base-300"
              >
                <div
                  className={`bg-${feature.color}/10 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className={`text-3xl text-${feature.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-base-content mb-4">{feature.title}</h3>
                <p className="text-base-content/70 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
        );
};

export default Feature;