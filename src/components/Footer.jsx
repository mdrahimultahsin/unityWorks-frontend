import logo from "../assets/logo.png";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHeart,
  FaGlobe,
  FaQuestionCircle,
  FaNewspaper,
  FaArrowUp,
} from "react-icons/fa";
import {useState, useEffect} from "react";
import {Link} from "react-router";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: "smooth"});
  };

  const footerLinks = {
    platform: [
      {name: "Discover Events", href: "/upcoming-events"},
      {name: "Create Event", href: "/create-event"},
      {name: "Manage Events", href: "/manage-events"},
      {name: "Join Event", href: "/joined-events"},
    ],
    company: [
      {name: "About Us", href: "#"},
      {name: "Our Mission", href: "#"},
      {name: "Team", href: "#"},
    ],
    support: [
      {name: "Help Center", href: "#"},
      {name: "Contact Support", href: "#"},
      {name: "Community Guidelines", href: "#"},
    ],
  };

  

  return (
    <div className="relative  overflow-hidden border-t border-base-200">
      <div className="relative">
        {/* Main Footer Content */}
        <div className="py-16 bg-base-100">
          <div className=" mx-auto px-2">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 px-4 lg:px-16">
              {/* Brand Section */}
              <div className="lg:col-span-1">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Link
                      to="/"
                      className="cursor-pointer text-2xl font-bold  flex items-center font-heading"
                    >
                      <img className="w-12" src={logo} alt="" />
                      UnityWorks
                    </Link>
                  </div>
                  <p className="text-base-content/70 leading-relaxed mb-6">
                    Empowering communities worldwide to create positive change
                    through collaborative action and shared purpose.
                  </p>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-base-content/70">
                    <FaMapMarkerAlt className="text-primary" />
                    <span>123 Street, Impact City, Bangladesh</span>
                  </div>
                  <div className="flex items-center gap-3 text-base-content/70">
                    <FaPhone className="text-primary" />
                    <span>+1 123-123-4567</span>
                  </div>
                  <div className="flex items-center gap-3 text-base-content/70">
                    <FaEnvelope className="text-primary" />
                    <span>hello@unityworks.com</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-3">
                  <a href="https://www.facebook.com/" target="blank" className="bg-base-300 p-3 rounded-full text-base-content/70 hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110">
                    <FaFacebookF className="text-lg" />
                  </a>
                  <a href="https://www.instagram.com/" target="blank" className="bg-base-300 p-3 rounded-full text-base-content/70 hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110">
                    <FaInstagram className="text-lg" />
                  </a>
                  <a href="https://www.linkedin.com/" target="blank" className="bg-base-300 p-3 rounded-full text-base-content/70 hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110">
                    <FaLinkedinIn className="text-lg" />
                  </a>
                  <a href="https://www.youtube.com/" target="blank" className="bg-base-300 p-3 rounded-full text-base-content/70 hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110">
                    <FaYoutube className="text-lg" />
                  </a>
                  
                </div>
              </div>

              {/* Links Sections */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Platform Links */}
                  <div>
                    <h4 className="text-lg font-bold text-base-content mb-6 flex items-center gap-2">
                      <FaGlobe className="text-primary" />
                      Platform
                    </h4>
                    <ul className="space-y-3">
                      {footerLinks.platform.map((link, index) => (
                        <li key={index}>
                          <Link
                            to={link.href}
                            className="text-base-content/70 hover:text-primary transition-colors duration-300 hover:translate-x-1 transform inline-block"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Company Links */}
                  <div>
                    <h4 className="text-lg font-bold text-base-content mb-6 flex items-center gap-2">
                      <FaNewspaper className="text-secondary" />
                      Company
                    </h4>
                    <ul className="space-y-3">
                      {footerLinks.company.map((link, index) => (
                        <li key={index}>
                          <a
                            href={link.href}
                            className="text-base-content/70 hover:text-secondary transition-colors duration-300 hover:translate-x-1 transform inline-block"
                          >
                            {link.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Support Links */}
                  <div>
                    <h4 className="text-lg font-bold text-base-content mb-6 flex items-center gap-2">
                      <FaQuestionCircle className="text-accent" />
                      Support
                    </h4>
                    <ul className="space-y-3">
                      {footerLinks.support.map((link, index) => (
                        <li key={index}>
                          <a
                            href={link.href}
                            className="text-base-content/70 hover:text-accent transition-colors duration-300 hover:translate-x-1 transform inline-block"
                          >
                            {link.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-base-300 py-6 border-t border-base-content/10">
          <div className="mx-auto container">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-base-content/70">
                <span>© 2024 UnityWorks. Made with</span>
                <FaHeart className="text-red-500 animate-pulse" />
                <span>for a better world.</span>
              </div>

              <div className="flex items-center gap-6 text-sm text-base-content/70">
              
                <span>🔒 Your data is secure</span>
                <span>♿ Accessibility friendly</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-primary hover:bg-primary/90 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 z-50 animate-bounce"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-xl" />
        </button>
      )}
    </div>
  );
};

export default Footer;
