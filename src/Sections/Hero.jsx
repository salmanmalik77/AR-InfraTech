import React from "react";
import heroimg from "../assets/heroimg.png";
import three from "../assets/three.jpeg";
import five from "../assets/five.jpg";
import { motion } from "framer-motion";
import { slideUpVariants, zoomInVariants } from "./animation";

const Hero = () => {
  return (
    <div
      id="home"
      className="w-full lg:h-[700px] h-fit m-auto pt-[50px] lg:pt-0 lg:px-[150px] px-[20px] 
                 flex justify-between items-center lg:flex-row flex-col lg:gap-5 gap-[50px] 
                 bg-cover bg-center"
      style={{
        backgroundImage: `url(${five})`,
        backgroundColor: "#F1F5F9", // Light gray background
      }}
    >
      {/* Left Content */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={slideUpVariants}
        className="lg:w-[50%] w-full flex flex-col justify-center items-start lg:gap-8 gap-4"
      >
        <motion.h1
          variants={slideUpVariants}
          className="text-[#2563EB] text-2xl" // Blue heading
        >
          WE ARE BUILDERS
        </motion.h1>
        <motion.h1
          variants={slideUpVariants}
          className="text-[#1E293B] uppercase text-[40px] lg:text-[50px] font-bold leading-tight" // Dark gray main heading
        >
          We Will Build Your Dreams
        </motion.h1>
        <div className="w-[120px] h-[6px] bg-[#FF4F5A]"></div>

        <p className="text-[#E5E7EB] text-lg lg:text-[30px]">
          At AR-InfraTech, we bring your vision to life with quality, innovation, and expertise—whether it’s residential, commercial, or industrial. Your dream, our commitment.
        </p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={zoomInVariants}
          className="flex justify-start items-center gap-5"
        >
          <motion.button
            variants={zoomInVariants}
            className="bg-[#2563EB] hover:bg-[#FF4F5A] hover:text-white px-8 lg:px-10 py-3 
                       rounded-lg text-white font-bold transition duration-300"
          >
            Read More
          </motion.button>
          <motion.button
            variants={zoomInVariants}
            className="hover:bg-[#FF4F5A] hover:text-white border-2 px-8 lg:px-10 py-3 
                       rounded-lg text-[#2563EB] font-bold bg-white transition duration-300"
          >
            Reach Us
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Right Content */}
      <div className="lg:w-[40%] w-full flex justify-center items-center">
        <motion.img
          initial="hidden"
          whileInView="visible"
          variants={zoomInVariants}
          src={heroimg}
          alt="Innovative Infrastructure Solutions"
          className="lg:h-[600px] h-[450px] object-contain lg:mb-[-100px]"
        />
      </div>
    </div>
  );
};

export default Hero;
