// src/Sections/Header.jsx
import React, { useState } from "react";
import { FaXmark, FaBars } from "react-icons/fa6";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const toggleMenu = () => setisMenuOpen(!isMenuOpen);
  const closeMenu = () => setisMenuOpen(false);

  const navItems = [
    { link: "Home", path: "home" },
    { link: "About", path: "about" },
    { link: "Services", path: "services" },
    { link: "Projects", path: "projects" },
    { link: "Contact", path: "contact" },
  ];

  return (
    <nav className="w-full flex bg-[#E5E5E5] justify-between items-center lg:px-16 px-6 py-4 sticky top-0 z-50 shadow-md">
      {/* Clicking logo goes home */}
      <RouterLink
        to="/"
        className="text-[#FF4F5A] md:text-4xl text-3xl font-bold font-rubik"
      >
        AR-<span className="text-[#005AA7] italic">InfraTech</span>
      </RouterLink>

      <ul className="lg:flex justify-center items-center gap-6 hidden">
        {navItems.map(({ link, path }) => (
          <ScrollLink
            key={path}
            className="text-[#005AA7] uppercase font-semibold cursor-pointer py-3 rounded-full hover:bg-[#FF4F5A] hover:text-white text-[15px] transition duration-300"
            to={path}
            spy={true}
            offset={-100}
            smooth={true}
          >
            {link}
          </ScrollLink>
        ))}
      </ul>

      <div className="gap-3 md:flex hidden">
        <button className="bg-[#005AA7] hover:bg-[#FF4F5A] hover:text-white text-white px-6 py-2 rounded-full font-semibold transform hover:scale-105 transition-transform duration-300 cursor-pointer">
          Reach Us
        </button>

        {/* NEW Users button */}
        <RouterLink
          to="/users"
          className="bg-[#111] hover:bg-[#333] text-white px-6 py-2 rounded-full font-semibold transform hover:scale-105 transition-transform duration-300 cursor-pointer"
        >
          Users
        </RouterLink>
      </div>

      {/* Mobile menu toggle */}
      <div
        className="flex justify-between items-center lg:hidden"
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaXmark className="text-[#FF4F5A] text-3xl cursor-pointer" />
        ) : (
          <FaBars className="text-[#FF4F5A] text-3xl cursor-pointer" />
        )}
      </div>

      {/* Mobile menu */}
      <div
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } w-full h-fit bg-[#E5E5E5] p-4 absolute top-[72px] left-0`}
        onClick={closeMenu}
      >
        <ul className="flex flex-col justify-center items-center gap-2 w-full">
          {navItems.map(({ link, path }) => (
            <ScrollLink
              key={path}
              className="text-[#005AA7] uppercase font-semibold cursor-pointer p-2 rounded-lg hover:bg-[#FF4F5A] hover:text-white text-center w-full transition duration-300"
              to={path}
              spy={true}
              offset={-100}
              smooth={true}
            >
              {link}
            </ScrollLink>
          ))}
          {/* Mobile Users link */}
          <RouterLink
            to="/users"
            className="text-white uppercase font-semibold cursor-pointer p-2 rounded-lg bg-[#111] text-center w-full transition duration-300"
          >
            Users
          </RouterLink>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
