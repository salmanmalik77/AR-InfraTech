import React from "react";
import { motion } from "framer-motion";
import { slideUpVariants, zoomInVariants } from "./animation";
import { planning } from "../export";
const Working = () => {
  return (
    <div id="working" className="w-full bg-[#E5E5E5]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={slideUpVariants}
        className="lg:w-[80%] w-[90%] m-auto py-[60px] flex flex-col justify-between 
  items-center gap-[20px]"
      >
        <motion.h1
          variants={slideUpVariants}
          className="text-blue-400 text-2xl"
        >
          Step By Step
        </motion.h1>
        <motion.h1
          variants={slideUpVariants}
          className="text-[#1E293B]
      uppercase text-[35px] font-bold text-center "
        >
          How its Working
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
          className="w-full grid lg:grid-cols-4 grid-cols-1 justify-center
                     itmes-start gap-[20px] mt-[30px] "
        >
          {planning.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center
                        gap-5 border-2 rounded-mg py-6 bg-[#f8be5c] hover:bg-[#FF4F5A] "
            >
              <div>
                <item.icon
                  className=" border-[#c38d2f] size-[80px]  hover:bg-[#FF4F5A] 
                         border-4 fill-black p-4 cursor-pointer"
                ></item.icon>
              </div>
              <h1 className="text-xl font-bold uppercase  text-white">
                {item.title}
              </h1>
              <p className="text-[18px] text-center text-white ">
                {item.about}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Working;
