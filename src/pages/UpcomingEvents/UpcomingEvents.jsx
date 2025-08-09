import axios from "axios";
import {useEffect, useState} from "react";
import {
  FiCalendar,
  FiMapPin,
  FiUsers,
  FiTag,
  FiUser,
  FiFilter,
  FiX,
} from "react-icons/fi";
import {Link} from "react-router";
import Spinner from "../../components/Spinner";
import {FaSearch} from "react-icons/fa";

const UpcomingEvents = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    if (searchText.length > 0) {
      setLoading(true);
      axios
        .get(`${import.meta.env.VITE_apiURL}/events?search=${searchText}`)
        .then((res) => {
          setFilteredData(res.data);
          setLoading(false);
        });
    } else {
      setLoading(true);
      axios.get(`${import.meta.env.VITE_apiURL}/events`).then((res) => {
        setFilteredData(res.data);
        setLoading(false);
      });
    }
    setLoading(false);
  }, [searchText]);
  useEffect(() => {
    if (selectedCategory) {
      setLoading(true);
      axios
        .get(
          `${import.meta.env.VITE_apiURL}/events?category=${selectedCategory}`
        )
        .then((res) => {
          setFilteredData(res.data);
          setLoading(false);
        });
    }
  }, [selectedCategory]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="min-h-screen bg-base-100 p-4 md:p-8">
      <div className="px-8 mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl text-base-content mb-4 font-bold font-heading">
            Upcoming Events
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Discover amazing events happening near you. Join thousands of others
            in unforgettable experiences.
          </p>
          <div className="stats shadow mt-6">
            <div className="stat">
              <div className="stat-title">Total Events</div>
              <div className="stat-value text-primary">
                {filteredData.length}
              </div>
              <div className="stat-desc">Upcoming events available</div>
            </div>
          </div>
        </div>

        {/* Search and filter */}
        <div className="bg-base-300/50 backdrop-blur-sm rounded-3xl p-6 mb-8 border border-base-content/10 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/20 rounded-xl">
              <FiFilter className="text-primary text-xl" />
            </div>
            <h2 className="text-xl font-bold text-base-content font-heading">
              Search & Filter Events
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Enhanced Search Input */}
            <div className="lg:col-span-2 space-y-2">
              <label className="text-sm font-semibold text-base-content/80 flex items-center gap-2">
                <FaSearch className="text-primary" />
                Search Events
              </label>
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search by title, description, or location..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="input input-bordered w-full h-14 pl-12 pr-12 text-base bg-base-100 border-2 border-base-content/20 focus:border-primary focus:bg-base-100 transition-all duration-300 rounded-2xl shadow-sm hover:shadow-md focus:shadow-lg"
                />
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40 group-focus-within:text-primary transition-colors duration-300" />
                {searchText && (
                  <button
                    onClick={() => setSearchText("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-base-content/10 rounded-full transition-colors duration-200"
                  >
                    <FiX className="text-base-content/60 hover:text-base-content" />
                  </button>
                )}
              </div>
              {searchText && (
                <div className="text-xs text-base-content/60 flex items-center gap-1">
                  <span>Searching for:</span>
                  <span className="font-semibold text-primary">
                    "{searchText}"
                  </span>
                </div>
              )}
            </div>

            {/* Enhanced Category Filter */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-base-content/80 flex items-center gap-2">
                <FiTag className="text-secondary" />
                Category Filter
              </label>
              <div className="relative">
                <select
                  className="select select-bordered w-full h-14 text-base bg-base-100 border-2 border-base-content/20 focus:border-secondary focus:bg-base-100 transition-all duration-300 rounded-2xl shadow-sm hover:shadow-md focus:shadow-lg appearance-none cursor-pointer"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">🌟 All Categories</option>
                  <option value="cleanup">🧹 Cleanup</option>
                  <option value="plantation">🌱 Plantation</option>
                  <option value="donation">💝 Donation</option>
                  <option value="healthcare">🏥 Healthcare</option>
                  <option value="food">🍽️ Food Donation</option>
                  <option value="education">📚 Education</option>
                  <option value="awareness">📢 Awareness</option>
                </select>
              </div>
              {selectedCategory !== "all" && (
                <div className="flex items-center justify-between">
                  <div className="text-xs text-base-content/60 flex items-center gap-1">
                    <span>Filtered by:</span>
                    <span className="font-semibold text-secondary capitalize">
                      {selectedCategory}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className="text-xs text-base-content/60 hover:text-base-content underline transition-colors duration-200"
                  >
                    Clear filter
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Filter Summary */}
          <div className="mt-6 pt-4 border-t border-base-content/10">
            <div className="flex flex-wrap items-center gap-4 text-sm text-base-content/70">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span>
                  Showing{" "}
                  <span className="font-bold text-primary">
                    {filteredData.length}
                  </span>{" "}
                  events
                </span>
              </div>
              {(searchText || selectedCategory !== "all") && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSearchText("");
                      setSelectedCategory("all");
                    }}
                    className="text-xs bg-base-content/10 hover:bg-base-content/20 px-2 py-1 rounded-full transition-colors duration-200"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {filteredData.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-2xl font-bold text-base-content mb-2">
              No events found
            </h3>
            <p className="text-base-content/70">
              No events match your selection right now. Please try a different
              category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredData.map((event) => (
              <div
                key={event._id}
                className="card bg-base-300 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200 rounded-2xl"
              >
                {/* Event Thumbnail */}
                <figure className="relative">
                  <img
                    src={event.thumbnailUrl || ""}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4"></div>
                  <div className="absolute top-4 right-4">
                    <div className="badge badge-neutral badge-lg">
                      <FiTag className="w-3 h-3 mr-1" />
                      {event.eventType}
                    </div>
                  </div>
                </figure>

                <div className="card-body p-4">
                  {/* Event Title */}
                  <h2 className="card-title text-lg line-clamp-2 mb-2 font-bold font-heading">
                    {event.title}
                  </h2>

                  {/* Event Description */}
                  <p className="text-sm text-base-content/70 line-clamp-2 mb-3">
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div className="space-y-2 mb-4">
                    {/* Date and Time */}
                    <div className="flex items-center gap-2 text-sm">
                      <FiCalendar className="w-4 h-4 text-primary" />
                      <span className="font-medium">
                        {new Date(event.eventDate).toLocaleDateString("en-US", {
                          weekday: "short", 
                          year: "numeric",
                          month: "short", 
                          day: "numeric", 
                        })}
                      </span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-sm">
                      <FiMapPin className="w-4 h-4 text-primary" />
                      <span className="truncate">{event.location}</span>
                    </div>

                    {/* Organizer */}
                    <div className="flex items-center gap-2 text-sm">
                      <FiUser className="w-4 h-4 text-primary" />
                      <span className="truncate">Organizer: {event.email}</span>
                    </div>

                    {/* Attendees */}
                    <div className="flex items-center gap-2 text-sm">
                      <FiUsers className="w-4 h-4 text-primary" />
                      <span>{event.participant || 0} Participate</span>
                    </div>
                  </div>

                  {/* View Event Button */}
                  <div className="card-actions justify-end">
                    <Link
                      to={`/view-event/${event._id}`}
                      className="btn btn-primary text-white rounded-full w-full"
                    >
                      View Event
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;
