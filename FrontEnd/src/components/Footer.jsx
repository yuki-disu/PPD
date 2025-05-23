import React from "react";
import { BsFacebook } from "react-icons/bs";
import { RiInstagramFill } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";

const Footer = () => {
  return (
    <footer className="bg-bggreen2 text-textblack py-10 mt-[80px]">
      <div className="align-element grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div>
          <h2 className="text-[20px] font-bold mb-4">HomeDZ</h2>
          <p className="text-[14px] text-textgray">
            Discover your dream home or share your property with ease on HomeDZ.
            We connect people with comfort and trust.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-[16px] font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-[14px] text-textgray">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Listings</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-[16px] font-semibold mb-4">Contact Us</h3>
          <div className="flex items-center gap-2 text-[14px] text-textgray mb-2">
            <FaPhoneAlt className="w-[17px] h-[17px]" />
            <span>+213 555 123 456</span>
          </div>
          <div className="flex items-center gap-2 text-[14px] text-textgray">
            <BiLogoGmail className="w-[20px] h-[20px]" />
            <span>contact@homedz.com</span>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-[16px] font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4 text-[20px] text-textgray">
            <a href="#">
              <BsFacebook className="hover:text-textblack" />
            </a>
            <a href="#">
              <RiInstagramFill className="hover:text-textblack" />
            </a>
            <a href="#">
              <FaWhatsapp className="hover:text-textblack" />
            </a>
            <a href="#">
              <FaXTwitter className="hover:text-textblack" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t mt-10 pt-6 text-center text-[13px] text-textgray">
        © {new Date().getFullYear()} HomeDZ. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
