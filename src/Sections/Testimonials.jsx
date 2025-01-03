import React from "react";
import { motion } from "framer-motion";
import { slideUpVariants, zoomInVariants } from "./animation"; // Ensure these variants are defined appropriately
import { clients } from "../export"; // Ensure you have a clients array exported from export.js

const Testimonials = () => {
  return (
    <div id="clients" className="w-full bg-[#E5E5E5] py-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={slideUpVariants}
        className="lg:w-[75%] w-[90%] m-auto flex flex-col justify-center 
                   items-center gap-[20px]"
      >
        <motion.h1
          variants={slideUpVariants}
          className="text-blue-400 text-2xl"
        >
          Testimonials
        </motion.h1>
        <motion.h1
          variants={slideUpVariants}
          className="text-[#1E293B] uppercase text-[35px] font-bold text-center"
        >
          What Our Clients Say
        </motion.h1>
        <motion.div
          variants={slideUpVariants}
          className="w-[120px] h-[6px] bg-[#FF4F5A]"
        ></motion.div>

        {/* make div for services mappings from export js file */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={zoomInVariants}
          className="w-full grid lg:grid-cols-3 grid-cols-1 justify-center 
                     items-start gap-8 mt-[30px]"
        >
          {clients.map((item, index) => (
            <motion.div
              variants={zoomInVariants}
              className="flex flex-col justify-center items-center bg-[#f8be5c] 
                         rounded-lg shadow-lg p-6 hover:bg-[#FF4F5A] transition-colors 
                         duration-300"
              key={index}
            >
              <div className="border-2 border-[#c38d2f] bg-[#f6c673] p-4 rounded-md">
                <p className="text-white text-lg text-center">"{item.about}"</p>
              </div>
              <div className="flex flex-col justify-center items-center gap-3 mt-6">
                <img
                  className="w-24 h-24 object-cover rounded-full border-4 border-[#c38d2f]
                             bg-white p-1"
                  src={item.image}
                  alt={`${item.name} testimonial`}
                />
                <h1 className="text-white text-2xl font-semibold">
                  {item.name}
                </h1>
                <h2 className="text-white text-xl">{item.post}</h2>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Testimonials;
