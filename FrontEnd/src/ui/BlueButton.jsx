import { Button } from "antd";
import React from "react";
import { ConfigProvider } from "antd";

const themeBlue = {
  token: {
    colorPrimary: "#7AB4BC", // Main blue color
    colorPrimaryHover: "#89C2C8", // Slightly lighter blue for hover effect
  },
};

const BlueButton = ({ text }) => {
  return (
    <ConfigProvider theme={themeBlue}>
      <Button
        type="primary"
        htmlType="submit"
        className="w-[90px] h-[35px] sm:w-[120px] sm:h-[42px] text-center"
      >
        {text}
      </Button>
    </ConfigProvider>
  );
};

export default BlueButton;
