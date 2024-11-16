import React from "react";
import { motion } from "framer-motion";
import { slideUpVariants, zoomInVariants } from "./animation";
import { allservices } from "../export";
const Services = () => {
  return (
    <div id="services" className="w-full  bg-gray-700">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={slideUpVariants}
        className="lg:w-[80%] w-[90%] m-auto py-[60px] flex flex-col justify-between 
    items-center gap-[20px]"
      >
        <motion.h1
          variants={slideUpVariants}
          className="text-blue-400 text-2xl
      "
        >
          Specifications
        </motion.h1>
        <motion.h1
          variants={slideUpVariants}
          className="text-white uppercase text-[40px] font-bold text-center "
        >
          Our Best Services
        </motion.h1>
        <motion.div
          variants={slideUpVariants}
          className="w-[120px] h-[6px] bg-blue-400"
        ></motion.div>
        {/* make div for services mappings from export js file */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={zoomInVariants}
          className="w-full grid lg:grid-cols-3 grid-cols-1 justify-center
        items-start gap-[20px] mt-[30px]"
        >
          {allservices.map((item, index) => (
            <motion.div
              variants={zoomInVariants}
              className="flex flex-col justify-center items-center gap-5 p-8 bg-gray-400
               rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
              key={index}
            >
              <img
                src={item.icon}
                alt="icon"
                className="w-[95px] border-4 border-blue-600 hover:bg-blue-500 rounded-lg p-2"
              />
              <div className="flex flex-col justify-center items-start gap-3">
                <h1 className="text-xl font-bold text-white">{item.title}</h1>
                <p className="text-[18px] text-white">{item.about}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Services;
