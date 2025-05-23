import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { DarkButton } from "../../ui";
import BigDarkButton from "../../ui/BigDarkButton";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../features/user/userAPI";
import toast from "react-hot-toast";
const { Option } = Select;
import { useEffect } from "react";
import { GrStatusGood } from "react-icons/gr";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { userInfo, error } = useSelector((state) => state.user);
  const onFinish = (values) => {
    const {
      username,
      firstname,
      lastname,
      email,
      phone,
      password,
      passwordConfirm,
    } = values;
    const userData = {
      username,
      firstname,
      lastname,
      email,
      phone,
      password,
      passwordConfirm,
      role: "user",
    };
    dispatch(signUpUser(userData));
  };
  useEffect(() => {
    if (userInfo && hasSubmitted) {
      toast.custom(
        <div className="bg-white border-[1px] border-greencol p-[20px] flex flex-col items-start gap-[25pxs] rounded-[20px] w-[100px] sm:w-[380px] h-[100px]  mr-[10px] ">
          <div className="flex flex-row items-center justify-center gap-[10px]">
            <GrStatusGood className="text-greencol w-[27px] h-[27px]" />
            <p className="text-greencol font-semibold">
              Account created successfully
            </p>
          </div>
        </div>
      );
      setHasSubmitted(false);
    }
  }, [userInfo, error]);
  return (
    <Form
      requiredMark={false}
      name="basic"
      layout="vertical" /* Improves label positioning */
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="flex flex-col items-center w-full"
    >
      <div className="flex flex-col md:grid md:grid-cols-2 md:gap-x-[30px] md:mt-[5px]">
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
          className="w-full"
        >
          <Input
            prefix={
              <FaUserAlt className="text-greencol w-[17px] h-[17px] mr-[12px]" />
            }
            className="h-[50px] w-[340px] sm:w-[240px]"
            placeholder="username"
          />
        </Form.Item>
        <Form.Item
          label="First Name"
          name="firstname"
          rules={[{ required: true, message: "Please input your name!" }]}
          className="w-full"
        >
          <Input
            prefix={
              <FaUserAlt className="text-greencol w-[17px] h-[17px] mr-[12px]" />
            }
            className="h-[50px] w-[340px] sm:w-[240px]"
            placeholder="First Name"
          />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastname"
          rules={[{ required: true, message: "Please input your name!" }]}
          className="w-full"
        >
          <Input
            prefix={
              <FaUserAlt className="text-greencol w-[17px] h-[17px] mr-[12px]" />
            }
            className="h-[50px] w-[340px] sm:w-[240px]"
            placeholder="Last Name"
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { type: "email", message: "Please enter a valid email!" },
            { required: true, message: "Please input your email!" },
          ]}
          className="w-full"
        >
          <Input
            prefix={
              <MdEmail className="text-greencol w-[20px] h-[18px] mr-[12px]" />
            }
            className="h-[50px] w-[340px] sm:w-[240px]"
            placeholder="E-mail"
          />
        </Form.Item>
        <Form.Item
          label="Phone number"
          name="phone"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
          className="w-full"
        >
          <Input
            prefix={
              <FaPhoneAlt className="text-greencol w-[18px] h-[18px] mr-[10px]" />
            }
            className="h-[50px] w-[340px] sm:w-[240px]"
            placeholder="Phone number"
          />
        </Form.Item>
        <Form.Item
          label="Password"
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
            className="h-[50px] w-[340px] sm:w-[240px]"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          label="Confirm password"
          name="passwordConfirm"
          rules={[
            { required: true, message: "Please confirm your password!" },
            { min: 8, message: "Password must be at least 8 characters" },
          ]}
          className="w-full"
        >
          <Input.Password
            prefix={
              <FaLock className="text-greencol w-[20px] h-[17px] mr-[12px]" />
            }
            className="h-[50px] w-[340px] sm:w-[240px]"
            placeholder="Confirm password"
          />
        </Form.Item>
      </div>
      <div className="mt-4 w-full flex justify-center">
        <BigDarkButton htmlType="submit" text="Continue" />
      </div>
    </Form>
  );
};

export default RegisterForm;
