import { Button } from "antd";
import React from "react";
import { ConfigProvider } from "antd"; // Fix import

const themePurple = {
  token: {
    colorPrimary: "#8B7ABC",
    colorPrimaryHover: "#A08FCC", // Slightly lighter purple for hover
  },
};

const PurpleButton = ({ text }) => {
  return (
    <ConfigProvider theme={themePurple}>
      <Button
        type="primary"
        htmlType="submit"
        className="w-[90px] h-[35px] sm:w-[120px] sm:h-[42px] flex items-center font-semibold "
      >
        {text}
      </Button>
    </ConfigProvider>
  );
};

export default PurpleButton;
