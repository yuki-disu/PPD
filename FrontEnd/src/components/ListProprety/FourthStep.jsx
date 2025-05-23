import React, { useState, useRef, useEffect } from "react";
import { IoBed } from "react-icons/io5";
import { Form, Input, Button } from "antd";
import { FaBath, FaFire, FaSwimmingPool, FaSchool } from "react-icons/fa";
import { TbArrowsDiagonal2 } from "react-icons/tb";
import { FaRegSnowflake } from "react-icons/fa";
import { FaKitchenSet } from "react-icons/fa6";
import { TbBeach } from "react-icons/tb";
import { PiFirstAidKitFill } from "react-icons/pi";
import heatIcon from "../../assets/heatIcont.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PiOvenLight, PiElevatorLight, PiPawPrintLight } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";
import { RiAlarmWarningLine } from "react-icons/ri";
import { GiCctvCamera } from "react-icons/gi";
import { TbParkingCircleFilled, TbWashMachine, TbFridge } from "react-icons/tb";
import { CgGym, CgSmartHomeWashMachine } from "react-icons/cg";
import { FiWifi, FiTv } from "react-icons/fi";
import { IoWaterOutline, IoRoseOutline } from "react-icons/io5";
import { LiaBusSolid } from "react-icons/lia";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTemperatureHigh } from "@fortawesome/free-solid-svg-icons";
import { LuMicrowave } from "react-icons/lu";
import { FaFireExtinguisher } from "react-icons/fa6";
import { FaCar } from "react-icons/fa";
gsap.registerPlugin(ScrollTrigger);
import {
  MdElectricBolt,
  MdNaturePeople,
  MdOutlineCleaningServices,
  MdStorefront,
  MdBalcony,
} from "react-icons/md";

