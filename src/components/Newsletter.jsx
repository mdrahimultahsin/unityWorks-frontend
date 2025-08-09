import axios from "axios";
import {FaBullseye, FaEnvelope, FaHandsHelping} from "react-icons/fa";
import {FiArrowRight, FiCalendar, FiMail} from "react-icons/fi";
import {toast} from "react-toastify";

const Newsletter = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    axios
      .post(`${import.meta.env.VITE_apiURL}/subscribe`, {email})
      .then((res) => {
        if (res.data?.insertedId) {
          return toast.success("Subcribed successfully");
        }
      })
      .catch(() => {});
  };
  return (
    <div className="py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 ">
      <div className=" mx-auto px-8">
        <div className=" max-w-4xl mx-auto text-center">
          <div className="bg-base-100/80 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/20">
            <div className="mb-8">
              <div className="bg-primary/10 p-4 rounded-full w-fit mx-auto mb-6">
                <FaEnvelope className="text-4xl text-primary" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-heading text-base-content mb-6">
                Stay <span className="text-primary">Connected</span> with Our
                Community
              </h2>
              <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
                Get the latest updates on community events, impact stories, and
                opportunities to make a difference. Join thousands of
                changemakers in our newsletter community.
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-4"
              >
                <div className="flex-1 relative ">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    name="email"
                    required
                    className="input input-lg w-full pl-12 pr-4 rounded-full border-2 border-primary/20 focus:border-primary"
                  />
                  <FiMail className="z-[100] absolute left-4 top-1/2 transform -translate-y-1/2 text-primary/60" />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary text-white btn-lg rounded-full px-8 hover:scale-105 transition-transform duration-300"
                >
                  Subscribe
                  <FiArrowRight className="ml-2" />
                </button>
              </form>

              <p className="text-sm text-base-content/60 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="bg-secondary/10 p-3 rounded-full w-fit mx-auto mb-3">
                  <FiCalendar className="text-2xl text-secondary" />
                </div>
                <h4 className="font-bold text-base-content mb-2">
                  Weekly Updates
                </h4>
                <p className="text-sm text-base-content/70">
                  Get notified about new events and opportunities
                </p>
              </div>
              <div className="text-center">
                <div className="bg-accent/10 p-3 rounded-full w-fit mx-auto mb-3">
                  <FaBullseye className="text-2xl text-accent" />
                </div>
                <h4 className="font-bold text-base-content mb-2">
                  Impact Stories
                </h4>
                <p className="text-sm text-base-content/70">
                  Read inspiring stories from our community
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto mb-3">
                  <FaHandsHelping className="text-2xl text-primary" />
                </div>
                <h4 className="font-bold text-base-content mb-2">
                  Exclusive Access
                </h4>
                <p className="text-sm text-base-content/70">
                  Early access to special community initiatives
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
