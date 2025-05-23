import { Button } from "antd";
import React from "react";
import { ConfigProvider } from "antd";
import { FiLogOut } from "react-icons/fi";
const themeRed = {
  token: {
    colorPrimary: "#BE3227",
    colorPrimaryHover: "#D1473C",
  },
};

const RedButton = ({ text }) => {
  return (
    <ConfigProvider theme={themeRed}>
      <Button
        type="primary"
        htmlType="submit"
        className="w-[320px] h-[50px] flex items-center font-semibold"
      >
        <div className="flex flex-row items-center text-center gap-[8px]">
          <FiLogOut className="text-white w-[20px] h-[20px]" />
          <p className="font-semibold">{text}</p>
        </div>
      </Button>
    </ConfigProvider>
  );
};

export default RedButton;
