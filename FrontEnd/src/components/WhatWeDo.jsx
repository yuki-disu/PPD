import React, { useEffect, useRef } from "react";
import { AiFillHeart } from "react-icons/ai";
import { MdGppGood, MdFlashOn } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import { TbZoomMoney } from "react-icons/tb";
import { IoLocationSharp } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const WhatWeDo = () => {
  const cardsRef = useRef();
  useEffect(() => {
    gsap.from(cardsRef.current, {
      scrollTrigger: {
        trigger: cardsRef.current,
        start: "top 80%",
      },
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
    });
  }, []);
  return (
    <div
      ref={cardsRef}
      className="align-element mt-[30px] sm:mt-[80px] flex flex-col items-start"
    >
      <h1 className="text-[25px] font-bold sm:text-[35px] text-textblack">
        Giving you peace of mind
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-[20px] sm:gap-x-[80px] sm:gap-y-[40px] mt-6">
        {/* Comfortable */}
        <div className="bg-bggreen2 p-[20px] rounded-[25px] flex flex-col gap-[10px] items-start">
          <AiFillHeart className="w-[25px] h-[25px] text-greencol" />
          <h1 className="text-[18px] font-bold text-textblack">Comfortable</h1>
          <p className="text-textgray text-[14px]">
            Homes designed for maximum comfort, so you feel at ease every day.
          </p>
        </div>

        {/* Security */}
        <div className="bg-bggreen2 p-[20px] rounded-[25px] flex flex-col gap-[10px] items-start">
          <MdGppGood className="w-[25px] h-[25px] text-greencol" />
          <h1 className="text-[18px] font-bold text-textblack">Security</h1>
          <p className="text-textgray text-[14px]">
            Verified properties with safe neighborhoods and trusted
            transactions.
          </p>
        </div>

        {/* Luxury */}
        <div className="bg-bggreen2 p-[20px] rounded-[25px] flex flex-col gap-[10px] items-start">
          <FaStar className="w-[25px] h-[25px] text-greencol" />
          <h1 className="text-[18px] font-bold text-textblack">Luxury</h1>
          <p className="text-textgray text-[14px]">
            Experience elegant and modern homes with premium features and
            finishes.
          </p>
        </div>

        {/* Best Prices */}
        <div className="bg-bggreen2 p-[20px] rounded-[25px] flex flex-col gap-[10px] items-start">
          <TbZoomMoney className="w-[25px] h-[25px] text-greencol" />
          <h1 className="text-[18px] font-bold text-textblack">Best Prices</h1>
          <p className="text-textgray text-[14px]">
            Get the most competitive offers in the market without compromising
            quality.
          </p>
        </div>

        {/* Strategic Location */}
        <div className="bg-bggreen2 p-[20px] rounded-[25px] flex flex-col gap-[10px] items-start">
          <IoLocationSharp className="w-[25px] h-[25px] text-greencol" />
          <h1 className="text-[18px] font-bold text-textblack">
            Strategic Location
          </h1>
          <p className="text-textgray text-[14px]">
            Find homes in prime areas close to schools, work, and entertainment.
          </p>
        </div>

        {/* Variety of Properties */}
        <div className="bg-bggreen2 p-[20px] rounded-[25px] flex flex-col gap-[10px] items-start">
          <FaBuilding className="w-[20px] h-[20px] text-greencol" />
          <h1 className="text-[18px] font-bold text-textblack">
            Variety of Properties
          </h1>
          <p className="text-textgray text-[14px]">
            Whether you need an apartment, studio, or house — we’ve got options
            for every lifestyle.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;
