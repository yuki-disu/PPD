import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Rent from "../../assets/Rent.png";
import buy from "../../assets/buy.png";

const StepOne = () => {
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const rentRef = useRef(null);
  const buyRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power2.out", duration: 0.8 },
    });

    tl.from(headingRef.current, { opacity: 0, y: -30 })
      .from(paragraphRef.current, { opacity: 0, y: -20 }, "-=0.5")
      .from(
        [rentRef.current, buyRef.current],
        {
          opacity: 0,
          scale: 0.5,
          stagger: 0.2,
        },
        "-=0.3"
      );
  }, []);

  return (
    <div className="flex flex-col items-center gap-[10px] sm:gap-[20px]">
      <h1
        ref={headingRef}
        className="text-textblack text-[20px] sm:text-[40px] font-bold"
      >
        Select Offer
      </h1>

      <p
        ref={paragraphRef}
        className="text-[18px] text-textgray font-light text-center"
      >
        Please choose whether you want to{" "}
        <strong className="font-bold">buy</strong> or{" "}
        <strong className="font-bold">rent</strong> the house. <br /> This will
        help us tailor the offers to your needs.
      </p>

      <div className="flex flex-col sm:flex-row gap-[200px] mt-[20px] sm:mt-[50px]">
        <button className="cursor-pointer" ref={rentRef}>
          <div className="w-[150px] h-[150px] sm:w-[160px] sm:h-[160px] rounded-full flex flex-col items-center justify-center bg-greencol transition-colors hover:bg-[#6AAE78]">
            <img className="w-[70px] h-[70px]" src={Rent} />
            <p className="text-[20px] font-bold text-white">Rent</p>
          </div>
        </button>

        <button className="cursor-pointer" ref={buyRef}>
          <div className="w-[150px] h-[150px] sm:w-[160px] sm:h-[160px] rounded-full flex flex-col items-center justify-center bg-bggray transition-colors hover:bg-[#DADADA]">
            <img className="w-[70px] h-[70px]" src={buy} />
            <p className="text-[20px] font-bold text-textgray">Buy</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default StepOne;
