import React from "react";
import Header from "./Sections/Header";
import Footer from "./Sections/Footer";
import Hero from "./Sections/Hero";
import About from "./Sections/About";
import Services from "./Sections/Services";
import Portfolio from "./Sections/Portfolio";
import Working from "./Sections/Working";
import Testimonials from "./Sections/Testimonials";
import Contact from "./Sections/Contact";
const App = () => {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Working />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
};

export default App;
