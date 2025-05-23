import React, { useState } from "react";
import { RedButton } from "../../ui";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logout } from "../../features/user/userSlice";
import { Button } from "antd";

const ConfirmLogout = ({ onClose }) => {
  const dispatch = useDispatch();

  return (
    <div className="p-[20px] w-[300px] sm:w-[400px] sm:p-[30px] relative flex flex-col items-center gap-[20px] text-center rounded-[20px] bg-white shadow-xl">
      <MdClose
        onClick={onClose}
        className="rounded-full absolute right-1 top-1 w-[30px] h-[30px] text-textblack cursor-pointer transition-colors hover:bg-bggray"
      />
      <h1 className="text-[28px] font-semibold text-textblack">
        Are you sure?
      </h1>
      <p className="text-textgray text-[16px]">
        Do you want to leave the website?
      </p>
      <div className="flex flex-row gap-[25px] mt-[20px]">
        <Button
          onClick={() => {
            dispatch(logout());
          }}
          variant="solid"
          color="primary"
          className="h-[45px] w-[100px]"
        >
          Logout
        </Button>
        <button
          text="Logout"
          className="text-textblack font-semibold transition-colors hover:bg-bggray w-[100px] p-[10px] rounded-[10px]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmLogout;
