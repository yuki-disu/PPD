import React, { useEffect, useRef } from "react";
import LoginForm from "../components/UserAccess/LoginForm";
import Title from "../components/Title";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { BigSecGreen } from "../ui";
import { Footer, Forgot, NavLog, SecFooter } from "../components";
import img from "../assets/pls.png";
import { FaArrowLeftLong } from "react-icons/fa6";

const ForgotPassword = () => {
  const imageRef = useRef(null);
  useEffect(() => {
    gsap.from(imageRef.current, {
      x: 300,
      duration: 1,
      ease: "power2.out",
    });
  });
  const formRef = useRef(null);
  useEffect(() => {
    gsap.from(formRef.current, {
      x: -300,
      duration: 1,
      ease: "power2.out",
    });
  });
  return (
    <>
      <NavLog />
      <div className="h-[430px] mt-[25px] bg-bggreen ml-">
        <div className="align-element flex flex-row items-start justify-center">
          <div
            ref={formRef}
            className="bg-white flex flex-col items-center justify-start h-auto sm:mt-[50px] rounded-[10px] shadow-md gap-[20px] p-8"
          >
            <h1 className="text-3xl font-bold text-gray-800 ">
              Forgot Password
            </h1>
            <Forgot />
            <div className="flex flex-row gap-[10px] items-center ">
              <Link
                to="/login"
                className="flex flex-row gap-[8px] items-center text-textblack hover:underline text-[15px]"
              >
                <FaArrowLeftLong className="mt-[2px] text-textblack w-[15px] h-[15px]" />
                go back to login
              </Link>
            </div>
          </div>
          <img
            ref={imageRef}
            className="w-[600px] h-[400px] hidden lg:block ml-[50px]"
            src={img}
          />
        </div>
      </div>
      <div className="flex flex-row justify-end  align-element mt-[50px] mr-[200px]   ">
        <div className="hidden lg:block">
          <SecFooter />
        </div>
      </div>
      <div className="lg:hidden mt-[200px]">
        <Footer />
      </div>
    </>
  );
};

export default ForgotPassword;
