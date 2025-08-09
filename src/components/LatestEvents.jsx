import React from "react";
import {Link, useLoaderData} from "react-router";

const LatestEvents = () => {
  const events = useLoaderData();

  return (
    <div className="pt-20 pb-15 bg-base-100 px-6 lg:px-16">
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl text-base-content mb-6 font-bold font-heading text-center">
        Latest <span className="text-primary">Community Events</span>
      </h2>
      <p className="text-xl text-base-content/70 max-w-3xl mx-auto text-center">
        Stay updated with the most recent activities happening in your area and
        join hands to make a positive change.
      </p>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {events.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-2xl font-bold text-base-content mb-2">
              No events found
            </h3>
            <p className="text-base-content/70">
              No events right now. 
            </p>
          </div>
        ) : (
          events?.map((event) => {
            return (
              <div
                key={event._id}
                className="bg-base-300 shadow-md rounded-lg overflow-hidden flex flex-col"
              >
                {/* Event Image */}
                <img
                  src={event.thumbnailUrl}
                  alt={event.title}
                  className="w-full h-60 object-cover"
                />

                {/* Event Info */}
                <div className="flex flex-col flex-grow p-4">
                  <h2 className="text-xl font-bold mb-2">{event.title}</h2>
                  <p className="pb-2 flex-grow">
                    {event?.description.length > 50
                      ? event.description.slice(0, 60) + "..."
                      : event.description}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    {new Date(event?.eventDate).toLocaleDateString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>

                  <Link
                    to={`/view-event/${event._id}`}
                    className="btn btn-primary text-white mt-auto w-fit"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* View All Button */}
      <div className="flex justify-center mt-8">
        <Link to="/upcoming-events" className="btn btn-primary text-white">
          View All
        </Link>
      </div>
    </div>
  );
};

export default LatestEvents;
