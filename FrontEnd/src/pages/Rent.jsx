import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Calendar, DatePicker, Space } from "antd";
import dayjs from "dayjs";
import { IoBed } from "react-icons/io5";
import { FaBath } from "react-icons/fa";
import { FaKitchenSet } from "react-icons/fa6";
import { BiSolidCarGarage } from "react-icons/bi";
import { MdLocationPin } from "react-icons/md";
import axios from "axios";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { Form, Input } from "antd";
import image from "./../assets/mob.png";

// Extend dayjs with the plugins
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const Rent = () => {
  const params = useParams();
  const houseId = params.id;
  const [house, setHouse] = useState({});
  const [rentPeriods, setRentPeriods] = useState([]);

  const onFinish = (values) => {
    console.log("Payment info submitted:", values);
    message.success("Payment submitted successfully!");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed to submit:", errorInfo);
    message.error("Please check the form and try again.");
  };
  const isDateRented = (dayjsDate) => {
    return rentPeriods.some((period) => {
      const startDate = dayjs(period.startDate);
      const endDate = dayjs(period.endDate);
      return (
        dayjsDate.isSameOrAfter(startDate, "day") &&
        dayjsDate.isSameOrBefore(endDate, "day")
      );
    });
  };

  const customDateRender = (date) => {
    const rented = isDateRented(date);
    return (
      <div
        style={{
          height: "100%",
          borderRadius: "6px",
          backgroundColor: rented ? "#696A6F" : "transparent",
          color: rented ? "white" : "inherit",
          textAlign: "center",
          lineHeight: "24px",
        }}
      >
        {date.date()}
      </div>
    );
  };
  const dateFormat = "YYYY-MM-DD";
  const minDate = dayjs("2025-05-01");
  const maxDate = dayjs("2025-12-31");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const disabledStartDate = (current) => {
    if (!current) return false;
    if (current.isBefore(minDate, "day") || current.isAfter(maxDate, "day"))
      return true;
    if (endDate && current.isAfter(endDate, "day")) return true;
    // Also disable dates in rented periods
    return isDateRented(current);
  };

  // Disable end dates outside allowed range or in rented periods or before selected start date
  const disabledEndDate = (current) => {
    if (!current) return false;
    if (current.isBefore(minDate, "day") || current.isAfter(maxDate, "day"))
      return true;
    if (startDate && current.isBefore(startDate, "day")) return true;
    return isDateRented(current);
  };
  useEffect(() => {
    const fetchHouse = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3000/api/v1/houses/${houseId}`
        );
        setHouse(response.data.data);
      } catch (err) {
        console.error("Error fetching house:", err);
      }
    };

    fetchHouse();
    const fetchDates = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3000/api/v1/houses/getDays/${houseId}`
        );
        const dates = response.data.transaction;
        console.log(response.data.transaction);
        setRentPeriods(dates);
        console.log("rrrrrrr", rentPeriods);
      } catch (err) {
        console.error("Error fetching dates:", err);
      }
    };

    fetchDates();
  }, [houseId]);

  const rentHouse = async () => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    const amount = house.price;
    const estate_id = houseId;
    const formattedStartDate = dayjs(startDate).format("YYYY-MM-DD");
    const formattedEndDate = dayjs(endDate).format("YYYY-MM-DD");
    console.log(houseId, amount, formattedStartDate, formattedEndDate);
    try {
      const response = await axios.patch(
        "http://127.0.0.1:3000/api/v1/houses/rentHouse",
        { estate_id, startDate, endDate, amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-[40px] sm:mt-[120px] align-element">
      <h1 className="text-textblack text-[20px] sm:text-[38px] font-bold">
        Request to Rent This Property
      </h1>
      <p className="mt-[30px] text-textgray text-[17px] font-medium text-center">
        Thank you for trusting HomeDZ! We’re excited to help you take the next
        step toward your new home.
        <br /> Just fill in the details below to start the rental process.
      </p>
      <h1 className="text-textblack text-[20px] sm:text-[28px] font-bold mt-[50px]">
        You are renting this property :
      </h1>
      <div className="flex flex-row items-start justify-between algin-element mt-[30px] gap-[30px]">
        <div className="w-[420px] h-[250px] bg-bggray">
          <img
            src={house.imageCover}
            className="w-[460px] h-[300px] rounded-[10px]"
            alt="House"
          />
        </div>

        <div className="flex flex-col items-start sm:w-[600px]">
          <p className="text-textgray font-semibold text-[15px]">
            {house.description}
          </p>
          <div className="flex flex-row w-[600px] mt-[10px] items-center">
            <MdLocationPin className="text-textgray w-[20px] h-[25px]" />
            <p className="text-textblack font-semibold text-[15px]">
              {house.location}
            </p>
          </div>
          <div className="grid grid-cols-3 mt-[10px] gap-4">
            <div className="flex justify-between items-center text-textblack mt-[20px] w-[120px] p-[5px] bg-bggray rounded-[10px]">
              <span className="text-textblack font-semibold text-[13px]">
                Bedrooms
              </span>
              <div className="flex items-center gap-2 text-textgray">
                <span className="text-[13px] font-semibold">
                  {house.numOfRooms}
                </span>
                <IoBed className="w-[18px] h-[18px]" />
              </div>
            </div>

            <div className="flex justify-between items-center text-textblack mt-[20px] w-[120px] p-[5px] bg-bggray rounded-[10px]">
              <span className="text-textblack font-semibold text-[13px]">
                Bathrooms
              </span>
              <div className="flex items-center gap-2 text-textgray">
                <span className="text-[13px] font-semibold">
                  {house.numOfBathroom}
                </span>
                <FaBath className="w-[16px] h-[16px]" />
              </div>
            </div>

            <div className="flex justify-between items-center text-textblack mt-[20px] w-[120px] p-[5px] bg-bggray rounded-[10px]">
              <span className="text-textblack font-semibold text-[13px]">
                Kitchens
              </span>
              <div className="flex items-center gap-2 text-textgray">
                <span className="text-[13px] font-semibold">
                  {house.numOfKitchen}
                </span>
                <FaKitchenSet className="w-[16px] h-[16px]" />
              </div>
            </div>

            <div className="flex justify-between items-center text-textblack mt-[20px] w-[120px] p-[5px] bg-bggray rounded-[10px]">
              <span className="text-textblack font-semibold text-[14px]">
                Surface
              </span>
              <div className="flex items-center gap-2">
                <span className="text-textgray text-[13px] font-semibold">
                  {house.area} m²
                </span>
              </div>
            </div>

            {house.garageCapacity > 0 && (
              <div className="flex justify-between items-center text-textblack mt-[20px] w-[120px] p-[5px] bg-bggray rounded-[10px]">
                <span className="text-textblack font-semibold text-[14px]">
                  Garage
                </span>
                <div className="flex items-center gap-2 text-textgray">
                  <span className="text-[13px] font-semibold">
                    {house.garageCapacity}
                  </span>
                  <BiSolidCarGarage className="w-[16px] h-[16px]" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full mt-[100px] flex flex-col items-center">
        <h2 className="text-textblack font-bold text-[24px] mb-[20px] text-center">
          Availability Calendar
        </h2>
        <p className="mt-[10px] text-textgray text-[16px] font-medium text-center">
          Please take a look at this calendar to explore the available periods
          during which you can rent the property. <br /> Then enter the start
          and end dates bellow
        </p>{" "}
        <div className="flex flex-row items-center text-center gap-[5px] mt-[10px]">
          <div className="flex flex-row rounded-full w-[15px] h-[15px] bg-textgray"></div>
          <p className="text-textgray text-[16px] "> unavailable periods </p>
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg max-w-[1100px] mx-auto">
          <Calendar
            key={rentPeriods.length}
            dateFullCellRender={customDateRender}
          />
        </div>
      </div>
      <p className="mt-[30px] text-textgray text-[16px] font-medium text-center">
        Please input the start date and end date
      </p>{" "}
      <Space direction="horizontal" size="middle" className="mt-8">
        <DatePicker
          format={dateFormat}
          value={startDate}
          onChange={(date) => setStartDate(date)}
          disabledDate={disabledStartDate}
          placeholder="Start Date"
          className="rounded-md w-[200px] border-textgray h-[40px]"
        />
        <DatePicker
          format={dateFormat}
          value={endDate}
          onChange={(date) => setEndDate(date)}
          disabledDate={disabledEndDate}
          placeholder="End Date"
          className="rounded-md w-[200px] border-textgray h-[40px]"
        />
      </Space>
      <p className="mt-[60px] text-textgray text-[16px] font-medium text-center">
        Please input your payment information
      </p>{" "}
      <Form
        layout="vertical"
        className="w-1/2 flex flex-col items-center mt-[40px]"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2  gap-[20px] sm:gap-x-[80px] ">
          <Form.Item
            className="flex flex-col items-start"
            label={
              <p className="text-textgray font-semibold font-title ">
                Card Number
              </p>
            }
            name="cardNumber"
            rules={[
              {
                pattern: /^\d{16}$/,
                message: "Card number must be 16 digits",
              },
            ]}
            required={false}
            style={{ flex: 1 }}
          >
            <Input
              suffix={<img src={image} className="w-[25px] h-[25px]" />}
              placeholder="0000 0000 0000 0000"
              className=" h-[45px] w-[280px] border-[1px] "
            />
          </Form.Item>

          <Form.Item
            className="flex flex-col items-start"
            label={
              <p
                className="text-textgray font-semibold font-title 
              "
              >
                Expiry Date
              </p>
            }
            name="expiry"
            rules={[
              {
                pattern: /^(0[1-9]|1[0-2])\/\d{2}$/,
                message: "Format should be MM/YY",
              },
            ]}
            required={false}
            style={{ flex: 1 }}
          >
            <Input
              suffix={<img src={image} className="w-[25px] h-[25px]" />}
              className="w-[280px] h-[45px] border-[1px] "
              placeholder="MM/YY"
              style={{ height: "45px" }}
            />
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2   gap-[20px] sm:gap-x-[80px] ">
          <Form.Item
            className="flex flex-col items-start"
            label={
              <p className="text-textgray font-semibold font-title ">CVC</p>
            }
            name="cvv"
            rules={[
              {
                pattern: /^\d{3}$/,
                message: "CVV must be 3 digits",
              },
            ]}
            required={false}
            style={{ flex: 1 }}
          >
            <Input
              suffix={<img src={image} className="w-[25px] h-[25px]" />}
              placeholder="CVC"
              className="w-[280px] h-[45px] border-[1px] "
            />
          </Form.Item>

          <Form.Item
            className="flex flex-col items-start"
            label={
              <p className="text-textgray font-semibold font-title ">
                Phone Number
              </p>
            }
            name="phone"
            rules={[
              {
                pattern: /^0(5|6|7)[0-9]{8}$/,
                message: "Enter a valid Algerian phone number",
              },
            ]}
            required={false}
            style={{ flex: 1 }}
          >
            <Input
              className="w-[280px] h-[45px] border-[1px] "
              placeholder="phone numbers"
            />
          </Form.Item>
        </div>
      </Form>
      <Button
        variant="solid"
        color="primary"
        className="w-[250px] h-[45px]"
        onClick={() => rentHouse()}
      >
        Confirm
      </Button>
    </div>
  );
};

export default Rent;
