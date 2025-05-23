import React from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { DarkButton, GreenButton } from "../../ui";
import BigDarkButton from "../../ui/BigDarkButton";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useSelector } from "react-redux";
const { Option } = Select;

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const onFinish = (values) => {
  console.log(values);
};
const UpdateInfoForm = ({ imageFile }) => {
  const user = useSelector((state) => state.user.userInfo);
  console.log(user);
  console.log(user.phonenum);
  return (
    <Form
      requiredMark={false}
      name="update-info"
      layout="vertical"
      initialValues={{
        name: user.name || "",
        email: user.email || "",
        phonenum: user.phonenum || "",
      }}
      onFinish={onFinish} // Function to handle update submission
      autoComplete="off"
      className="flex flex-col items-center w-full"
    >
      <div>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
          className="w-full"
        >
          <Input
            prefix={
              <MdDriveFileRenameOutline className="text-greencol w-[20px] h-[18px] mr-[12px]" />
            }
            className="h-[50px] w-[320px]"
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
            className="h-[50px] w-[320px]"
          />
        </Form.Item>

        <Form.Item
          label="Phone number"
          name="phonenum"
          rules={[
            {
              pattern: /^[0-9+ ]+$/,
              message: "Please enter a valid phone number!",
            },
            { required: true, message: "Please input your phone number!" },
          ]}
          className="w-full"
        >
          <Input
            prefix={
              <FaPhoneAlt className="text-greencol w-[18px] h-[18px] mr-[10px]" />
            }
            className="h-[50px] w-[320px]"
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
          <p className="font-bold text-[16px]">Save</p>
        </Button>{" "}
      </div>
    </Form>
  );
};

export default UpdateInfoForm;
