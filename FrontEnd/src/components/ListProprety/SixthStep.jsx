import React from "react";
import { Form, Input } from "antd";
import image from "../../assets/mob.png";
const SixthStep = () => {
  const onFinish = (values) => {
    console.log("Payment info submitted:", values);
    message.success("Payment submitted successfully!");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed to submit:", errorInfo);
    message.error("Please check the form and try again.");
  };

  return (
    <div className="flex flex-col items-center gap-[10px] sm:gap-[20px]">
      <h1 className="text-textblack text-[20px] sm:text-[40px] font-bold">
        Payment
      </h1>

      <p className="text-[18px] text-textgray font-light text-center">
        To publish this announcement, you must make a payment.
        <br /> Otherwise, it will be suspended. use your{" "}
        <span className="font-bold">Edahabia</span> card to pay
      </p>
      <Form
        layout="vertical"
        className=" flex flex-col items-center"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="grid grid-cols-1  lg:grid-cols-2  gap-y-[7px] gap-x-[20px] sm:gap-x-[80px] ">
          <Form.Item
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

        <div className="grid grid-cols-1  lg:grid-cols-2  gap-y-[7px] gap-x-[20px] sm:gap-x-[80px] ">
          <Form.Item
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
    </div>
  );
};

export default SixthStep;
