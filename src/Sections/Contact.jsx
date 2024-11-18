import React from "react";
import { motion } from "framer-motion";
import { slideUpVariants, zoomInVariants } from "./animation";
const Contact = () => {
  return (
    <div id="contact" className="bg-[#E5E5E5]">
      <div
        className="lg:w-[80%] w-[90%] m-auto py-[60px] flex lg:flex-row flex-col 
                    justify-between items-start gap-[50px]"
        id="about"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={slideUpVariants}
          className="lg:w-[60%} w-full flex flex-col justify-center items-start gap-6"
        >
          <motion.h1
            variants={slideUpVariants}
            className="text-blue-500 text-2xl "
          >
            Contact Us
          </motion.h1>
          <motion.h1
            variants={slideUpVariants}
            className="text-[#1E293B] uppercase text-[35px] font-bold "
          >
            Reach us for any query
          </motion.h1>
          <div className="w-[120px] h-[6px] bg-[#FF4F5A]"></div>
          <p className="text-3xl italic text-gray-700 mt-[40px]">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam
            quos, rerum voluptatum consectetur dolor odit earum est. Enim,
            explicabo? Tempore, reiciendis. Nobis voluptas magnam sit vel!
            Fugiat officiis sunt ducimus?
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={slideUpVariants}
          className="lg:w-[40%] w-full flex flex-col justify-center items-start gap-6"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={zoomInVariants}
            className="flex flex-col justify-center items-start gap-4 w-full "
          >
            <input
              type="text"
              placeholder="Enter Full Name"
              className="px-6 py-3 border-[2px] border-[#f8be5c] text-black rounded-lg w-full "
            ></input>
            <input
              type="email"
              placeholder="Enter Email"
              className="px-6 py-3 border-[2px] border-[#f8be5c] text-black rounded-lg w-full "
            ></input>
            <input
              type="number"
              placeholder="Enter Mobile Number"
              className="px-6 py-3 border-[2px] border-[#f8be5c] text-black rounded-lg w-full "
            ></input>
            <textarea
              name=""
              placeholder="enter your message"
              id=""
              rows="4"
              className="px-6 py-3 border-[2px] border-[#f8be5c] text-black rounded-lg w-full "
            ></textarea>
            <motion.button
              variants={zoomInVariants}
              className="bg-blue-500 hover:bg-[#FF4F5A] hover:text-white px-10 py-4 
                       text-white font-bold rounded-lg w-full border-[#f8be5c]"
            >
              Submit
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
