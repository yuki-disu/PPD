import React from "react";
import NavBar from "./NavBar";
import AllTabs from "./HeroTabs/AllTabs";
import image from "../assets/f.png";

const Hero = () => {
  return (
    <div className="align-element flex flex-col sm:flex-row items-center sm:w-auto rounded-[30px]  p-[15px] min-h-screen flex-wrap">
      <div className="flex flex-col gap-[50px] items-start">
        <div className="flex flex-col items-center sm:items-start justify-center gap-[20px]">
          <h1 className="sm:mt-[40px] font-bold text-[27px] sm:text-[40px] text-textblack tracking-wide">
            Easily buy, rent or list your <br /> property with{" "}
            <span className="text-greencol">HomeDZ</span>
          </h1>
          <p className="text-textgray font-medium text-[15px] sm:text-[18px] text-center sm:text-left">
            We provide a user-focused platform designed to simplify your real
            estate journey, <br className="hidden sm:block" />
            whether you're looking for a property or offer one for sale or rent.
          </p>
        </div>

        <div className="mt-[20px] w-full flex justify-center sm:justify-start">
          <AllTabs />
        </div>
      </div>

      <div className="hidden lg:block w-[300px] sm:w-[530px] ml-[20px] mt-[40px] sm:mt-0 ">
        <img
          src={image}
          alt="Real estate illustration"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default Hero;
