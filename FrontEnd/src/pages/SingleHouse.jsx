import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

// Room/Property Basics
import { IoBed } from "react-icons/io5"; // Bed (Number of Bedrooms)
import { FaBath } from "react-icons/fa"; // Bath (Number of Bathrooms)
import { TbArrowsDiagonal2 } from "react-icons/tb"; // Surface area (Size)
import { ImagesScroll } from "../components";
// Climate & Heating
import { FaRegSnowflake } from "react-icons/fa"; // Air Conditioner / Cooling
import { FaFire } from "react-icons/fa"; // Gas
import { FaArrowLeftLong } from "react-icons/fa6";
// Kitchen & Appliances
import { FaKitchenSet } from "react-icons/fa6"; // Dishwasher
import { LuMicrowave } from "react-icons/lu"; // Microwave & Oven
import { TbFridge } from "react-icons/tb"; // Fridge
import { TbWashMachine } from "react-icons/tb"; // Washing Machine
import { FiTv } from "react-icons/fi"; // Television
import { MdElectricBolt } from "react-icons/md";
// Safety & Security
import { GiCctvCamera } from "react-icons/gi"; // Camera
import { PiFirstAidKitFill } from "react-icons/pi"; // First Aid Kit
import { FaFireExtinguisher } from "react-icons/fa6"; // Fire Extinguisher
import { RiAlarmWarningLine } from "react-icons/ri"; // Security Alarm
import { MdBalcony } from "react-icons/md";
import { FaStore } from "react-icons/fa6";
// Services & Utilities
import { MdCleaningServices } from "react-icons/md";
import { PiElevatorLight } from "react-icons/pi"; // Elevator
import { PiPawPrintLight } from "react-icons/pi"; // Pets Allowed
import { FiWifi } from "react-icons/fi"; // Wifi
import { IoWaterOutline } from "react-icons/io5"; // Water
import { CgSmartHomeWashMachine } from "react-icons/cg"; // (Not used — duplicate of wash machine)
import { CgGym } from "react-icons/cg"; // Sports Hall / Gym
import { FaBus } from "react-icons/fa6";
// Parking & Leisure
import { MdNaturePeople } from "react-icons/md";
import { TbParkingCircleFilled } from "react-icons/tb"; // Parking
import { FaSwimmingPool } from "react-icons/fa"; // Pool
import { TbBeach } from "react-icons/tb"; // Close to Beach
import { FaSchool } from "react-icons/fa"; // Close to School
import { FaTemperatureHigh } from "react-icons/fa";
// Location & Nature
import { CiLocationOn } from "react-icons/ci"; // Location Marker
import { LiaBusSolid } from "react-icons/lia"; // Close to Transport
import { IoRoseOutline } from "react-icons/io5"; // Garden
import { useEffect } from "react";
import { BiSolidCarGarage } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import React from "react";
import {
  DownloadOutlined,
  LeftOutlined,
  RightOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  UndoOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import { Image, Space, Row, Col, Button } from "antd";
import { GreenButton } from "../ui";
const SingleHouse = () => {
  const params = useParams();
  const houseId = params.id;
  console.log(houseId, "the id of the current house");
  const [house, setHouse] = useState("");

  useEffect(() => {
    const fetchHouse = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3000/api/v1/houses/${houseId}`
        );
        console.log(response.data.data);
        setHouse(response.data.data);
      } catch (err) {
        console.error("Error fetching house:", err);
      }
    };

    fetchHouse();
  }, [houseId]);
  return (
    <div className="align-element flex flex-col gap-[20px] mt-[100px]">
      <Link to="/allhouses">
        <div className="flex flex-row items-center gap-[5px] p-[10px] rounded-[5px] transition-colors hover:bg-bggray w-[80px]">
          <FaArrowLeftLong className="text-textblack" />
          <p className="text-text-black text-[15px]">back</p>
        </div>
      </Link>
      <div className="flex flex-col sm:flex-row items-start sm:gap-[40px] ">
        <div className=" flex flex-col sm:flex-row gap-[50px]">
          <div className="sm:w-[800px] flex flex-col items-start">
            <ImagesScroll images={house?.images || []} />
            <div className="flex flex-col items-start gap-[20px] mt-[25px] mr-[00px]">
              <h1 className="text-[18px] font-semibold sm:text-[28px] text-textblack">
                {house?.descriptions}
              </h1>
              <div className="flex flex-row gap-[10px] items-center ">
                <CiLocationOn className="w-[25px] h-[25px] text-textgray font-bold" />
                <h1 className="text-[14px] items-center sm:text-[16px] text-textgray">
                  {house.location}
                </h1>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-[18px] items-center w-auto">
                <div className="bg-bggreen2 px-[16px] py-[8px] text-greencol rounded-[8px] flex flex-row gap-[8px]">
                  <IoBed className="w-[20px] h-[20px]" />
                  <p className="text-[13px] font-semibold">
                    {house.numOfRooms} bedroom
                  </p>
                </div>
                <div className="bg-bggreen2 px-[16px] py-[8px] text-greencol rounded-[8px] flex flex-row gap-[8px]">
                  <FaBath className="w-[18px] h-[16px]" />
                  <p className="text-[13px] font-semibold">
                    {house.numOfBathroom} bathroom
                  </p>
                </div>
                <div className="bg-bggreen2 px-[16px] py-[8px] text-greencol rounded-[8px] flex flex-row gap-[8px]">
                  <FaKitchenSet className="w-[18px] h-[18px]" />
                  <div className="text-[13px] font-semibold">
                    {house.numOfKitchen} kitchen
                  </div>
                </div>
                <div className="bg-bggreen2 px-[16px] py-[8px] text-greencol rounded-[8px] flex flex-row gap-[8px]">
                  <TbArrowsDiagonal2 className="w-[18px] h-[18px]" />
                  <p className="text-[13px] font-semibold">{house.area} m²</p>
                </div>
              </div>

              {/* Heating and Air Conditioning */}
              <div className="flex flex-col items-start gap-[20px]">
                <h1 className="text-[16px] font-semibold text-textblack mt-[20px]">
                  Heating and Air Conditioning
                </h1>
                <div className="grid grid-cols-2 items-center gap-[30px] ">
                  {house.centralHeating && (
                    <div className="bg-bggray px-[16px] py-[8px] items-center text-textblack rounded-[8px] flex flex-row gap-[8px]">
                      <FaTemperatureHigh className="w-[18px] h-[18px]" />
                      <p className="text-[13px] font-medium">Central heating</p>
                    </div>
                  )}
                  <div className="bg-bggray px-[16px] py-[8px] text-textblack  rounded-[8px] flex flex-row gap-[8px]">
                    <FaRegSnowflake className="w-[18px] h-[18px]" />
                    <p className="text-[13px] font-medium">Air conditioning</p>
                  </div>
                </div>
              </div>

              {/* Safety and Security */}
              <div className="flex flex-col items-start gap-[20px] mt-[25px]">
                <h1 className="text-[16px] font-semibold text-textblack">
                  House Security
                </h1>
                <div className="grid grid-cols-2 sm:grid-cols-3 items-center gap-[30px]">
                  {house.alarmsAndSecurity && (
                    <div className="bg-bggray px-[16px] py-[8px] items-center text-textblack rounded-[8px] flex flex-row gap-[8px]">
                      <RiAlarmWarningLine className="w-[18px] h-[18px]" />
                      <p className="text-[13px] font-medium">
                        Alarm & Security
                      </p>
                    </div>
                  )}
                  {house.electricity && (
                    <div className="bg-bggray px-[16px] py-[8px] items-center text-textblack rounded-[8px] flex flex-row gap-[8px]">
                      <MdElectricBolt className="w-[18px] h-[18px]" />
                      <p className="text-[13px] font-medium">Electricity</p>
                    </div>
                  )}
                  {house.fireDetector && (
                    <div className="bg-bggray px-[16px] py-[8px] text-textblack rounded-[8px] flex flex-row gap-[8px]">
                      <FaFireExtinguisher className="w-[18px] h-[18px]" />
                      <p className="text-[13px] font-medium">
                        Fire Extinguisher
                      </p>
                    </div>
                  )}

                  {house.camera && (
                    <div className="bg-bggray items-center px-[16px] py-[8px] text-textblack rounded-[8px] flex flex-row gap-[8px]">
                      <GiCctvCamera className="w-[18px] h-[18px]" />
                      <p className="text-[13px] font-medium">
                        Security Cameras
                      </p>
                    </div>
                  )}
                  <div className="bg-bggray px-[16px] py-[8px] text-textblack rounded-[8px] flex flex-row gap-[8px]">
                    <PiFirstAidKitFill className="w-[18px] h-[18px]" />
                    <p className="text-[13px] font-medium">First Aid Kit</p>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="flex flex-col items-start gap-[20px] mt-[25px]">
                <h1 className="text-[16px] font-semibold text-textblack">
                  Services
                </h1>
                <div className="grid grid-cols-2 sm:grid-cols-3 items-center gap-[30px]">
                  {house.wifi && (
                    <div className="bg-bggray w-auto  px-[16px] py-[8px] text-textblack rounded-[8px] flex flex-row items-end gap-[8px]">
                      <FiWifi className="w-[18px] h-[18px]" />
                      <p className="text-[13px] font-medium">Wifi</p>
                    </div>
                  )}

                  {house.dishwasher && (
                    <div className="bg-bggray w-auto  px-[16px] py-[8px] text-textblack rounded-[8px] flex flex-row items-end gap-[8px]">
                      <FaKitchenSet className="w-[18px] h-[18px]" />
                      <p className="text-[13px] font-medium">Dish washer</p>
                    </div>
                  )}
                  {house.washingMachine && (
                    <div className="bg-bggray w-auto  px-[16px] py-[8px] text-textblack rounded-[8px] flex flex-row items-end gap-[8px]">
                      <TbWashMachine className="w-[18px] h-[18px]" />
                      <p className="text-[13px] font-medium">
                        {" "}
                        Washing machine
                      </p>
                    </div>
                  )}
                  {house.petsAllowed && (
                    <div className="bg-bggray w-auto  px-[16px] py-[8px] text-textblack rounded-[8px] flex flex-row items-end gap-[8px]">
                      <PiPawPrintLight className="w-[18px] h-[18px]" />
                      <p className="text-[13px] font-medium">Animals allowed</p>
                    </div>
                  )}
                  {house.microwave && (
                    <div className="bg-bggray w-auto  px-[16px] py-[8px] text-textblack rounded-[8px] flex flex-row items-end gap-[8px]">
                      <LuMicrowave className="w-[18px] h-[18px]" />
                      <p className="text-[13px] font-medium">
                        Oven & microwave
                      </p>
                    </div>
                  )}
                  {house.fridge && (
                    <div className="bg-bggray w-auto  px-[16px] py-[8px] text-textblack rounded-[8px] flex flex-row items-end gap-[8px]">
                      <TbFridge className="w-[18px] h-[18px]" />
                      <p className="text-[13px] font-medium">Fridge </p>
                    </div>
                  )}
                  {house.tv && (
                    <div className="bg-bggray items-center px-[16px] py-[8px] text-textblack rounded-[8px] flex flex-row gap-[8px]">
                      <FiTv className="w-[18px] h-[18px]" />
                      <p className="text-[13px] font-medium">Television</p>
                    </div>
                  )}

                  {house.elevator && (
                    <div className="bg-bggray items-center px-[16px] py-[8px] text-textblack rounded-[8px] flex flex-row gap-[8px]">
                      <PiElevatorLight className="w-[18px] h-[18px]" />
                      <p className="text-[13px] font-medium">Elevator</p>
                    </div>
                  )}

                  <div className="bg-bggray items-center px-[16px] py-[8px] text-textblack rounded-[8px] flex flex-row gap-[8px]">
                    <PiPawPrintLight className="w-[18px] h-[18px]" />
                    <p className="text-[13px] font-medium">Pets Allowed</p>
                  </div>
                </div>
              </div>

              {/* Leisure */}
              <div className="flex flex-col items-start gap-[20px] mt-[25px]">
                <h1 className="text-[16px] font-semibold text-textblack">
                  Leisure & Outdoor
                </h1>
                <div className="grid grid-cols-2 items-center gap-[30px]">
                  <div className="bg-bggray items-center px-[16px] py-[8px] text-textblack rounded-[8px] flex flex-row gap-[8px]">
                    <CgGym className="w-[18px] h-[18px]" />
                    <p className="text-[13px] font-medium">Gym</p>
                  </div>
                  {house.closeToBeach && (
                    <div className="bg-bggray items-center px-[16px] py-[8px] text-textblack rounded-[8px] flex flex-row gap-[8px]">
                      <TbBeach className="w-[18px] h-[18px]" />
                      <p className="text-[13px] font-medium">Close to Beach</p>
                    </div>
                  )}
                  {house.garden && (
                    <div className="bg-bggray items-center px-[16px] py-[8px] text-textblack rounded-[8px] flex flex-row gap-[8px]">
                      <IoRoseOutline className="w-[18px] h-[18px]" />
                      <p className="text-[13px] font-medium">Garden</p>
                    </div>
                  )}
                  {house.closeToSupermarket && (
                    <div className="bg-bggray items-center px-[16px] py-[8px] text-textblack rounded-[8px] flex flex-row gap-[8px]">
                      <FaStore className="w-[18px] h-[18px]" />
                      <p className="text-[13px] font-medium">
                        Close to markets
                      </p>
                    </div>
                  )}
                  {house.closeToTransportation && (
                    <div className="bg-bggray items-center px-[16px] py-[8px] text-textblack rounded-[8px] flex flex-row gap-[8px]">
                      <FaBus className="w-[18px] h-[18px]" />
                      <p className="text-[13px] font-medium">Transportation</p>
                    </div>
                  )}
                  <div className="bg-bggray items-center px-[16px] py-[8px] text-textblack rounded-[8px] flex flex-row gap-[8px]">
                    <FaSwimmingPool className="w-[18px] h-[18px]" />
                    <p className="text-[13px] font-medium">Pool</p>
                  </div>
                  {house.natureView && (
                    <div className="bg-bggray items-center px-[16px] py-[8px] text-textblack rounded-[8px] flex flex-row gap-[8px]">
                      <MdNaturePeople className="w-[18px] h-[18px]" />
                      <p className="text-[13px] font-medium">Naturel view</p>
                    </div>
                  )}
                  {house.cleaning && (
                    <div className="bg-bggray items-center px-[16px] py-[8px] text-textblack rounded-[8px] flex flex-row gap-[8px]">
                      <MdCleaningServices className="w-[18px] h-[18px]" />
                      <p className="text-[13px] font-medium">Cleaning</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="flex flex-col items-start gap-[20px] mt-[25px]">
                <h1 className="text-[16px] font-semibold text-textblack">
                  Location Specifications
                </h1>
                <div className="grid grid-cols-2 items-center gap-[30px]">
                  {house.closeToTransportation && (
                    <div className="bg-bggray items-center px-[16px] py-[8px] text-textblack rounded-[8px] flex flex-row gap-[8px]">
                      <LiaBusSolid className="w-[18px] h-[18px]" />
                      <p className="text-[13px] font-medium">
                        Close to Transport
                      </p>
                    </div>
                  )}
                  {house.closeToSchool && (
                    <div className="bg-bggray items-center px-[16px] py-[8px] text-textblack rounded-[8px] flex flex-row gap-[8px]">
                      <FaSchool className="w-[18px] h-[18px]" />
                      <p className="text-[13px] font-medium">Close to School</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Parking & Utilities */}
              <div className="flex flex-col items-start gap-[20px] mt-[25px]">
                <h1 className="text-[16px] font-semibold text-textblack">
                  Utilities & Parking
                </h1>
                <div className="grid grid-cols-2 items-center gap-[30px]">
                  {house.parking && (
                    <div className="bg-bggray items-center px-[16px] py-[8px] text-textblack rounded-[8px] flex flex-row gap-[8px]">
                      <TbParkingCircleFilled className="w-[18px] h-[18px]" />
                      <p className="text-[13px] font-medium">
                        Parking (Capacity: {house.garageCapacity})
                      </p>
                    </div>
                  )}

                  <div className="bg-bggray items-center px-[16px] py-[8px] text-textblack rounded-[8px] flex flex-row gap-[8px]">
                    <IoWaterOutline className="w-[18px] h-[18px]" />
                    <p className="text-[13px] font-medium">Water Supply</p>
                  </div>
                  {house.gaz && (
                    <div className="bg-bggray items-center px-[16px] py-[8px] text-textblack rounded-[8px] flex flex-row gap-[8px]">
                      <FaFire className="w-[18px] h-[18px]" />
                      <p className="text-[13px] font-medium">Gas Available</p>
                    </div>
                  )}
                  {house.balcony && (
                    <div className="bg-bggray items-center px-[16px] py-[8px] text-textblack rounded-[8px] flex flex-row gap-[8px]">
                      <MdBalcony className="w-[18px] h-[18px]" />
                      <p className="text-[13px] font-medium">Gas Available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-[20px]">
          <p className="text-textblack font-semibold">
            {" "}
            Secure Rental, cancel anytime
          </p>
          <div className="flex flex-row w-full justify-between">
            <p className="text-textblack font-semibold">available: </p>
            <div className="flex flex-row gap-[5px] text-textblack font-semibold">
              yes
              <FaCheck className="text-greencol w-[20px] h-[20px] mr-2" />
            </div>
          </div>

          <div className="flex flex-row items-center w-full justify-between">
            <p className="text-textblack font-semibold">Price per Month:</p>
            <p className="text-textblack font-semibold mr-2">
              {house.price}
              <span className="text-greencol"> DA</span>{" "}
            </p>
          </div>
          <Link to={`/allhouses/${houseId}/rent`}>
            <Button
              variant="solid"
              color="primary "
              className="w-[320px] text-white font-semibold text-[17px] h-[45px]"
            >
              get you house !
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleHouse;
