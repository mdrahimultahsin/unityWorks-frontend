import React, {useEffect, useState} from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaEye,
  FaUserFriends,
  FaClock,
  FaTag,
  FaExclamationTriangle,
  FaSpinner,
} from "react-icons/fa";
import {Link} from "react-router";
import Spinner from "../../components/Spinner";
const JoinedEvents = () => {
  const {user} = useAuth();
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_apiURL}/joined-events?email=${user.email}`, {
        headers: {
          authorization: `Bearer ${user?.accessToken}`,
        },
      })
      .then((res) => {
        setLoading(false);
        setJoinedEvents(res.data);
      });
  }, [user]);
  if (loading) {
    return <Spinner />;
  }
  if (joinedEvents.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p className="text-lg">You haven’t joined any events yet.</p>
        <p className="text-sm mt-2">Start exploring and make an impact!</p>
        <Link className="btn btn-primary text-white mt-3" to="/upcoming-events">
          Explore Events
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-base-content mb-2">
          My Joined Events
        </h1>
        <p className="text-base-content/70">
          You've joined {joinedEvents.length} event
          {joinedEvents.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {joinedEvents.map((event) => {
          return (
            <div
              key={event._id}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-200 group rounded-2xl"
            >
              <div className="card-body p-6">
                {/* Event Title */}
                <h2 className="card-title text-lg font-bold line-clamp-2 mb-3">
                  {event.eventTitle}
                </h2>

                {/* Event Details */}
                <div className="space-y-2 mb-4">
                  {/* Location */}
                  <div className="flex items-center text-sm text-base-content/70">
                    <FaMapMarkerAlt className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                    <span className="truncate">{event.eventLocation}</span>
                  </div>

                  {/* Date */}
                  <div className="flex items-center text-sm text-base-content/70">
                    <FaCalendarAlt className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                    <span>
                      {" "}
                      {new Date(event.eventDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Joined Date */}
                  <div className="flex items-center text-sm text-base-content/70">
                    <FaClock className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                    <span>
                      Joined:{" "}
                      {new Date(event.joinedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Participants (if available) */}
                  {event.participantCount && (
                    <div className="flex items-center text-sm text-base-content/70">
                      <FaUserFriends className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                      <span>{event.participantCount} participants</span>
                    </div>
                  )}
                </div>

                {/* Description Preview */}
                {event.description && (
                  <p className="text-sm text-base-content/60 line-clamp-2 mb-4">
                    {event.description}
                  </p>
                )}

                {/* Action Buttons */}
                <div className="card-actions justify-end mt-auto">
                  <Link
                    to={`/view-event/${event.eventId}`}
                    className="btn btn-primary text-white btn-sm"
                  >
                    <FaEye className="w-3 h-3 mr-1" />
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JoinedEvents;
