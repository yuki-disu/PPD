import { Button } from "antd";
import React from "react";
import { ConfigProvider } from "antd";

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
        className="w-[90px] h-[35px] sm:w-[120px] sm:h-[42px] flex items-center font-semibold"
      >
        {text}
      </Button>
    </ConfigProvider>
  );
};

export default RedButton;
