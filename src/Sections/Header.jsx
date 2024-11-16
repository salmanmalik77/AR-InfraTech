import React, { useState } from "react";
import { FaXmark, FaBars } from "react-icons/fa6";
import { Link } from "react-scroll";

const Header = () => {
  const [isMenuOpen, setisMenuOpen] = useState(false);

  const toggleMenu = () => {
    setisMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setisMenuOpen(false);
  };

  const navItems = [
    { link: "Home", path: "home" },
    { link: "About", path: "about" },
    { link: "Services", path: "services" },
    { link: "Projects", path: "projects" },
    { link: "Contact", path: "contact" },
  ];

  return (
    <nav
      className="w-full flex bg-gray-900 justify-between items-center lg:px-16
                 px-6 py-4 sticky top-0 z-50 shadow-md"
    >
      <h1 className="text-white md:text-4xl text-3xl font-bold font-rubik">
        AR-
        <span className="text-blue-400 italic">InfraTech</span>
      </h1>
      <ul className="lg:flex justify-center items-center gap-6 hidden">
        {navItems.map(({ link, path }) => (
          <Link
            key={path}
            className="text-gray-300 uppercase font-semibold cursor-pointer 
                      py-3 rounded-full hover:bg-blue-400 hover:text-white text-[15px] transition duration-300"
            to={path}
            spy={true}
            offset={-100}
            smooth={true}
          >
            {link}
          </Link>
        ))}
      </ul>
      <button
        className="bg-blue-500 hover:bg-white hover:text-blue-500 text-white px-6 py-2 rounded-full 
                   font-semibold transform hover:scale-105 transition-transform duration-300 
                   cursor-pointer md:flex hidden"
      >
        Reach Us
      </button>
      {/* Mobile menu toggle button */}
      <div
        className="flex justify-between items-center lg:hidden"
        onClick={toggleMenu}
      >
        <div>
          {isMenuOpen ? (
            <FaXmark className="text-blue-400 text-3xl cursor-pointer" />
          ) : (
            <FaBars className="text-blue-400 text-3xl cursor-pointer" />
          )}
        </div>
      </div>
      {/* Mobile menu */}
      <div
        className={`${isMenuOpen ? "flex" : "hidden"} w-full h-fit bg-blue-500 
            p-4 absolute top-[72px] left-0`}
        onClick={closeMenu}
      >
        <ul className="flex flex-col justify-center items-center gap-2 w-full">
          {navItems.map(({ link, path }) => (
            <Link
              key={path}
              className="text-white uppercase font-semibold cursor-pointer 
                         p-2 rounded-lg hover:bg-gray-800 hover:text-white 
                         text-center w-full transition duration-300"
              to={path}
              spy={true}
              offset={-100}
              smooth={true}
            >
              {link}
            </Link>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
