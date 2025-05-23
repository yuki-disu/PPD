import React from "react";
import bgImage from "../../assets/404.png";
import people from "../../assets/error.png";
import { GreenButton } from "../../ui";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center "
      // ✅ Background image
    >
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="w-[320px] sm:w-[675px] h-[263px] flex flex-col gap-[40px] items-center justify-center"
      >
        <img
          src={people}
          className="w-[200px] sm:w-[350px] h-[200px] sm:h-[300px]"
        />
        <div className="flex flex-col text-center items-center gap-[20px]">
          <h1 className="text-textblack font-bold text-[18px] sm:text-[30px]">
            Oops! We can't find this page.
          </h1>
          <p className="text-[15px] text-textgray">
            It looks like you've landed on a lost page. <br /> Don't worry, it
            happens to the best of us!
          </p>
          <Link to="/">
            <GreenButton text="Back" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
