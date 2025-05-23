import React, { useEffect, useRef } from "react";
import LoginForm from "../components/UserAccess/LoginForm";
import Title from "../components/Title";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { BigSecGreen } from "../ui";
import { Footer, NavLog, SecFooter } from "../components";
import img from "../assets/pls.png";
const Login = () => {
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
      <div className="h-[430px]  bg-bggreen mt-[5px]">
        <div className="align-element flex flex-row items-start justify-center">
          <div
            ref={formRef}
            className="bg-white flex flex-col items-start justify-start h-auto sm:mt-[50px] rounded-[10px] shadow-md gap-[20px] p-8"
          >
            <h1 className="text-2xl font-bold text-gray-800 ">
              Log in to explore housing opportunities!
            </h1>
            <LoginForm />
            <div className="flex items-center gap-4 w-full my-4">
              <div className="h-px bg-textgray flex-grow" />
              <span className="text-textgray text-sm">or</span>
              <div className="h-px bg-textgray flex-grow" />
            </div>
            <BigSecGreen text={<p>continue with google</p>} />

            <div className="flex flex-row gap-[10px] items-center ">
              <p className="text-textblack text-[15px] ">
                you are a new member ?{" "}
              </p>

              <Link to="/register" className="text-greencol hover:underline">
                sign up
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

export default Login;