const featuresConfig = [
  {
    title: "Security of Building",
    items: [
      { key: "camera", label: "Camera", icon: <GiCctvCamera /> },
      {
        key: "firsAidKit",
        label: "First Aid Kit",
        icon: <PiFirstAidKitFill />,
      },
      {
        key: "FireExtinguisher",
        label: "Fire Extinguisher",
        icon: <FaFireExtinguisher />,
      },
      {
        key: "alarmsAndSecurity",
        label: "Security Alarm",
        icon: <RiAlarmWarningLine />,
      },
    ],
  },
  {
    title: "Parking & Installation",
    items: [
      { key: "parking", label: "Parking", icon: <TbParkingCircleFilled /> },
      { key: "pool", label: "Pool", icon: <FaSwimmingPool /> },
      { key: "sportSale", label: "Sports Hall", icon: <CgGym /> },
    ],
  },
  {
    title: "Services",
    items: [
      { key: "elevator", label: "Elevator", icon: <PiElevatorLight /> },
      {
        key: "cleaning",
        label: "Cleaning",
        icon: <MdOutlineCleaningServices />,
      },
      {
        key: "petsAllowed",
        label: "Pets Allowed",
        icon: <PiPawPrintLight />,
      },
      { key: "wifi", label: "Wifi", icon: <FiWifi /> },
      { key: "electricity", label: "Electricity", icon: <MdElectricBolt /> },
      { key: "gaz", label: "Gas", icon: <FaFire /> },
      { key: "water", label: "Water", icon: <IoWaterOutline /> },
    ],
  },
  {
    title: "Kitchen & Appliances",
    items: [
      { key: "television", label: "TV", icon: <FiTv /> },
      { key: "dishwasher", label: "Dishwasher", icon: <FaKitchenSet /> },
      {
        key: "washingMachine",
        label: "Washing Machine",
        icon: <TbWashMachine />,
      },
      { key: "microwave", label: "Microwave & Oven", icon: <LuMicrowave /> },
      { key: "fridge", label: "Fridge", icon: <TbFridge /> },
    ],
  },
  {
    title: "Location Benefits",
    items: [
      {
        key: "closeToTransportation",
        label: "Close to Transport",
        icon: <LiaBusSolid />,
      },
      { key: "natureView", label: "Nature View", icon: <MdNaturePeople /> },
      { key: "closeToBeach", label: "Close to Beach", icon: <TbBeach /> },
      { key: "closeToSchool", label: "Close to School", icon: <FaSchool /> },
      {
        key: "closeToSupermarket",
        label: "Close to Supermarket",
        icon: <MdStorefront />,
      },
    ],
  },
  {
    title: "Extra Equipments",
    items: [
      { key: "garden", label: "Garden", icon: <IoRoseOutline /> },
      { key: "balcony", label: "Balcony", icon: <MdBalcony /> },
    ],
  },
];

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const FourthStep = ({ updateFormData, data }) => {
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const rentRef = useRef(null);
  const buyRef = useRef(null);
  const Sref = useRef(null);

  const [features, setFeatures] = useState({});

  const toggleFeature = (key) => {
    setFeatures((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const onFinish = (formValues) => {
    const fullPayload = {
      ...formValues,
      ...features,
    };

    updateFormData(fullPayload);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Form Failed:", errorInfo);
  };

  return (
    <div className="flex flex-col items-center gap-6 sm:gap-10">
      <h1 className="text-textblack text-xl text-[20px] sm:text-[40px] font-bold">
        Specifications
      </h1>
      <p className="text-[18px] text-textgray font-light text-center max-w-[600px]">
        Provide detailed specifications to give potential buyers or renters a
        clear understanding of your offered property
      </p>

      {/* Feature Sections */}

      <div className="w-full max-w-[1000px] grid grid-cols-1 sm:grid-cols-2 gap-8 ">
        {featuresConfig.map((group, idx) => (
          <div key={idx} className="flex flex-col gap-3 ">
            <h2 className="text-textgray font-semibold text-md mr-[32px] ">
              {group.title}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {group.items.map(({ key, label, icon }) => (
                <div
                  key={key}
                  onClick={() => toggleFeature(key)}
                  className={`w-[115px] h-[73px] rounded-[23px] flex flex-col items-center justify-center cursor-pointer transition-colors text-center text-[12px] font-semibold
                    ${features[key] ? "bg-greencol text-white" : "bg-bggray text-textgray"}`}
                >
                  <div className="text-[20px] mb-1">{icon}</div>
                  {label}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Form
        name="basic"
        layout="vertical"
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        requiredMark={false}
        className="flex flex-col gap-[15px] items-center"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-[10px] mt-[10px]">
          <Form.Item
            label={
              <span className="ml-[50px] font-inter font-semibold text-[14px] text-textgray ">
                area
              </span>
            }
            name="area"
            rules={[
              {
                required: false,
                requiredMark: false,
                message: "please input a number",
              },
            ]}
          >
            <Input
              type="number"
              placeholder=""
              className="h-[45px]  "
              suffix={
                <span className="text-greencol text-[14px] font-medium">
                  m²
                </span>
              }
            />
          </Form.Item>
          <Form.Item
            label={
              <span className="ml-[40px] font-inter font-semibold text-[14px] text-textgray ">
                bedrooms
              </span>
            }
            name="numOfRooms"
            rules={[
              {
                required: false,
                requiredMark: false,
                message: "please input a valid number",
                max: 10,
              },
            ]}
          >
            <Input
              type="number"
              placeholder=""
              className="h-[45px]"
              suffix={<IoBed className="w-[20px] h-[20px] text-greencol " />}
            />
          </Form.Item>

          <Form.Item
            label={
              <span className="ml-[40px] font-inter font-semibold text-[14px] text-textgray ">
                bathrooms
              </span>
            }
            name="numOfBathroom"
            rules={[
              {
                required: false,
                requiredMark: false,
                max: "10",
                message: "please input a valid number",
              },
            ]}
          >
            <Input
              type="number"
              placeholder=""
              className="h-[45px]"
              suffix={<FaBath className="w-[18px] h-[18px] text-greencol " />}
            />
          </Form.Item>
          <Form.Item
            label={
              <span className="ml-[40px] font-inter font-semibold text-[14px] text-textgray ">
                Kitchens
              </span>
            }
            name="numOfKitchen"
            rules={[
              {
                required: false,
                requiredMark: false,
                max: "10",
                message: "please input a valid number",
              },
            ]}
          >
            <Input
              type="number"
              placeholder=""
              className="h-[45px]"
              suffix={
                <FaKitchenSet className="w-[18px] h-[18px] text-greencol " />
              }
            />
          </Form.Item>
          <Form.Item
            label={
              <span className="ml-[20px] font-inter font-semibold text-[14px] text-textgray ">
                garage capacity
              </span>
            }
            name="garageCapacity"
            rules={[
              {
                required: false,
                requiredMark: false,
                max: "10",
                message: "please input a valid number",
              },
            ]}
          >
            <Input
              type="number"
              placeholder=""
              className="h-[45px]"
              suffix={<FaCar className="w-[18px] h-[18px] text-greencol " />}
            />
          </Form.Item>
        </div>
        <Form.Item>
          <Button
            htmlType="submit"
            className="w-[120px] h-[50px] rounded-[25px] "
            type="primary"
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FourthStep;
