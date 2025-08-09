import React from "react";
import Hero from "../../components/Hero";
import Newsletter from "../../components/Newsletter";
import Gallery from "../../components/Gallery";
import Feature from "../../components/Feature";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section>
        <Hero />
      </section>

      {/* Feature Section */}
      <section>
        <Feature />
      </section>
      {/* Gallery Section */}
      <section>
        <Gallery />
      </section>

      {/* Newsletter Section */}
      <section>
        <Newsletter />
      </section>
    </div>
  );
};

export default Home;
