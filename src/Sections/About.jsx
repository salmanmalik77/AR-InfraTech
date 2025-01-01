import React from "react";
import { motion } from "framer-motion";
import { slideUpVariants, zoomInVariants } from "./animation";

const About = () => {
  return (
    <div
      className="w-full min-h-screen py-[60px] flex lg:flex-row flex-col 
                 justify-between items-start gap-[50px] bg-[#E5E5E5]"
      id="about"
    >
      {/* Left Content */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={slideUpVariants}
        className="lg:w-[60%] w-full flex flex-col justify-center items-start gap-6 px-4"
      >
        <motion.h1
          variants={slideUpVariants}
          className="text-[#005AA7] text-2xl font-bold"
        >
          WELCOME TO
        </motion.h1>
        <h1 className="md:text-4xl text-3xl font-bold font-rubik">
          <span className="text-[#FF4F5A]">AR-</span>
          <span className="text-[#005AA7] uppercase">InfraTech</span>
        </h1>
        <div className="w-[120px] h-[6px] bg-[#005AA7]"></div>
        <p className="text-lg italic text-gray-700 mt-[50px]">
          AR-InfraTech is a forward-thinking company specializing in innovative
          infrastructure solutions. We leverage cutting-edge technology to
          deliver high-quality construction, project management, and sustainable
          building solutions for clients across various industries. Our
          expertise spans residential, commercial, and industrial projects,
          ensuring tailored solutions that meet diverse client needs. With a
          commitment to excellence, we focus on integrating modern engineering
          practices, eco-friendly materials, and advanced methodologies to
          create infrastructure that is both resilient and future-ready. Partner
          with us to redefine the standards of quality, efficiency, and
          sustainability in the construction industry.
        </p>
      </motion.div>

      {/* Right Content */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={slideUpVariants}
        className="lg:w-[40%] w-full flex flex-col justify-center items-start gap-6 px-4"
      >
        <p className="text-gray-700 text-lg text-justify leading-relaxed">
          At AR-InfraTech, our mission is to shape the future of infrastructure
          by implementing sustainable, efficient, and reliable solutions. Our
          experienced team is dedicated to exceeding client expectations with
          innovative designs, precise engineering, and a focus on quality.
          Whether it’s urban development, commercial projects, or specialized
          infrastructure, we aim to deliver excellence every step of the way.
        </p>
        <p className="text-gray-700 text-lg text-justify leading-relaxed mt-4">
          Designing and constructing structures that withstand natural and
          man-made challenges ensures long-term reliability. Drawing on
          international standards and methodologies, we deliver infrastructure
          that’s globally competitive. We build lasting relationships by
          prioritizing transparency, open communication, and client
          satisfaction.
        </p>
        <p className="text-gray-700 text-lg text-justify leading-relaxed mt-4">
          Our innovative methods and efficient practices help deliver
          high-quality projects within budget constraints, enabling us to
          consistently meet and exceed expectations.
        </p>

        <motion.button
          variants={zoomInVariants}
          className="bg-[#005AA7] hover:bg-[#FF4F5A] hover:text-white px-10 py-3 
                     rounded-lg font-bold text-white transition duration-300"
        >
          Read More
        </motion.button>
      </motion.div>
    </div>
  );
};

export default About;
