import React from "react";
import defaultPic from "../../assets/user1.png";
import { LuKeyRound } from "react-icons/lu";
import { FaUserEdit } from "react-icons/fa";
import { MdChecklistRtl } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import { FaRegFileAlt } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { BigRedButton } from "../../ui";
const user = {
  profileImg: defaultPic,
  fullName: "user",
};

const Choices = () => {
  return (
    <div className="mt-[20px] flex flex-col items-center gap-[20px]">
      <div className="bg-bggray px-[30px] py-[10px] flex flex-row items-center justify-between rounded-[10px] w-[320px] h-[50px] cursor-pointer transition-colors hover:bg-gray-100">
        <div className="flex flex-row gap-[8px] items-center justify-center text-center">
          <FaUserEdit className="w-[20px] h-[20px] text-greencol" />
          <p className="text-textblack text-[14px] font-semibold">
            Edit Profile
          </p>
        </div>
        <IoIosArrowForward className="text-textblack w-[20px] h-[40px]" />
      </div>
      <div className="bg-bggray px-[30px] py-[10px] flex flex-row items-center justify-between rounded-[10px] w-[320px] h-[50px] cursor-pointer transition-colors hover:bg-gray-100">
        <div className="flex flex-row gap-[8px] items-center justify-center text-center">
          <LuKeyRound className="w-[20px] h-[20px] text-greencol" />
          <p className="text-textblack text-[14px] font-semibold">
            Reset Password
          </p>
        </div>
        <IoIosArrowForward className="text-textblack w-[20px] h-[40px]" />
      </div>
      <div className="bg-bggray px-[30px] py-[10px] flex flex-row items-center justify-between rounded-[10px] w-[320px] h-[50px] cursor-pointer transition-colors hover:bg-gray-100">
        <div className="flex flex-row gap-[8px] items-center justify-center text-center">
          <MdChecklistRtl className="w-[20px] h-[20px] text-greencol" />
          <p className="text-textblack text-[14px] font-semibold">
            Your Listing
          </p>
        </div>
        <IoIosArrowForward className="text-textblack w-[20px] h-[40px]" />
      </div>
      <div className="bg-bggray px-[30px] py-[10px] flex flex-row items-center justify-between rounded-[10px] w-[320px] h-[50px] cursor-pointer transition-colors hover:bg-gray-100">
        <div className="flex flex-row gap-[8px] items-center justify-center text-center">
          <MdHistory className="w-[20px] h-[20px] text-greencol" />
          <p className="text-textblack text-[14px] font-semibold">
            Your activities
          </p>
        </div>
        <IoIosArrowForward className="text-textblack w-[20px] h-[40px]" />
      </div>
      <div className="bg-bggray px-[30px] py-[10px] flex flex-row items-center justify-between rounded-[10px] w-[320px] h-[50px] cursor-pointer transition-colors hover:bg-gray-100">
        <div className="flex flex-row gap-[8px] items-center justify-center text-center">
          <FaRegFileAlt className="w-[20px] h-[20px] text-greencol" />
          <p className="text-textblack text-[14px] font-semibold">
            Terms of use
          </p>
        </div>
        <IoIosArrowForward className="text-textblack w-[20px] h-[40px]" />
      </div>
      <BigRedButton text="Logout" />
    </div>
  );
};

export default Choices;
