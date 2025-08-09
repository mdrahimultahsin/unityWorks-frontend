import {useEffect, useState} from "react";

import axios from "axios";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaPlus,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaTag,
  FaTimes,
  FaSave,
} from "react-icons/fa";
import {Link} from "react-router";
import useAuth from "../../hooks/useAuth";
import Spinner from "../../components/Spinner";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import {toast} from "react-toastify";

const ManageEvents = () => {
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [eventDate, setEventDate] = useState(null);
  const {user} = useAuth();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_apiURL}/myEvents?email=${user.email}`, {
        headers: {
          authorization: `Bearer ${user?.accessToken}`,
        },
      })
      .then((res) => {
        setMyEvents(res.data);
        setLoading(false);
      });
  }, [user]);

  //Update Event
  const handleUpdateEvent = (e, eventId) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const updateEventData = Object.fromEntries(form);
    const eventData = {
      ...updateEventData,

      eventDate: eventDate?.toISOString(),
    };

    axios
      .patch(`${import.meta.env.VITE_apiURL}/events/${eventId}`, eventData, {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
          email: `${user?.email}`,
        },
      })
      .then((res) => {
        if (res.data.modifiedCount) {
          setIsEditModalOpen(false);
          toast.success("Event Updated Successfully");
          setMyEvents((prev) =>
            prev.map((event) =>
              event._id === eventId ? {...event, ...eventData} : event
            )
          );
        }
      });
  };
  
  //Delete Event
  const handleDeleteEvent = (eventId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${import.meta.env.VITE_apiURL}/events/${eventId}`, {
            headers: {
              authorization: `Bearer ${user?.accessToken}`,
              email: user?.email,
            },
          })
          .then((res) => {
            if (res.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              setMyEvents((myEvents) =>
                myEvents.filter((event) => event._id !== eventId)
              );
            }
          });
      }
    });
  };

  // Loading state
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-base-content mb-2">
            Manage Events
          </h1>
          <p className="text-base-content/70">
            You have created {myEvents.length} event
            {myEvents.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          to="/create-event"
          className="btn btn-primary text-white mt-4 md:mt-0"
        >
          <FaPlus className="w-4 h-4 mr-2" />
          Create New Event
        </Link>
      </div>

      <div className="text-center py-10">
        {myEvents.length === 0 ? (
          <div>
            <div className="text-6xl mb-6">📅</div>
            <h3 className="text-2xl font-bold text-base-content mb-3">
              No Events Created Yet
            </h3>
            <p className="text-base-content/70 mb-6">
              Start creating amazing events and bring people together!
            </p>
            <Link
              to="/create-event"
              className="btn btn-primary text-white btn-lg"
            >
              <FaPlus className="w-4 h-4 mr-2" />
              Create Your First Event
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {myEvents.map((event) => {
              return (
                <div
                  key={event._id}
                  className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-200"
                >
                  {/* Event Image */}
                  <figure className="relative h-48 bg-gradient-to-br from-primary/10 to-secondary/10">
                    {event.thumbnailUrl ? (
                      <img
                        src={event.thumbnailUrl || "/placeholder.svg"}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        <FaCalendarAlt className="text-4xl text-primary/30" />
                      </div>
                    )}

                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      <div
                        className={`badge badge-sm font-semibold badge-primary text-white`}
                      >
                        {new Date(event.eventDate) >= new Date()
                          ? "Active"
                          : "Inactive"}
                      </div>
                    </div>

                    {/* Event Type Badge */}
                    {event.eventType && (
                      <div className="absolute top-3 left-3">
                        <div className="badge badge-neutral badge-lg">
                          <FaTag className="w-3 h-3 mr-1" />
                          {event.eventType}
                        </div>
                      </div>
                    )}
                  </figure>

                  <div className="card-body p-4">
                    {/* Event Title */}
                    <h2 className="card-title text-lg font-bold line-clamp-2 mb-3">
                      {event.title}
                    </h2>

                    {/* Event Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-base-content/70">
                        <FaCalendarAlt className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                        <span>
                          {new Date(event.eventDate).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>

                      <div className="flex items-center text-sm text-base-content/70">
                        <FaMapMarkerAlt className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>

                      {event.participant && (
                        <div className="flex items-center text-sm text-base-content/70">
                          <FaUsers className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                          <span>{event.participant || 0} participants</span>
                        </div>
                      )}
                    </div>

                    {/* Description Preview */}
                    {event.description && (
                      <p className="text-sm text-base-content/60 line-clamp-2 mb-4 text-left">
                        {event.description}
                      </p>
                    )}

                    {/* Action Buttons */}
                    <div className="card-actions justify-end mt-auto">
                      <div className="btn-group space-x-4">
                        <Link
                          to={`/view-event/${event._id}`}
                          className="btn btn-sm btn-secondary"
                        >
                          <FaEye className="w-3 h-3" />
                        </Link>
                        <button
                          onClick={() => {
                            setModalData(event);
                            setIsEditModalOpen(true);
                           
                            setEventDate(new Date(event.eventDate));
                          }}
                          className="btn btn-sm btn-primary text-white"
                        >
                          <FaEdit className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event._id)}
                          className="btn btn-sm btn-error"
                        >
                          <FaTrash className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Edit Event Modal */}
                  
                </div>
              );
            })}

            {isEditModalOpen && (
                    <div className="modal modal-open">
                      <div className="modal-box w-11/12 max-w-2xl">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-bold text-lg">Edit Event</h3>
                          <button
                            className="btn btn-sm btn-circle bg-base-300"
                            onClick={() => setIsEditModalOpen(false)}
                          >
                            <FaTimes />
                          </button>
                        </div>

                        <form
                          onSubmit={(e) => handleUpdateEvent(e, modalData._id)}
                          className="space-y-4"
                        >
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Event Title: </span>
                            </label>
                            <input
                              type="text"
                              name="title"
                              defaultValue={modalData?.title}
                              className="input input-bordered"
                              required
                            />
                          </div>

                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Event Type: </span>
                            </label>
                            <select
                              name="eventType"
                              className="select select-bordered"
                              defaultValue={modalData?.eventType}
                              required
                            >
                              <option value="">Select Type</option>
                              <option value="cleanup">Cleanup</option>
                              <option value="plantation">Plantation</option>
                              <option value="donation">donation</option>
                              <option value="healthcare">Healthcare</option>
                              <option value="food">Food Donation</option>
                              <option value="education">Education</option>
                              <option value="awareness">Aware People</option>
                            </select>
                          </div>

                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Location: </span>
                            </label>
                            <input
                              name="location"
                              type="text"
                              defaultValue={modalData?.location}
                              className="input input-bordered"
                              required
                            />
                          </div>

                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Event Date: </span>
                              <div className="relative">
                                <DatePicker
                                  selected={eventDate}
                                  value={eventDate}
                                  onChange={(date) => setEventDate(date)}
                                  minDate={new Date(Date.now())}
                                  dateFormat="MMMM d, yyyy"
                                  placeholderText="Select event date"
                                  className={`input input-lg w-full rounded-2xl border-2 transition-all duration-300 border-base-300 focus:border-primary `}
                                  wrapperClassName="w-full"
                                  required
                                />
                                <FaCalendarAlt className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary/60 cursor-pointer pointer-events-none z-10" />
                              </div>
                            </label>
                          </div>

                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">
                                Thumbnail URL:{" "}
                              </span>
                            </label>
                            <input
                              name="thumbnailUrl"
                              defaultValue={modalData?.thumbnailUrl}
                              type="url"
                              className="input input-bordered"
                            />
                          </div>

                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Description: </span>
                            </label>
                            <textarea
                              name="description"
                              defaultValue={modalData?.description}
                              className="textarea textarea-bordered h-24"
                            ></textarea>
                          </div>

                          <div className="modal-action">
                            <button
                              type="button"
                              className="btn btn-secondary btn-outline"
                              onClick={() => setIsEditModalOpen(false)}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="btn btn-primary text-white"
                            >
                              <FaSave className="mr-2" />
                              Update Event
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageEvents;
