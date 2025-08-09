const ContactSection = () => {
  return (
    <section className="py-10 p-6 mx-6 lg:mx-16 bg-base-300 rounded-lg shadow-md mt-12">
      <h2 className="text-3xl font-bold mb-6 text-primary font-urbanist">Contact Us</h2>
      <form className="space-y-6">
        <div>
          <label htmlFor="name" className="block mb-2 font-medium text-base-content">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Your name"
            className="w-full input input-primary rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 font-medium text-base-content">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            className="w-full input input-bordered input-primary rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="message" className="block mb-2 font-medium text-base-content">
            Message
          </label>
          <textarea
            id="message"
            placeholder="Your message"
            rows="5"
            className="w-full textarea textarea-bordered textarea-primary rounded-lg resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full text-white"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};

export default ContactSection;
