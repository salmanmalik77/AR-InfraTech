import React from "react";
import { motion } from "framer-motion";
import { slideUpVariants, zoomInVariants } from "./animation";

const About = () => {
  return (
    <div
      className="lg:w-[80%] w-[90%] m-auto py-[60px] flex lg:flex-row flex-col 
                 justify-between items-start gap-[50px]"
      id="about"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={slideUpVariants}
        className="lg:w-[60%] w-full flex flex-col justify-center items-start gap-6"
      >
        <motion.h1
          variants={slideUpVariants}
          className="text-blue-400 text-2xl"
        >
          WELCOME TO{" "}
        </motion.h1>
        {/* <motion.h1
          variants={slideUpVariants}
          className="text-white uppercase text-[40px] font-bold"
        >
          AR - InfraTech
        </motion.h1> */}
        <h1 className="text-white md:text-4xl text-3xl font-bold font-rubik">
          AR-
          <span className="text-blue-400 uppercase text-[40px] font-bold">
            InfraTech
          </span>
        </h1>
        <div className="w-[120px] h-[6px] bg-blue-400"></div>
        <p className="text-lg italic text-gray-200 mt-[50px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
          quos, rerum voluptatum consectetur dolor odit earum est. Enim,
          explicabo? Tempore, reiciendis. Nobis voluptas magnam sit vel! Fugiat
          officiis sunt ducimus?
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={slideUpVariants}
        className="lg:w-[40%] w-full flex flex-col justify-center items-start gap-6"
      >
        <p className="text-gray-300 text-lg text-justify">
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
          className="bg-blue-500 hover:bg-white hover:text-black px-10 py-3 
                     rounded-lg font-bold text-black transition duration-300"
        >
          Read More
        </motion.button>
      </motion.div>
    </div>
  );
};

export default About;
