import React, { useEffect, useRef } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { RiAccountPinCircleFill } from "react-icons/ri";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SayAboutUs = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: index * 0.2,
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });
  }, []);

  return (
    <div className="sm:mt-[80px] align-element flex flex-col gap-[20px]">
      <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-textblack">
        What peoples say about Us ?
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-[20px]">
        {/* Review 1 */}
        <div
          className="border-[1px] p-[15px] flex flex-col gap-[15px] items-start"
          ref={(el) => (cardsRef.current[0] = el)}
        >
          <FaQuoteLeft className="text-bggray w-[40px] h-[40px]" />
          <h1 className="text-[16px] text-textblack font-semibold">
            It helped me to find the kind of place I wanted for a long time.
          </h1>
          <p className="text-[14px] text-textgray">
            We wish to express our thanks for your hard work in finding us a
            temporary home, which proved to be exactly what we wanted.
          </p>
          <div className="flex flex-row items-center gap-[8px]">
            <RiAccountPinCircleFill className="w-[40px] h-[40px] text-bggray" />
            <p className="text-[14px] font-semibold text-textblack">
              Houari Ahmed
            </p>
          </div>
        </div>

        {/* Review 2 */}
        <div
          className="border-[1px] p-[15px] flex flex-col gap-[15px] items-start"
          ref={(el) => (cardsRef.current[1] = el)}
        >
          <FaQuoteLeft className="text-bggray w-[40px] h-[40px]" />
          <h1 className="text-[16px] text-textblack font-semibold">
            I found a cozy apartment in less than 3 days!
          </h1>
          <p className="text-[14px] text-textgray">
            The platform is very intuitive and saved me a lot of time. Totally
            recommend it for anyone searching for a home.
          </p>
          <div className="flex flex-row items-center gap-[8px]">
            <RiAccountPinCircleFill className="w-[40px] h-[40px] text-bggray" />
            <p className="text-[14px] font-semibold text-textblack">
              Samira Bouzid
            </p>
          </div>
        </div>

        {/* Review 3 */}
        <div
          className="border-[1px] p-[15px] flex flex-col gap-[15px] items-start"
          ref={(el) => (cardsRef.current[2] = el)}
        >
          <FaQuoteLeft className="text-bggray w-[40px] h-[40px]" />
          <h1 className="text-[16px] text-textblack font-semibold">
            Great experience from start to finish.
          </h1>
          <p className="text-[14px] text-textgray">
            I appreciated the details and filters provided on the platform.
            Helped me choose exactly what I needed without any stress.
          </p>
          <div className="flex flex-row items-center gap-[8px]">
            <RiAccountPinCircleFill className="w-[40px] h-[40px] text-bggray" />
            <p className="text-[14px] font-semibold text-textblack">
              Karim El-Mansouri
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SayAboutUs;
