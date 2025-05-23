import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import image from "../../assets/Price.png";
import { Button, Form, Input } from "antd";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const SecondStep = ({ updateFormData, data }) => {
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const rentRef = useRef(null);
  const buyRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power2.out", duration: 0.8 },
    });

    tl.from(headingRef.current, { opacity: 0, y: -30 })
      .from(paragraphRef.current, { opacity: 0, y: -20 }, "-=0.5")
      .from(
        [rentRef.current, buyRef.current],
        {
          opacity: 0,
          scale: 0.5,
          stagger: 0.2,
        },
        "-=0.3"
      )
      .from(formRef.current, { opacity: 0, y: -30 });
  }, []);

  const onFinish = (values) => {
    updateFormData({
      price: values.price,
    });
    console.log(values.price);
  };

  return (
    <div>
      <div className="flex flex-col items-center gap-[10px] sm:gap-[20px]">
        <h1
          ref={headingRef}
          className="text-textblack text-[20px] sm:text-[40px] font-bold"
        >
          Add Price
        </h1>

        <p
          ref={paragraphRef}
          className="text-[18px] text-textgray font-light text-center"
        >
          Now, let's determine the price for your property.
          <br /> Enter a competitive and reasonable price to make your listing
          more appealing.
          <br /> If you are <strong className="font-bold">renting</strong> the
          house, enter the price of rent per month.
        </p>

        <div className="flex flex-col sm:flex-row gap-[40px] items-center sm:gap-[200px] mt-[20px] sm:mt-[50px]">
          <Form
            requiredMark={false}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            ref={formRef}
            className="flex flex-col items-center"
          >
            <Form.Item
              labelCol={{ span: 24 }}
              label={
                <p className="font-title font-semibold text-[16px] text-textblack">
                  Price
                </p>
              }
              name="price"
              rules={[{ required: true, message: "Please input the price!" }]}
            >
              <Input
                suffix={
                  <span className="text-greencol text-[14px] font-medium">
                    DA
                  </span>
                }
                placeholder="Price"
                className="h-[45px] w-[320px]"
              />
            </Form.Item>

            <Button
              htmlType="submit"
              className="w-[120px] h-[50px] rounded-[25px] mt-[10px] sm:mr-[40px]"
              type="primary"
            >
              Save
            </Button>
          </Form>

          <img
            ref={rentRef}
            className="h-[80px] w-[80px] sm:w-[150px] sm:h-[150px]"
            src={image}
            alt="Price illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default SecondStep;
