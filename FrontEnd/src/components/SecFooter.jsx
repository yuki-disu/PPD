import React from "react";
import { BsFacebook } from "react-icons/bs";
import { RiInstagramFill } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";

const SecFooter = () => {
  return (
    <div className="flex flex-col items-start gap-[15px]">
      <div className="flex flex-row gap-[10px]">
        <p className="font-semibold text-textgray text-[15px] ">Follow Us :</p>
        <div className="flex flex-row gap-[12px] text-greencol">
          <a href="#" className="">
            <BsFacebook className="hover:text-textblack h-[20px] w-[20px]" />
          </a>
          <a href="#">
            <RiInstagramFill className="hover:text-textblack h-[20px] w-[20px]" />
          </a>
          <a href="#">
            <FaWhatsapp className="hover:text-textblack h-[20px] w-[20px]" />
          </a>
          <a href="#">
            <FaXTwitter className="hover:text-textblack h-[20px] w-[20px]" />
          </a>
        </div>
      </div>
      <div className="flex flex-row gap-[10px]">
        <p className="font-semibold text-textgray text-[15px]">Contact Us :</p>
        <div className="flex flex-col sm:flex-row justify-center items-center">
          <div className="flex items-center justify-center gap-2 text-[14px] text-textgray ">
            <FaPhoneAlt className="w-[15px] h-[15px] text-greencol" />
            <span>+213 555 123 456</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-[14px] text-textgray ">
            <BiLogoGmail className="ml-[20px] w-[20px] h-[20px] text-greencol" />
            <span>contact@homedz.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecFooter;
