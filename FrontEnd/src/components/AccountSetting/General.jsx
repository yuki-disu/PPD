import React from "react";
import defaultPic from "../../assets/user1.png";
import { LuKeyRound } from "react-icons/lu";
import { FaUserEdit } from "react-icons/fa";
import { MdChecklistRtl } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import { FaRegFileAlt } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { BigRedButton } from "../../ui";
import Choices from "./Choices";
const user = {
  profileImg: defaultPic,
  fullName: "user",
};

const General = () => {
  return (
    <div className="flex flex-col items-center w-[400px] p-[30px] ">
      <div className="w-[200px] h-[200px] rounded-full border-[1px] border-[#CBEFD0] flex items-center justify-center">
        <div className="w-[170px] h-[170px] rounded-full border-[1px] border-[#DDF5DF] flex items-center justify-center">
          <div className="w-[140px] h-[140px] rounded-full border-[1px] border-[#EEFBEE] flex items-center justify-center">
            <div className="w-[120px] h-[120px] rounded-full overflow-hidden">
              <img
                src={user.profileImg}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-textblack text-[25px] font-bold mt-[15px]">
        {user.fullName}
      </h1>
      <Choices />
    </div>
  );
};

export default General;
