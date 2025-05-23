import React from "react";
import { FaRegSmile } from "react-icons/fa";
import { GrAnnounce } from "react-icons/gr";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import { FaMoneyBills } from "react-icons/fa6";
const announces = 100;
const incomes = 20000;
const incomeGrowth = 16;
const growth = -12;
let pos = false;
let pos2 = false;
const isPositive1 = () => {
  if (growth > 0) {
    pos = true;
  }
  return pos;
};
const isPositive2 = () => {
  if (incomeGrowth > 0) {
    pos2 = true;
  }
  return pos2;
};
const activeUsers = 100;
const inactiveUsers = 140;
const Dsh = () => {
  const res = isPositive1();
  const res2 = isPositive2();
  console.log(res);
  return (
    <div className="m-[30px] flex flex-col sm:flex-row items-start gap-[20px] sm:gap-[40px] flex-wrap">
      <div className="flex flex-row items-start justify-start gap-[20px] sm:gap-[40px]">
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-col items-start px-[40px] rounded-[15px] py-[20px]  gap-[20px] bg-white w-[380px] h-[150px]">
            <h1 className="text-[16px] font-semibold text-textgray">
              Total number of users
            </h1>
            <div className="flex flex-row gap-[50px] items-start ">
              <div className="flex flex-col items-start gap-[8px]">
                <p className="text-[14px] font-semibold  text-textblack ">
                  Inactive
                </p>
                <p className="text-[23px] text-textblack font-bold">
                  {inactiveUsers}
                </p>
              </div>
              <div className="w-[1px] h-[40px] bg-gray-400 mt-[10px]"></div>
              <div className="flex flex-row items-start  ">
                <div className="flex flex-col items-start gap-[8px]">
                  <p className="text-[14px] text-textblack  font-semibold ">
                    Active
                  </p>
                  <p className="text-[23px]  text-start mr-[70px] text-textblack font-bold">
                    {activeUsers}
                  </p>
                </div>
                <div className=" w-[40px] mr-[20px] h-[40px] rounded-full bg-bggreen2 flex items-center justify-center">
                  <FaRegSmile className=" text-greencol w-[25px] h-[25px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[15px] py-[20px] px-[40px] gap-[50px] flex flex-row items-center  w-[250px] h-[150px]  bg-white">
        <div className="flex flex-col items-start gap-[8px]">
          <h1 className="text-[16px] font-semibold text-textgray">
            Announces{" "}
          </h1>
          <p className="font-bold text-[23px] text-textblack">{announces}</p>
          {res === true && (
            <span className="text-greencol flex flex-row gap-[4px]  font-bold text-[14px]">
              + {growth}% /m <FaArrowTrendUp className="w-[18px] mt-[5px]" />
            </span>
          )}
          {res === false && (
            <span className="text-redcol flex flex-row gap-[4px]  font-bold text-[14px]">
              {growth}% /m <FaArrowTrendDown className="w-[18px] mt-[5px]" />
            </span>
          )}
        </div>
        <div className=" w-[40px] mr-[0px] h-[40px] rounded-full bg-bggreen2 flex items-center justify-center">
          <GrAnnounce className=" text-greencol w-[25px] h-[25px]" />
        </div>
      </div>
      <div className="rounded-[15px] py-[20px] px-[40px] gap-[50px] flex flex-row items-center  w-auto h-[150px]  bg-white">
        <div className="flex flex-col items-start gap-[8px]">
          <h1 className="text-[16px] font-semibold text-textgray">Total </h1>
          <p className="font-bold text-[23px] text-textblack">{incomes} DA</p>
          {res2 === true && (
            <span className="text-greencol flex flex-row gap-[4px]  font-bold text-[14px]">
              + {incomeGrowth}% /m
              <FaArrowTrendUp className="w-[18px] mt-[5px]" />
            </span>
          )}
          {res2 === false && (
            <span className="text-redcol flex flex-row gap-[4px]  font-bold text-[14px]">
              {incomeGrowth}% /m
              <FaArrowTrendDown className="w-[18px] mt-[5px]" />
            </span>
          )}
        </div>
        <div className=" w-[40px] mr-[0px] h-[40px] rounded-full bg-bggreen2 flex items-center justify-center">
          <FaMoneyBills className=" text-greencol w-[25px] h-[25px]" />
        </div>
      </div>
    </div>
  );
};

export default Dsh;
