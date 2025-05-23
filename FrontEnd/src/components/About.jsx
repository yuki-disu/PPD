import React, { useEffect, useRef } from "react";
import image from "../assets/home.jpg";
import { GreenButton } from "../ui";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.from(imageRef.current, {
      opacity: 0,
      x: -50,
      duration: 1,
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    gsap.from(textRef.current, {
      opacity: 0,
      x: 50,
      duration: 1,
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <div className="bg-bggreen2 py-[40px] px-[20px] mt-[30px] sm:mt-[80px]">
      <div className="align-element  flex flex-col lg:flex-row items-center lg:items-start gap-[40px] lg:gap-[60px] justify-center">
        <div
          ref={imageRef}
          className="relative w-full max-w-[500px] h-[300px] sm:h-[320px] border-[2px] border-greencol rounded-[15px]"
        >
          <div className="absolute left-[20px] top-[20px] w-full h-full border-[2px] border-greencol rounded-[15px]">
            <img
              src={image}
              alt="About"
              className="w-full h-full object-cover rounded-[15px]"
            />
          </div>
        </div>

        <div
          ref={textRef}
          className="flex flex-col items-center lg:items-start text-center lg:text-left px-4"
        >
          <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-textblack">
            Discover & Share Real Estate Opportunities
          </h1>
          <p className="mt-4 text-[16px] text-textgray max-w-[500px]">
            Whether you're searching for your dream home or looking to offer
            your own property, our platform connects you to a wide variety of
            listings — from cozy studios to spacious villas. Explore or share,
            all in one place.
          </p>
          <div className="mt-[30px] flex flex-row items-center sm:items-start gap-[20px]">
            <GreenButton text="view houses" />
            <GreenButton text="share yours" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
