import React from "react";
import { FaArrowUp, FaCopyright } from "react-icons/fa6";
import { Link } from "react-scroll";

const Footer = () => {
  // Function to ensure the first scroll always works
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div
        className="bg-[#E5E5E5] text-white flex justify-center items-center gap-2
    p-5"
      >
        <FaCopyright className="fill-[#f8be5c] lg:size-7 size-8 " />
        <p className="text-lg text-center text-gray-700 ">
          Copyright 2025, AR InfraTech, All Right Reserved
        </p>
      </div>
      {/* scroll to top button */}
      <div
        id="icon-box"
        className="bg-blue-500 text-white p-3 rounded-full hover:bg-[#FF4F5A]
              hover:text-white cursor-pointer fixed lg:bottom-6 right-6 bottom-6"
        onClick={scrollToTop} // Force scroll to top
      >
        <Link to="home" spy={true} offset={0} smooth={true} duration={500}>
          <FaArrowUp className="size-5 " />
        </Link>
      </div>
    </>
  );
};

export default Footer;
