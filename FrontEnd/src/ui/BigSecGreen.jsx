import { Button } from "antd";
import React from "react";
import { ConfigProvider } from "antd";
import { FiLogOut } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
const themeRed = {
  token: {
    colorPrimary: "#CBEED0",
    colorPrimaryHover: "#D5F4D8",
  },
};

const BigSecGreen = ({ text }) => {
  return (
    <ConfigProvider theme={themeRed}>
      <Button
        type="primary"
        htmlType="submit"
        className="w-[320px] sm:w-[500px] h-[50px] flex items-center font-semibold"
      >
        <div className="flex flex-row items-center text-center gap-[8px]">
          <FcGoogle className="w-[25px] h-[22px]" />
          <p className="font-semibold text-textblack ">{text}</p>
        </div>
      </Button>
    </ConfigProvider>
  );
};

export default BigSecGreen;
