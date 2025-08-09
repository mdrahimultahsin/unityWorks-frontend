import { FiArrowRight, FiUsers, FiTrendingUp, FiHeart } from "react-icons/fi"
import { FaBullseye, FaChartLine, FaStar, FaLeaf, FaHandsHelping } from "react-icons/fa"
import heroImg from "../assets/hero.avif"
import { useNavigate } from "react-router"
const Hero = () => {
  const navigate = useNavigate()
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-base-100 via-base-200 to-base-300">
      
     

      {/* Background Image with Theme-Aware Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 dark:opacity-20"
        style={{ backgroundImage: `url(${heroImg})` }}
      />

      
     {/* Overlay - horizontal fade */}
<div className="absolute inset-0 bg-gradient-to-r from-base-100/30 via-base-100/20 to-transparent dark:from-base-100/90 dark:via-base-100/80 dark:to-base-100/60" />

{/* Overlay - vertical fade */}
<div className="absolute inset-0 bg-gradient-to-t from-base-300/30 via-transparent to-transparent dark:from-base-300/60" />


      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        <div className=" mx-auto px-4 sm:px-6 lg:px-18 py-12 lg:py-20">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[80vh]">
           
            <div className="lg:col-span-7 space-y-8">
              
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-xl rounded-full px-4 py-2 border border-base-content/20 shadow-2xl hover:scale-105 transition-all duration-300 group">
                <div className="relative">
                  <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-full animate-spin-slow">
                    <FaStar className="text-white text-sm" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary p-2 rounded-full animate-ping opacity-20"></div>
                </div>
                <span className="text-base-content font-semibold text-sm sm:text-base tracking-wide font-primary">
                  🌟 Community Impact Platform
                </span>
              </div>

              {/* Enhanced Heading with Custom Fonts */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight text-base-content font-heading">
                  Join Hands for a{" "}
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient-x">
                      Better Tomorrow
                    </span>
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full animate-pulse"></div>
                    <div className="absolute -bottom-4 left-0 w-3/4 h-0.5 bg-gradient-to-r from-primary/50 to-transparent rounded-full"></div>
                  </span>
                </h1>
              </div>

              {/* Enhanced Description with Theme Colors */}
              <p className="text-lg sm:text-xl leading-relaxed text-base-content/80 max-w-2xl font-primary">
                Connect with your local community to create meaningful change. From environmental cleanups to
                educational workshops — discover, organize, and participate in impactful social events.
              </p>

              {/* Stats Row with Theme-Aware Colors */}
              <div className="flex flex-wrap gap-6 py-4">
                <div className="flex items-center gap-2 text-base-content group hover:scale-105 transition-transform duration-300">
                  <div className="p-2 bg-primary/20 rounded-full group-hover:bg-primary/30 transition-colors duration-300">
                    <FiUsers className="text-primary text-xl" />
                  </div>
                  <span className="font-bold text-2xl font-heading">10K+</span>
                  <span className="text-base-content/60 font-primary">Members</span>
                </div>
                <div className="flex items-center gap-2 text-base-content group hover:scale-105 transition-transform duration-300">
                  <div className="p-2 bg-secondary/20 rounded-full group-hover:bg-secondary/30 transition-colors duration-300">
                    <FaLeaf className="text-secondary text-xl" />
                  </div>
                  <span className="font-bold text-2xl font-heading">500+</span>
                  <span className="text-base-content/60 font-primary">Events</span>
                </div>
                <div className="flex items-center gap-2 text-base-content group hover:scale-105 transition-transform duration-300">
                  <div className="p-2 bg-accent/20 rounded-full group-hover:bg-accent/30 transition-colors duration-300">
                    <FiHeart className="text-accent text-xl" />
                  </div>
                  <span className="font-bold text-2xl font-heading">50+</span>
                  <span className="text-base-content/60 font-primary">Cities</span>
                </div>
              </div>

           
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button onClick={()=>navigate("/upcoming-events")} className="btn btn-primary text-white btn-lg group relative overflow-hidden font-bold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105 font-primary">
                  <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                    Explore Events
                    <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                <button onClick={()=>navigate("/create-event")} className="btn btn-outline btn-lg group bg-base-content/5 backdrop-blur-xl border-base-content/20 text-base-content hover:bg-base-content/10 transition-all duration-300 hover:scale-105 font-primary">
                  <span className="flex items-center justify-center gap-3 text-lg">
                    <FaHandsHelping className="group-hover:scale-110 transition-transform duration-300" />
                    Create Event
                  </span>
                </button>
              </div>
            </div>

            
            <div className="lg:col-span-5 space-y-6">
              {/* Feature Card 1 */}
              <div className="card bg-base-200/50 backdrop-blur-xl border border-base-content/10 shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2 group animate-float">
                <div className="card-body p-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="bg-gradient-to-br from-primary to-primary/80 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <FaBullseye className="text-white text-2xl" />
                      </div>
                      <div className="absolute inset-0 bg-primary/30 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                    </div>
                    <div className="text-base-content flex-1">
                      <div className="font-bold text-xl mb-1 font-heading">Impact Tracking</div>
                      <div className="text-base-content/70 text-sm leading-relaxed font-primary">
                        Real-time metrics and comprehensive analytics for every community initiative
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Card 2 */}
              <div className="card bg-base-200/50 backdrop-blur-xl border border-base-content/10 shadow-2xl hover:shadow-secondary/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2 group animate-float delay-200">
                <div className="card-body p-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="bg-gradient-to-br from-secondary to-secondary/80 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <FaChartLine className="text-white text-2xl" />
                      </div>
                      <div className="absolute inset-0 bg-secondary/30 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                    </div>
                    <div className="text-base-content flex-1">
                      <div className="font-bold text-xl mb-1 font-heading">Community Growth</div>
                      <div className="text-base-content/70 text-sm leading-relaxed font-primary">
                        Expanding network with passionate volunteers joining daily
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Card 3 */}
              <div className="card bg-base-200/50 backdrop-blur-xl border border-base-content/10 shadow-2xl hover:shadow-accent/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2 group animate-float delay-400">
                <div className="card-body p-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="bg-gradient-to-br from-accent to-accent/80 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <FiTrendingUp className="text-white text-2xl" />
                      </div>
                      <div className="absolute inset-0 bg-accent/30 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                    </div>
                    <div className="text-base-content flex-1">
                      <div className="font-bold text-xl mb-1 font-heading">Success Stories</div>
                      <div className="text-base-content/70 text-sm leading-relaxed font-primary">
                        Celebrating achievements and positive community transformations
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block text-center pt-4">
                <div className="inline-flex items-center gap-2 text-base-content/60 text-sm animate-bounce font-primary">
                  <span>Scroll to discover more</span>
                  <div className="w-1 h-8 bg-gradient-to-b from-primary to-transparent rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Hero
