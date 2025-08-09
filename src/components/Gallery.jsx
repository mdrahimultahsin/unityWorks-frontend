import React from 'react';
import { FaCamera } from 'react-icons/fa';
import { FiArrowRight, FiMapPin, FiUsers } from 'react-icons/fi';

const Gallery = () => {
        const galleryImages = [
    {
      id: 1,
      title: "Road Cleaning",
      location: "Mirpur 10",
      participants: 150,
      image:
        "https://previews.123rf.com/images/delipa/delipa1611/delipa161100013/65642626-road-sweeper-worker-cleaning-city-street.jpg",
    },
    {
      id: 2,
      title: "Tree Plantation",
      location: "Central Park",
      participants: 200,
      image:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Food Distribution",
      location: "Downtown",
      participants: 80,
      image:
        "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      title: "Community Garden",
      location: "Riverside",
      participants: 120,
      image:
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      title: "Youth Education",
      location: "Local School",
      participants: 60,
      image:
        "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 6,
      title: "River Cleanup",
      location: "City River",
      participants: 180,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUkQpqsDRPywpUO12eobwhIjdHBfslFPug6w&s",
    },
  ]
        return (
               <div className="py-20 bg-base-100">
        <div className=" mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-base-content mb-6">
              Community <span className="text-primary">In Action</span>
            </h2>
            <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
              Witness the incredible impact our community members are making across different cities and causes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-16">
            {galleryImages.map((galleryImg) => (
              <div
                key={galleryImg.id}
                className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={galleryImg.image || "/placeholder.svg"}
                    alt={galleryImg.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold mb-2">{galleryImg.title}</h3>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <FiMapPin className="text-accent" />
                      <span>{galleryImg.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiUsers className="text-accent" />
                      <span>{galleryImg.participants} volunteers</span>
                    </div>
                  </div>
                </div>

                {/* Badge */}
                <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                  <FaCamera className="inline mr-1" />
                  Event
                </div>
              </div>
            ))}
          </div>

          
        </div>
      </div>
        );
};

export default Gallery;