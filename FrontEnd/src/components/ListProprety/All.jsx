import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Button, Steps, theme, message } from "antd";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import FirstStep from "./FirsStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import FourthStep from "./FourthStep";
import FifthStep from "./FifthStep";
import Congratulations from "./Congratulations";
import SixthStep from "./SixthStep";
const All = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const owner_Id = useSelector((state) => state.user.userInfo?.user?.id);
  console.log(owner_Id);
  const [fileList, setFileList] = useState([]);
  const [formData, setFormData] = useState({
    owner_id: owner_Id,
    for_rent: false,
    price: "",
    location: "",
    description: "",
    type: "",
    area: "",
    numOfRooms: "",
    numOfBathroom: "",
    numOfKitchen: "",
    garageCapacity: "",
    camera: false,
    firstAidKit: false,
    fireExtinguisher: false,
    alarmsAndSecurity: false,
    parking: false,
    pool: false,
    sportSale: false,
    elevator: false,
    cleaning: false,
    petsAllowed: false,
    wifi: false,
    electricity: false,
    gaz: false,
    water: false,
    television: false,
    dishwasher: false,
    washingMachine: false,
    microwave: false,
    fridge: false,
    closeToTransportation: false,
    natureView: false,
    closeToBeach: false,
    closeToSchool: false,
    closeToSupermarket: false,
    garden: false,
    balcony: false,
  });
  const updateFormData = (newData) => {
    setFormData((prev) => {
      const updatedFormData = { ...prev, ...newData };
      console.log("Updated formData:", updatedFormData); // Log the updated formData
      return updatedFormData;
    });
  };

  const next = () => {
    setCurrent(current + 1);
    message.success("Moved to next step!");
  };

  const prev = () => {
    setCurrent(current - 1);
    message.info("Moved to previous step!");
  };
  const steps = [
    {
      title: <span className="text-base font-medium"> </span>,
      content: <FirstStep updateFormData={updateFormData} data={formData} />,
    },
    {
      title: <span className="text-base font-medium"> </span>,
      content: <SecondStep updateFormData={updateFormData} data={formData} />,
    },
    {
      title: <span className="text-base font-medium"> </span>,
      content: <ThirdStep updateFormData={updateFormData} data={formData} />,
    },
    {
      title: <span className="text-base font-medium"> </span>,
      content: <FourthStep updateFormData={updateFormData} data={formData} />,
    },
    {
      title: <span className="text-base font-medium"> </span>,
      content: <FifthStep fileList={fileList} setFileList={setFileList} />,
    },
    {
      title: <span className="text-base font-medium"> </span>,
      content: <SixthStep />,
    },
    {
      title: <span className="text-base font-medium"> </span>,
      content: <Congratulations formData={formData} fileList={fileList} />,
    },
  ];

  const items = steps.map((item, index) => ({
    key: index,
    title: item.title,
  }));

  const contentStyle = {
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    marginTop: 16,
    padding: 24,
  };

  return (
    <>
      <Steps
        current={current}
        progressDot={(dot, { index, status }) => {
          const isActive = index <= current;
          return (
            <div
              className={`w-[24px] h-[24px] rounded-full ml-[-7px] mt-[-6px] ${
                isActive ? "bg-greencol" : "bg-gray-300"
              }`}
            />
          );
        }}
        items={items}
        className="
                  [&_.ant-steps-icon-dot]:!ml-[-8px]
                  [&_.ant-steps-icon-dot]:!mt-[-6px]

          [&_.ant-steps-icon-dot]:!w-[24px]
          [&_.ant-steps-icon-dot]:!h-[24px]
          [&_.ant-steps-icon-dot]:!rounded-full
          [&_.ant-steps-icon-dot]:!bg-gray-300

          [&_.ant-steps-item-process_.ant-steps-icon-dot]:!bg-primary
        "
      />

      <div style={contentStyle}>{steps[current].content}</div>

      <div
        className="flex flex-row items-center justify-center mt-[-10px] "
        style={{ marginTop: 24 }}
      >
        {current < steps.length - 1 && (
          <Button
            onClick={next}
            className="!bg-textblack !text-white transition-colors hover:!bg-secblack w-[120px] h-[50px] rounded-[25px]"
          >
            {" "}
            continue
          </Button>
        )}
      </div>
    </>
  );
};

export default All;
