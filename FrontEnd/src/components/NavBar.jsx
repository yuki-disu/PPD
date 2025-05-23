import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import Title from "./Title";
import { useState } from "react";
import { GreenButton } from "../ui";
import { useSelector } from "react-redux";
import { CiMenuBurger, CiSettings } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";
import { MdAccountCircle } from "react-icons/md";
import { RiAccountCircleLine } from "react-icons/ri";
import { FaBuildingCircleCheck } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import ConfirmLogout from "./Error/ConfirmLogout";
import userImg from "../assets/user.png";
import { FaUserCircle } from "react-icons/fa";
const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logOut, setLogout] = useState(false);

  const user = useSelector((state) => state.user.userInfo);
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const clickTab = () => {
    setLogout(true);
  };

  return (
    <nav className="bg-white fixed w-full z-10 top-0 left-0  border-[1px] rounded-[10px] ">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto">
        <Link to="/">
          <Title />
        </Link>

        {/* Navbar Links - Desktop */}
        <div className="hidden md:flex md:space-x-8">
          <NavLinks />
        </div>

        {/* Right-side Controls */}
        <div className="flex items-center gap-3">
          {/* Hamburger Button - Mobile */}
          <button
            className="md:hidden p-2 text-[#3A3939] hover:text-[#7AB4BC]"
            onClick={handleMenuToggle}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Auth Section */}
          {!user ? (
            <Link to="/login">
              <GreenButton text="Get started" />
            </Link>
          ) : (
            <div className="relative">
              <div
                onClick={() => setOpen((prev) => !prev)}
                className="flex flex-row items-center gap-[10px] p-[10px] rounded-[12px] transition-colors hover:bg-gray-100 cursor-pointer"
              >
                <CiMenuBurger className="w-[20px] h-[20px]" />
                <FaUserCircle className="text-gray-300 w-[30px] h-[30px] rounded-full" />
                <p className="text-textgray font-semibold text-[16px]">
                  {user.username}
                </p>
              </div>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-[250px] bg-white border border-gray-200 rounded-[8px] shadow-md z-50"
                  >
                    <div className="flex flex-col">
                      <div className="flex flex-row items-center justify-between cursor-pointer transition-colors hover:bg-bggray h-[50px] px-[15px]">
                        <h1 className="text-textgray">Profile</h1>
                        <FaUserCircle className="text-gray-300 w-[25px] h-[25px]" />
                      </div>
                      <div className="flex flex-row items-center justify-between cursor-pointer transition-colors hover:bg-bggray h-[50px] px-[15px] border-t border-gray-200">
                        <h1 className="text-textgray">Settings</h1>
                        <CiSettings className="text-gray-400 w-[25px] h-[25px]" />
                      </div>

                      <div
                        onClick={clickTab}
                        className="flex flex-row items-center justify-between cursor-pointer transition-colors hover:bg-bggray rounded-b-[8px] h-[50px] px-[15px] border-t border-gray-200"
                      >
                        <h1 className="text-textgray">Logout</h1>
                        <IoIosLogOut className="text-gray-400 w-[25px] h-[25px]" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Confirm Logout Modal */}
              {logOut && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <ConfirmLogout onClose={() => setLogout(false)} />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden w-[400px] rounded-[20px] border-[1px] ${
            isMenuOpen ? "block" : "hidden"
          } absolute top-full left-0 right-0 bg-white`}
        >
          <NavLinks />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
