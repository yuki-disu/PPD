import React, { useState } from "react";
import { Button, message, Steps, theme } from "antd";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import StepOne from "./StepOne";
import Step2Rent from "./Step2Rent";
const steps = [
  {
    title: <span className="text-base font-medium"> </span>,
    content: <StepOne />,
  },
  {
    title: <span className="text-base font-medium "></span>,
    content: <Step2Rent />,
  },
  {
    title: <span className="text-base font-medium"></span>,
    content: "Last-content",
  },
];

const Step = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
    message.success("Moved to next step!");
  };

  const prev = () => {
    setCurrent(current - 1);
    message.info("Moved to previous step!");
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle = {
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    marginTop: 16,
    padding: 24, // optional, for breathing room without excess height
  };

  return (
    <>
      <Steps
        current={current}
        items={items}
        className="
          [&_.ant-steps-item-icon]:w-12 
          [&_.ant-steps-item-icon]:h-12 
          [&_.ant-steps-item-icon]:text-lg 
          [&_.ant-steps-item-icon]:flex 
          [&_.ant-steps-item-icon]:items-center 
          [&_.ant-steps-item-icon]:justify-center
        "
      />

      <div style={contentStyle}>{steps[current].content}</div>

      <div
        className="flex flex-row items-center justify-center gap-[20px]"
        style={{ marginTop: 24 }}
      >
        {current < steps.length - 1 && (
          <Button
            onClick={next}
            className="!bg-textblack !text-white transition-colors hover:!bg-secblack w-[120px] h-[50px] rounded-[25px]"
          >
            <FaArrowRightLong className="text-white w-[20px] h-[20px]" />
          </Button>
        )}

        {current > 0 && (
          <Button
            onClick={prev}
            className="!bg-textblack !text-white transition-colors hover:!bg-secblack w-[120px] h-[50px] rounded-[25px]"
          >
            <FaArrowLeftLong className="text-white w-[20px] h-[20px]" />
          </Button>
        )}
      </div>
    </>
  );
};

export default Step;
