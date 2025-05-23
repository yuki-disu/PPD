import React from "react";
import { Button, Form, Input } from "antd";
import { FaLock } from "react-icons/fa";
import { MdHome } from "react-icons/md"; // Home icon
import { useDispatch } from "react-redux";
import { UpdatePassword } from "../../features/user/userAPI";
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const ResetPass = () => {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    const { password, newPassword, ConfirmNewPassword } = values;
    const token = localStorage.getItem("token");
    dispatch(
      UpdatePassword({ token, password, newPassword, ConfirmNewPassword })
    );
  };
  return (
    <Form
      requiredMark={false}
      name="update-info"
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
      className="flex flex-col items-center w-full md:mt-[50px] md:mr-[60px] "
    >
      {/* Home icon and HomeDZ title */}

      <div>
        <Form.Item
          label="Current password"
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
            className="h-[50px] w-[320px]"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          label="New Password"
          name="newPassword"
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
            className="h-[50px] w-[320px]"
            placeholder="New Password"
          />
        </Form.Item>
        <Form.Item
          label="New password confirm"
          name="ConfirmNewPassword"
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
            className="h-[50px] w-[320px]"
            placeholder="Confirm password"
          />
        </Form.Item>
      </div>

      <div className="mt-4 w-full flex justify-center">
        <Button
          htmlType="submit"
          color="primary"
          className="w-[320px] h-[50px]"
          variant="solid"
        >
          <p className="font-bold text-[16px]">Reset</p>
        </Button>
      </div>
    </Form>
  );
};

export default ResetPass;
