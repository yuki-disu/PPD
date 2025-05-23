import { Button, ConfigProvider } from "antd";
import React from "react";

const themeDarkGray = {
  token: {
    colorPrimary: "#414141",
    colorPrimaryHover: "#5A5A5A", // Slightly lighter gray for hover
  },
};

const DarkButton = ({ text }) => {
  return (
    <ConfigProvider theme={themeDarkGray}>
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

export default DarkButton;
