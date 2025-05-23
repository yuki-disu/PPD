import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Rent from "../../assets/Rent.png";
import whiteRent from "../../assets/gray.png";
import buy from "../../assets/buy.png";
import grayBuy from "../../assets/gbuy.png";
import { Button, Flex, Radio } from "antd";
const FirstStep = ({ updateFormData, Data }) => {
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const rentRef = useRef(null);
  const buyRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isHoverRent, setIsHoverRent] = useState(false);
  const [isHoverBuy, setIsHoverBuy] = useState(false);
  const [selectedOffer, setSelectdOffer] = useState("");
  const [forRent, setForRent] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
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

  const handelOfferChange = (e) => {
    setSelectdOffer(e.target.value);
  };
  const handleSaveOffer = () => {
    if (!selectedOffer) {
      setErrorMsg("Please select Rent or Sail before saving.");
      return;
    }

    setErrorMsg("");
    updateFormData({
      for_rent: selectedOffer === "rent",
    });
  };

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
        <strong className="font-bold">Sail</strong> the house. <br /> This will
        help us tailor the offers to your needs.
      </p>
      <Radio.Group
        onChange={handelOfferChange}
        value={selectedOffer}
        className="mt-[20px] sm:mt-[50px]"
      >
        <div className="flex flex-row gap-[40px] sm:gap-[200px]">
          {/* Rent Option */}
          <Radio
            value="rent"
            onMouseEnter={() => setIsHoverRent(true)}
            onMouseLeave={() => setIsHoverRent(false)}
            className="cursor-pointer"
            ref={rentRef}
          >
            <div
              className={`w-[80px] h-[80px] sm:w-[160px] sm:h-[160px] rounded-full flex flex-col items-center justify-center transition-colors ${
                selectedOffer === "rent" || isHoverRent
                  ? "bg-greencol"
                  : "bg-bggray"
              }`}
            >
              <img
                className="w-[30px] h-[30px] sm:w-[70px] sm:h-[70px]"
                src={selectedOffer === "rent" || isHoverRent ? Rent : grayBuy}
              />
              <p
                className={`text-[20px] font-bold ${
                  selectedOffer === "rent" || isHoverRent
                    ? "text-white"
                    : "text-textgray"
                }`}
              >
                Rent
              </p>
            </div>
          </Radio>

          {/* Sail Option */}
          <Radio
            value="sail"
            onMouseEnter={() => setIsHoverBuy(true)}
            onMouseLeave={() => setIsHoverBuy(false)}
            className="cursor-pointer"
            ref={buyRef}
          >
            <div
              className={`w-[80px] h-[80px] sm:w-[160px] sm:h-[160px] rounded-full flex flex-col items-center justify-center transition-colors ${
                selectedOffer === "sail" || isHoverBuy
                  ? "bg-greencol"
                  : "bg-bggray"
              }`}
            >
              <img
                className="w-[30px] h-[30px] sm:w-[70px] sm:h-[70px]"
                src={selectedOffer === "sail" || isHoverBuy ? whiteRent : buy}
              />
              <p
                className={`text-[20px] font-bold ${
                  selectedOffer === "sail" || isHoverBuy
                    ? "text-white"
                    : "text-textgray"
                }`}
              >
                Sail
              </p>
            </div>
          </Radio>
        </div>
        {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}
      </Radio.Group>
      <Button
        onClick={handleSaveOffer}
        className=" w-[120px] h-[50px] rounded-[25px] mt-[-10px] "
        variant="solid"
        color="primary"
      >
        save
      </Button>
    </div>
  );
};

export default FirstStep;
