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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
          quos, rerum voluptatum consectetur dolor odit earum est. Enim,
          explicabo? Tempore, reiciendis. Nobis voluptas magnam sit vel! Fugiat
          officiis sunt ducimus?
        </p>
      </motion.div>

      {/* Right Content */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={slideUpVariants}
        className="lg:w-[40%] w-full flex flex-col justify-center items-start gap-6 px-4"
      >
        <p className="text-gray-700 text-lg text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus,
          maiores. Pariatur nulla illum accusamus nemo maiores et aspernatur quo
          sint cumque est voluptates incidunt omnis aliquam fuga amet dolorem
          blanditiis dignissimos, eius itaque esse exercitationem minus non
          reiciendis! Quisquam temporibus sequi a ipsum odio, corrupti eveniet?
          Beatae ipsum rerum perspiciatis recusandae rem omnis atque dignissimos
          quidem velit non. Voluptatem est deleniti, ea, provident modi quidem
          doloribus illum aliquam dignissimos ipsa consectetur optio praesentium
          magni laudantium quae eligendi quaerat repudiandae minus voluptate
          reiciendis. Ex, saepe assumenda. Quas cupiditate veniam aut quaerat
          obcaecati exercitationem vitae eaque, recusandae id dignissimos est
          eligendi qui.
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
