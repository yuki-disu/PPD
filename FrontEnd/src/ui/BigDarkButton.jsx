import { Button, ConfigProvider } from "antd";
import React from "react";

const BigDarkButton = ({ text }) => {
  return (
    <Button
      htmlType="submit"
      type="primary"
      className=" w-[340px] sm:w-[500px] h-[50px] flex items-center font-semibold"
    >
      {text}
    </Button>
  );
};

export default BigDarkButton;
