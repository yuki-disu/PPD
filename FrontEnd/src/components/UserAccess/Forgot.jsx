import React, { useState } from "react";
import { Form, Input } from "antd";
import BigDarkButton from "../../ui/BigDarkButton";
import { MdEmail } from "react-icons/md";
import ForgotCode from "./ForgotCode";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const onFinish = (values) => {
  console.log(values);
};

const Forgot = () => {
  const [forgot, setForgot] = useState("forgot");

  // Show confirmation input when state is "forgotcode"
  if (forgot === "forgotcode") {
    return <ForgotCode />;
  }

  // Show email input form initially
  return (
    <Form
      requiredMark={false}
      name="basic"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={(values) => {
        onFinish(values);
        setForgot("forgotcode"); // show code input after submit
      }}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="flex flex-col items-center w-full"
    >
      <div>
        <Form.Item
          label="E-mail"
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
            className="h-[50px] w-[340px] sm:w-[500px]"
            placeholder="E-mail"
          />
        </Form.Item>
      </div>
      <div className="mt-4 w-full flex justify-center">
        <BigDarkButton text="Send Confirmation Code" />
      </div>
    </Form>
  );
};

export default Forgot;
