import React from "react";
import useAuth from "../../hooks/useAuth";
import {toast} from "react-toastify";

const Community = () => {
  const {user} = useAuth();
  const communities = [
    {
      id: 1,
      name: "Green Earth Volunteers",
      description:
        "Dedicated to planting trees and making our neighborhoods greener.",
      members: 120,
      image:
        "https://media.istockphoto.com/id/1489061272/photo/crystal-earth-on-ferns-in-green-grass-forest-with-sunlight-environment-save-the-world-earth.jpg?s=612x612&w=0&k=20&c=WVbWtdV-FrGafT5SsilWOTT8nd8_2x5EiAp8gn7jS4k=",
    },
    {
      id: 2,
      name: "Clean City Squad",
      description:
        "We organize weekly cleaning drives to keep our streets clean and became clean city.",
      members: 85,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4SxwnvhlAzuo3937amCp4CpsgFmVZlftCGA&s",
    },
    {
      id: 3,
      name: "Helping Hands",
      description:
        "Dedicated to delivering nutritious meals and essential aid to individuals of the community",
      members: 200,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP4-QnJ3zcm7pl1zfE0uoO_Xz_7jZC0uE4UA&s",
    },
  ];
  const handleJoinCommunity = () => {
    if (!user) {
      return toast.error("Please Login to join community");
    }
  };
  return (
    <div className="px-4 lg:px-16 py-10  mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 font-heading">
        Our Communities
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {communities.map((community) => (
          <div
            key={community.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={community.image}
              alt={community.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 ">
              <h2 className="text-xl font-semibold">{community.name}</h2>
              <p className="text-gray-600 text-sm mt-2">
                {community.description}
              </p>
              <div className="mt-4 text-sm text-gray-500">
                {community.members} Members
              </div>
              <button onClick={handleJoinCommunity} className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition cursor-pointer">
                Join Community
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
