import { Button } from "antd";
import React from "react";

const house = {
  selPrice: 8500000,
  rentPrice: 65000,
};
const Offer = () => {
  return (
    <div className="flex flex-col gap-[20px]  w-[350px]  border-[2px] border-bggray rounded-[8px] p-[50px] ">
      <div className="flex flex-row justify-between">
        <h1 className="text-[16px] font-semibold text-textblack">
          Sale price :
        </h1>
        <p className="text-[18px] font-normal text-textblack">
          {house.selPrice} <span className="text-greencol font-light">DA</span>
        </p>
      </div>
      <div className="flex flex-row justify-between">
        <h1 className="text-[16px] font-semibold text-textblack">
          Rent price :
        </h1>
        <p className="text-[18px] font-normal text-textblack">
          {house.rentPrice} <span className="text-greencol font-light">DA</span>
        </p>
      </div>
      <Button
        type="primary"
        htmlType="submit"
        className="w-[200px] flex items-center font-semibold ml-[20px] h-[45px] mt-[20px] "
      >
        Get your House !
      </Button>{" "}
    </div>
  );
};

export default Offer;
