import React from "react";
import img from "../assets/FinalLogo.png";
const Title = () => {
  return (
    <div className="flex flex-row items-start ">
      <img
        src={img}
        className="w-[100px] h-[90px] transition-all duration-300 ease-in-out hover:shadow-lg"
      />
    </div>
  );
};

export default Title;
