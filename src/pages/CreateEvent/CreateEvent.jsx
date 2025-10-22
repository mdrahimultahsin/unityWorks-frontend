import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaCheck, FaArrowLeft } from "react-icons/fa";
import { FiUpload, FiMapPin, FiCalendar, FiType, FiFileText } from "react-icons/fi";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const CreateEvent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [showSuccess, setShowSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [eventDate, setEventDate] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [maxParticipant, setMaxParticipant] = useState("");
  const [titleErrorMsg, setTitleErrorMsg] = useState("");
  const [descriptionErrorMsg, setDescriptionErrorMsg] = useState("");
  const [maxParticipantError, setMaxParticipantError] = useState("");

  const eventTypes = [
    { value: "", label: "Select Event Type" },
    { value: "cleanup", label: "🌊 Clean up Drive" },
    { value: "plantation", label: "🌱 Tree Plantation" },
    { value: "donation", label: "❤️ Donation Drive" },
    { value: "education", label: "📚 Educational Workshop" },
    { value: "healthcare", label: "🏥 Healthcare Camp" },
    { value: "food", label: "🍽️ Food Distribution" },
    { value: "awareness", label: "👴 Awareness Program" },
  ];

  const handleImageInputChange = (e) => {
    if (e.target.value) {
      setImagePreview(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate maxParticipant
    const maxPartNum = parseInt(maxParticipant, 10);
    if (isNaN(maxPartNum) || maxPartNum <= 0) {
      setMaxParticipantError("Please enter a valid number for max participants");
      return;
    }

    const form = new FormData(e.target);
    const formData = Object.fromEntries(form);

    const eventData = {
      ...formData,
      maxParticipant: maxPartNum,
      eventDate: eventDate?.toISOString(),
      email: user.email,
      organizer: user.displayName,
      organizerPhoto: user?.photoURL,
      participant: 0, // initialize participant count
    };

    // Add event to DB
    fetch(`${import.meta.env.VITE_apiURL}/add-event`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${user?.accessToken}`,
      },
      body: JSON.stringify(eventData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setShowSuccess(true);
          setTimeout(() => {
            navigate("/upcoming-events");
          }, 3000);
        }
      })
      .catch((err) => console.error(err));
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-base-100 rounded-3xl p-8 shadow-2xl border border-success/20 text-center">
            <div className="bg-success/10 p-4 rounded-full w-fit mx-auto mb-6 animate-pulse">
              <FaCheck className="text-4xl text-success" />
            </div>
            <h2 className="text-3xl font-bold text-base-content mb-4">
              Event Created Successfully!
            </h2>
            <p className="text-base-content/70 mb-6">
              Your event has been created and will be visible to upcoming events. You'll be redirected shortly.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-300 via-base-300 to-base-300 py-8 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-ghost mb-4 hover:bg-primary/10"
          >
            <FaArrowLeft className="mr-2" />
            Back to Events
          </button>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-base-content mb-4">
              Create New <span className="text-primary">Community Event</span>
            </h1>
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              Organize a meaningful event that brings your community together
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-base-100 rounded-3xl shadow-lg border border-base-300 overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-secondary p-6">
            <div className="flex items-center gap-3 text-white">
              <div className="bg-white/20 p-2 rounded-full">
                <img className="w-10 h-10 rounded-full object-cover" src={user?.photoURL} alt="" />
              </div>
              <div>
                <h3 className="font-bold">Creating as: {user?.email}</h3>
                <p className="text-sm text-white/80">Verified User</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Event Title */}
                <div>
                  <label className="label">
                    <span className="label-text text-base font-semibold flex items-center gap-2">
                      <FiType className="text-primary" />
                      Event Title *
                    </span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => {
                      const input = e.target.value;
                      if (input.length <= 50) {
                        setTitle(input);
                      } else {
                        setTitleErrorMsg("Title must not exceed 50 characters");
                      }
                    }}
                    placeholder="Enter a compelling event title"
                    className="input input-lg w-full rounded-2xl border-2 border-base-300 focus:border-primary"
                    required
                  />
                  <span className="text-right text-neutral block">{title.length}/50</span>
                  {title.length >= 50 && <span className="text-red-500 text-sm">{titleErrorMsg}</span>}
                </div>

                {/* Event Type */}
                <div>
                  <label className="label">
                    <span className="label-text text-base font-semibold flex items-center gap-2">
                      <FiFileText className="text-secondary" />
                      Event Type *
                    </span>
                  </label>
                  <select
                    name="eventType"
                    className="select select-lg w-full rounded-2xl border-2 border-base-300 focus:border-secondary text-neutral"
                    required
                  >
                    {eventTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="label">
                    <span className="label-text text-base font-semibold flex items-center gap-2">
                      <FiMapPin className="text-accent" />
                      Location *
                    </span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter event location"
                    className="input input-lg w-full rounded-2xl border-2 border-base-300 focus:border-accent"
                    required
                  />
                </div>

                {/* Event Date */}
                <div>
                  <label className="label">
                    <span className="label-text text-base font-semibold flex items-center text-neutral gap-2">
                      <FiCalendar className="text-accent" />
                      Event Date *
                    </span>
                  </label>
                  <div className="relative">
                    <DatePicker
                      selected={eventDate}
                      onChange={(date) => setEventDate(date)}
                      minDate={new Date(Date.now())}
                      dateFormat="MMMM d, yyyy"
                      placeholderText="Select event date"
                      className="input input-lg w-full rounded-2xl border-2 border-base-300 focus:border-primary"
                      wrapperClassName="w-full"
                      name="eventDate"
                      required
                    />
                    <FaCalendarAlt className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary/60 pointer-events-none" />
                  </div>
                </div>

                {/* Max Participant */}
                <div>
                  <label className="label">
                    <span className="label-text text-base font-semibold flex items-center gap-2">
                      <FiMapPin className="text-accent" />
                      Max Participant *
                    </span>
                  </label>
                  <input
                    type="number"
                    name="maxParticipant"
                    value={maxParticipant}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (!isNaN(val) && val > 0) {
                        setMaxParticipant(val);
                        setMaxParticipantError("");
                      } else {
                        setMaxParticipant("");
                        setMaxParticipantError("Enter a valid number greater than 0");
                      }
                    }}
                    placeholder="Ex: 100"
                    className="input input-lg w-full rounded-2xl border-2 border-base-300 focus:border-accent"
                    required
                  />
                  {maxParticipantError && <span className="text-red-500 text-sm">{maxParticipantError}</span>}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Thumbnail URL */}
                <div>
                  <label className="label">
                    <span className="label-text text-base font-semibold flex items-center gap-2">
                      <FiUpload className="text-secondary" />
                      Thumbnail Image URL *
                    </span>
                  </label>
                  <input
                    type="url"
                    name="thumbnailUrl"
                    onChange={handleImageInputChange}
                    placeholder="https://example.com/image.jpg"
                    className="input input-lg w-full rounded-2xl border-2 border-base-300 focus:border-secondary"
                    required
                  />
                  {imagePreview && (
                    <div className="mt-4">
                      <p className="text-sm text-base-content/70 mb-2">Preview:</p>
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Event thumbnail preview"
                        className="w-full h-48 object-cover rounded-2xl"
                      />
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="label">
                    <span className="label-text text-base font-semibold flex items-center text-neutral gap-2">
                      <FiFileText className="text-accent" />
                      Event Description *
                    </span>
                  </label>
                  <textarea
                    name="description"
                    placeholder="Describe your event..."
                    rows={6}
                    maxLength={1000}
                    value={description}
                    onChange={(e) => {
                      const input = e.target.value;
                      if (input.length <= 1000) {
                        setDescription(input);
                      } else {
                        setDescriptionErrorMsg("Description must not exceed 1000 characters");
                      }
                    }}
                    className="textarea textarea-lg w-full rounded-2xl border-2 border-base-300 focus:border-accent"
                    required
                  />
                  <span className="text-right text-neutral block">{description.length}/1000</span>
                  {description.length >= 1000 && <span className="text-red-500 text-sm">{descriptionErrorMsg}</span>}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-base-300">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button type="button" className="btn bg-base-300 btn-outline btn-lg rounded-full px-8" onClick={() => navigate(-1)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary text-white btn-lg rounded-full px-8 hover:scale-105 transition-transform duration-300">
                  <FaCheck className="mr-2" /> Create Event
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-base-100/50 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-base-300">
          <h3 className="text-lg font-bold text-base-content mb-4">💡 Tips for Creating a Great Event</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-base-content/70">
            <div>• Use a clear, descriptive title</div>
            <div>• Choose high-quality images</div>
            <div>• Provide detailed descriptions</div>
            <div>• Select appropriate event types</div>
            <div>• Include specific location details</div>
            <div>• Plan events at least 24 hours in advance</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
