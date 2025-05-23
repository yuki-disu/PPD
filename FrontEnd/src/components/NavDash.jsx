import React from "react";
import { PiBellRingingThin } from "react-icons/pi";
import image from "../assets/pls.png";
import { TbBellRingingFilled } from "react-icons/tb";
import img from "../assets/FinalLogo.png";
import { Link } from "react-router-dom";

const CurrentDate = () => {
  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
  const datePart = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
  return (
    <p className="text-gray-400 text-[13px] ">{`${dayName}, ${datePart}`}</p>
  );
};

const NavDash = () => {
  const userInfo = {
    userName: "Yaakoub",
    UserImg: image,
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-7  justify-between px-[20px] sm:px-[50px] fixed top-0 left-0 w-full z-50 ">
      <div className="col-span-1 w-[100px] h-[100px]">
        <Link to="/" className="cursor-pointer">
          <img src={img} />
        </Link>
      </div>

      <div className="col-span-6 flex flex-row items-start justify-between mt-[20px]">
        <div className="flex flex-col gap-[8px] items-start justify-center">
          <h1 className="text-[20px] font-bold text-textblack">
            Hello {userInfo.userName}!{" "}
          </h1>
          {CurrentDate()}
        </div>
        <div className="flex flex-row items-center justify-center gap-[25px]  ">
          <div className="cursor-pointer">
            <div className="relative w-[18px] h-[18px] rounded-full bg-bggray ml-[15px] flex flex-row items-center justify-center top-[5px]">
              <p className="text-[11px] text-textgray font-bold">1</p>
            </div>
            <TbBellRingingFilled className="text-textgray mr-[15px] text-center w-[20px] h-[25px] cursor-pointer transition-colors hover:text-gray-300" />
          </div>
          <div className="h-[25px] border-l border-gray-400" />

          <div className="flex flex-row items-center justify-center gap-[25px] transition-colors hover:bg-gray-100 px-[10px] py-[10px] rounded-[5px] cursor-pointer">
            <div className="w-[48px] h-[48px] rounded-full flex flex-row item-center">
              <img src={userInfo.UserImg} className="rounded-full" />
            </div>
            <div className="flex flex-col gap-[5px] items-start justify-center">
              <h1 className="text-[14px] font-semibold text-textblack">
                {userInfo.userName}
              </h1>
              <p className="text-[13px] text-gray-400">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavDash;
