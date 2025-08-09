import axios from "axios";
import {
  FiCalendar,
  FiMapPin,
  FiUser,
  FiMail,
  FiTag,
  FiUsers,
  FiArrowLeft,
} from "react-icons/fi";
import {useNavigate, useParams} from "react-router";
import useAuth from "../../hooks/useAuth";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import Spinner from "../../components/Spinner";

const EventDetails = () => {
  const [eventData, setEventData] = useState({});
  const [joinedStatus, setJoinedStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {user} = useAuth();
  const {id} = useParams();
  const params = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_apiURL}/view-event/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setEventData(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load event data");
        setLoading(false);
      });
  }, [params, user]);

  const handleJoinEvent = (eventId) => {
    if (!user) {
      return toast.error("Please login to join event");
    }
    axios
      .post(`${import.meta.env.VITE_apiURL}/join-event`, {
        eventId,
        eventTitle: eventData.title,
        eventLocation: eventData?.location,
        eventDate: eventData?.eventDate,
        userName: user?.displayName,
        userEmail: user?.email,
        userPhotoURL: user?.photoURL,
        joinedAt: new Date().toISOString(),
      })
      .then((res) => {
        if (res.data.acknowledged) {
          toast.success("Joined an event");
          setJoinedStatus(true);
        }
      });
    axios
      .patch(`${import.meta.env.VITE_apiURL}/join-event/${eventId}`)
      .then(() => {});
  };
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_apiURL}/already-joined/${id}`)
      .then((res) => {
        setJoinedStatus(res.data.isJoined);
      });
  }, [id, user]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="min-h-screen bg-base-100 ">
      {/* Header with Back Button */}
      <div className="navbar bg-base-100 shadow-sm border-b border-base-200 px-6 lg:px-16">
        <div className="navbar-start">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-ghost btn-circle hover:bg-base-300"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
        </div>
        <div className="navbar-center">
          <h1 className="text-lg font-bold font-heading">Event Details</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Hero Image */}
        <div className="relative mb-6">
          <img
            src={eventData?.thumbnailUrl || "/placeholder.svg"}
            alt={eventData?.title}
            className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg"
          />
          <div className="absolute top-4 left-4">
            <div className={`badge badge-lg font-semibold capitalize`}>
              <FiTag className="w-3 h-3 mr-1" />
              {eventData?.eventType}
            </div>
          </div>
        </div>

        {/* Event Title and Basic Info */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-4 font-heading">
            {eventData?.title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FiCalendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold">
                    {new Date(eventData?.eventDate).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FiMapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold">{eventData?.location}</p>
                  <p className="text-sm text-base-content/70">Uttara, Dhaka</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FiUser className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold">{eventData?.organizer}</p>
                  <p className="text-sm text-base-content/70">
                    Event Organizer
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FiMail className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold">{eventData?.email}</p>
                  <p className="text-sm text-base-content/70">Contact Email</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Participation Stats */}
        <div className="card bg-base-300 shadow-sm mb-6">
          <div className="card-body p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FiUsers className="w-5 h-5 text-primary" />
                <span className="font-semibold">Participants</span>
              </div>
              <span className="text-sm text-base-content/70">
                {eventData.participant || 0} /{" "}
                {eventData.maxParticipant ? eventData.maxParticipant : 100}
              </span>
            </div>
            <progress
              className="progress progress-primary w-full"
              value={eventData.participant || 0}
              max="100"
            ></progress>
            <p className="text-sm text-base-content/70 mt-2">
              {100 - (eventData.participant || 0)} + Spots remaining
            </p>
          </div>
        </div>

        {/* Event Description */}
        <div className="card bg-base-100 shadow-sm border border-base-200 mb-6">
          <div className="card-body">
            <h2 className="card-title text-xl mb-2 font-heading font-bold">
              About This Event
            </h2>
            <p className="text-base-content/80 leading-relaxed">
              {eventData?.description}
            </p>
          </div>
        </div>

        {/* Organizer Info */}
        <div className="card bg-base-100 shadow-sm border border-base-200 mb-8">
          <div className="card-body">
            <h3 className="card-title text-lg mb-3">Organizer</h3>
            <div className="flex items-center gap-4">
              {eventData.organizerPhoto ? (
                <div className="avatar">
                  <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                    <img src={eventData.organizerPhoto} />
                  </div>
                </div>
              ) : (
                <div className="avatar ">
                  <div className="bg-secondary text-primary-content rounded-full w-12 text-center ">
                    <span className="text-lg block mt-2 font-semibold text-white">
                      {eventData?.organizer?.charAt(0) || "R"}
                    </span>
                  </div>
                </div>
              )}

              <div>
                <p className="font-semibold">{eventData.organizer}</p>
                <p className="text-sm text-base-content/70">
                  {eventData?.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-base-100 border-t border-base-200 md:relative md:border-t-0 md:bg-transparent md:p-0">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => handleJoinEvent(eventData._id)}
              className="btn btn-primary rounded-full text-white btn-lg w-full cursor-pointer
    disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-base-300 disabled:text-base-content/50"
              disabled={joinedStatus}
              title={
                joinedStatus
                  ? "You've already joined this event"
                  : "Join this event to participate"
              }
            >
              <FiUsers className="w-5 h-5" />
              {joinedStatus ? "Already Joined" : "Join Event"}
            </button>
          </div>
        </div>

        {/* Add bottom padding on mobile to account for fixed button */}
        <div className="h-20 md:h-0"></div>
      </div>
    </div>
  );
};

export default EventDetails;
