import React from "react";

import heroimg from "../assets/heroimg.png";
import backgroundImage from "../assets/homeimg.webp";

import { motion } from "framer-motion";

import { slideUpVariants, zoomInVariants } from "./animation";

const Hero = () => {
  return (
    <div
      id="home"
      className="bg-gray w-full lg:h-[700px] h-fit m-auto pt-[50px]
      lg:pt-[0px] lg:px-[150px] px-[20px] flex justify-between items-center lg:flex-row flex-col
      lg:gap-5 gap-[50px] bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={slideUpVariants}
        className="lg:w-[50%] w-full flex flex-col justify-center items-start lg:gap-8 gap-4"
      >
        <motion.h1
          variants={slideUpVariants}
          className="text-blue-400 text-2xl"
        >
          WE ARE BUILDERS
        </motion.h1>
        <motion.h1
          variants={slideUpVariants}
          className="text-white uppercase text-[50px] font-bold"
        >
          we will build your dreams
        </motion.h1>
        <div className="w-[120px] h-[6px] bg-blue-400"></div>
        <p className="text-gray-200 text-[30px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          gravida cursus
        </p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={zoomInVariants}
          className="flex justify-center items-center gap-5"
        >
          <motion.button
            variants={zoomInVariants}
            className="bg-blue-500 hover:bg-white hover:text-black px-10 py-3 
            rounded-lg text-white font-bold"
          >
            Read More
          </motion.button>
          <motion.button
            variants={zoomInVariants}
            className="border-blue-500 hover:bg-blue-500 hover:text-white
            border-2 px-10 py-3 rounded-lg text-white font-bold"
          >
            Reach Us
          </motion.button>
        </motion.div>
      </motion.div>
      <div className="w-[40%] flex flex-col justify-end items-end">
        <motion.img
          initial="hidden"
          whileInView="visible"
          variants={zoomInVariants}
          src={heroimg}
          alt="hero image"
          className="lg:h-[600] h-[450px]
          lg:mb-[-100px]"
        />
      </div>
    </div>
  );
};

export default Hero;
