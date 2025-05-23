import React from "react";
import { GreenButton } from "../../ui";
import { Link } from "react-router-dom";
import { MdClose } from "react-icons/md";
const RequiredLogin = ({ onClose }) => {
  return (
    <div className="p-[20px] w-[300px] sm:w-[400px] sm:p-[30px] absolute center flex flex-col items-center gap-[35px] text-center rounded-[20px] bg-white ">
      <MdClose
        className="rounded-full absolute right-1 top-1 w-[30px] h-[30px] text-textblack cursor-pointer transition-colors hover:bg-bggray"
        onClick={onClose}
      />
      <h1 className="text-[28px] font-semibold text-textblack">
        Log in Required
      </h1>
      <p className="text-textgray text-[16px]">
        You need to be logged in to continue please login
      </p>
      <Link to="/login">
        <GreenButton text="login" />
      </Link>
    </div>
  );
};

export default RequiredLogin;
