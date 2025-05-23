import React, { useState, useEffect, useRef } from "react";
import RentForm from "./RentForm";
import { Select } from "antd";
import { DatePicker } from "antd";
import { gsap } from "gsap";

const options = [
  { value: 3, label: "3 months" },
  { value: 6, label: "6 months" },
  { value: 12, label: "1 year" },
  { value: 24, label: "2 years" },
  { value: 36, label: "3 years" },
];

const Step2Rent = () => {
  const [duration, setDuration] = useState(3);
  const rentPrice = 650000;
  const total = rentPrice * duration;

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const handleChange = (value) => {
    setDuration(value);
  };

  // Refs for animations
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    gsap.from(titleRef.current, {
      opacity: 0,
      y: -30,
      duration: 2,
      ease: "power3.out",
    });

    gsap.from(formRef.current, {
      opacity: 0,
      x: -50,
      duration: 1.5,
      delay: 0.3,
      ease: "power2.out",
    });

    gsap.from(infoRef.current, {
      opacity: 0,
      x: 50,
      duration: 1.5,
      delay: 0.5,
      ease: "power2.out",
    });
  }, []);

  return (
    <>
      <div className="flex flex-col gap-[20px]">
        <h1
          ref={titleRef}
          className="text-textblack text-[20px] sm:text-[38px] font-bold"
        >
          Request to Rent This House
        </h1>

        <div className="mt-[40px] flex flex-col items-center sm:flex-row sm:items-start justify-evenly sm:gap-[300px]">
          <div ref={formRef}>
            <RentForm />
          </div>
          <div
            ref={infoRef}
            className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md flex flex-col gap-6 border border-gray-100"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rental Start Date
              </label>
              <DatePicker
                style={{
                  width: "100%",
                  height: "40px",
                  borderRadius: "0.5rem",
                }}
                onChange={onChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rental Duration
              </label>
              <Select
                defaultValue={3}
                allowClear
                options={options}
                onChange={handleChange}
                className="w-full"
                style={{
                  height: "40px",
                  borderRadius: "0.5rem",
                }}
              />
            </div>

            <div className="pt-4 border-t border-gray-200 flex flex-col gap-2">
              <div className="text-base font-medium text-gray-600">
                Rent Price:{" "}
                <span className="text-gray-900 font-semibold">
                  {rentPrice} DA
                </span>
              </div>
              <div className="text-base font-medium text-gray-600">
                Total:{" "}
                <span className="text-gray-900 font-semibold">{total} DA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step2Rent;
