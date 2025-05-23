import React, { useEffect, useState } from "react";
import { Form, Input } from "antd";
import BigDarkButton from "../../ui/BigDarkButton";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Forgot from "./Forgot";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, signUpUser } from "../../features/user/userAPI";
import toast from "react-hot-toast";
import { GrStatusGood } from "react-icons/gr";
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, userInfo } = useSelector((state) => state.user);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const onFinish = (values) => {
    const { email, password } = values;
    const credentials = {
      email,
      password,
    };
    dispatch(loginUser(credentials));
    setHasSubmitted(true);
  };
  useEffect(() => {
    if (userInfo && hasSubmitted) {
      toast.custom(
        <div className="bg-white border-[1px] border-greencol p-[20px] flex flex-col items-start gap-[25pxs] rounded-[20px] w-[100px] sm:w-[380px] h-[100px]  mr-[10px] ">
          <div className="flex flex-row items-center justify-center gap-[10px]">
            <GrStatusGood className="text-greencol w-[27px] h-[27px]" />
            <p className="text-greencol font-semibold">
              Logged in successfully
            </p>
          </div>
          <p className="mt-[10px] text-textblack">
            welcome back {userInfo.username} !
          </p>
        </div>
      );
      setHasSubmitted(false);
      navigate("/");
    }
    if (error) {
      toast.error(error);
    }
  }, [userInfo, error]);
  return (
    <Form
      requiredMark={false}
      name="basic"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="mt-[15px] flex flex-col items-center w-full"
    >
      <div>
        <Form.Item
          label={<p className="font-title">Username or Email</p>}
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your username or email !",
            },
          ]}
          className="w-full"
        >
          <Input
            prefix={
              <MdEmail className="text-greencol w-[20px] h-[18px] mr-[12px]" />
            }
            className="h-[50px] w-[340px] sm:w-[500px]"
            placeholder="username or email"
          />
        </Form.Item>

        <Form.Item
          label={
            <div className="flex flex-row justify-between w-full gap-[160px] sm:gap-[310px]">
              <p className="font-title">Password</p>
              <Link to="/forgotpassword">
                <button
                  type="button"
                  onClick={() => setActiveTab("forgotPassword")}
                  className=" text font-medium hover:underline text-[14px] text-textblack font-title "
                >
                  forgot password?
                </button>
              </Link>
            </div>
          }
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 8, message: "Password must be at least 8 characters" },
          ]}
          className="w-full"
        >
          <Input.Password
            prefix={
              <FaLock className="text-greencol w-[20px] h-[17px] mr-[12px]" />
            }
            className="h-[50px] w-[340px] sm:w-[500px]"
            placeholder="Password"
          />
        </Form.Item>
      </div>
      <div className="mt-4 w-full flex justify-center">
        <BigDarkButton text="Login" />
      </div>
    </Form>
  );
};

export default LoginForm;
