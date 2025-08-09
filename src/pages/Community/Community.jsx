import React from "react";
import useAuth from "../../hooks/useAuth";
import {toast} from "react-toastify";
import {useLoaderData} from "react-router";
import axios from "axios";

const Community = () => {
  const {user} = useAuth();
  const communities = useLoaderData();

  const handleJoinCommunity = (communityId) => {
    if (!user) {
      return toast.error("Please Login to join community");
    }
    axios
      .patch(`${import.meta.env.VITE_apiURL}/joinCommunity`, {
        communityId,
        email: user.email,
      })
      .then(() => {
        
        toast.success("You have joined the community!");
      })
      .catch(() => {});
  };

  return (
    <div className="px-4 lg:px-16 py-10 mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 font-heading">
        Our Communities
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {communities?.map((community) => {
          const isJoined =
            user && community.joinedMembers?.includes(user.email);

          return (
            <div
              key={community.id}
              className="bg-base-300 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={community.image}
                alt={community.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl text-base-content font-semibold">{community.title}</h2>
                <p className="text-base-neutral text-sm mt-2">
                  {community.description}
                </p>
                <div className="mt-4 text-sm text-gray-500">
                  {community.member} Members
                </div>
                <button
                  onClick={() => handleJoinCommunity(community._id)}
                  disabled={isJoined}
                  className={`mt-4 w-full text-white py-2 px-4 rounded-lg transition cursor-pointer ${
                    isJoined
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {isJoined ? "Already Joined" : "Join Community"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Community;
