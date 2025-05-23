import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import house from "../../assets/hm.png";
import appartement from "../../assets/appartment.png";
import studio from "../../assets/studio.png";
import { Button, Form, Input, Radio } from "antd";

const ThirdStep = ({ updateFormData, data }) => {
  const { TextArea } = Input;

  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const rentRef = useRef(null);
  const buyRef = useRef(null);
  const Sref = useRef(null);
  const formRef = useRef(null);
  const [propertyType, setPropertyType] = useState("");

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power2.out", duration: 0.8 },
    });

    tl.from(headingRef.current, { opacity: 0, y: -30 })
      .from(paragraphRef.current, { opacity: 0, y: -20 }, "-=0.5")
      .from(
        [rentRef.current, buyRef.current, Sref.current],
        {
          opacity: 0,
          scale: 0.5,
          stagger: 0.2,
        },
        "-=0.3"
      );
  }, []);

  const onFinish = (values) => {
    console.log("description:", values.description);
    console.log("Address:", values.location);
    console.log("Property Type:", propertyType);
    updateFormData({
      location: values.location,
      description: values.description,
      type: propertyType,
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const propertyOptions = [
    {
      label: "Studio",
      value: "studio",
      icon: studio,
      ref: rentRef,
    },
    {
      label: "Apartment",
      value: "apartment",
      icon: appartement,
      ref: Sref,
    },
    {
      label: "House",
      value: "house",
      icon: house,
      ref: buyRef,
    },
  ];

  return (
    <div className="flex flex-col items-center gap-[10px] sm:gap-[20px]">
      <h1
        ref={headingRef}
        className="text-textblack text-[20px] sm:text-[40px] font-bold"
      >
        Property Details
      </h1>

      <p
        ref={paragraphRef}
        className="text-[18px] text-textgray font-light text-center"
      >
        Let's make your property shine!
        <br /> Choose the type of the property and fill in these key details to
        attract the right buyers or renters.
      </p>
      <Form
        ref={formRef}
        requiredMark={false}
        name="propertyForm"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        style={{ maxWidth: 600, width: "100%" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="mt-[30px] flex flex-col gap-[20px] items-center"
      >
        <div className="flex flex-col sm:flex-row items-center gap-[30px]">
          <Form.Item
            label={
              <p className="sm:mt-[48px] font-title font-semibold text-[16px] text-textgray ml-[45px]">
                Description
              </p>
            }
            name="description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <TextArea
              placeholder="Describe your property (e.g., number of rooms, amenities, location highlights)"
              autoSize={{ minRows: 3, maxRows: 5 }}
              className="w-[200px] sm:w-[320px]"
            />
          </Form.Item>

          <Form.Item
            label={
              <p className="font-title font-semibold text-[16px] text-textgray  ml-[75px]">
                location
              </p>
            }
            name="location"
            rules={[{ required: true, message: "Please input the address!" }]}
          >
            <Input placeholder="Address" className="h-[45px] w-[320px]" />
          </Form.Item>
        </div>
        <Form.Item className="mt-[20px] flex-col items-center">
          <p className="font-title font-semibold text-[16px] text-textgray ">
            Property Type
          </p>
          <Radio.Group
            className="flex gap-[40px] sm:gap-[100px] justify-center mt-[20px]"
            onChange={(e) => setPropertyType(e.target.value)}
          >
            {propertyOptions.map((option) => (
              <Radio
                key={option.value}
                value={option.value}
                className="w-[80px] h-[80px] sm:w-[130px] sm:h-[130px] rounded-full flex flex-col items-center justify-center cursor-pointer transition-colors"
                style={{
                  backgroundColor:
                    propertyType === option.value ? "#7ABC87" : "#E9E9E9", // Conditional background color
                }}
              >
                <div
                  ref={option.ref}
                  className="flex flex-col items-center justify-center"
                >
                  <img
                    src={option.icon}
                    className="w-[30px] h-[30px] sm:w-[50px] sm:h-[50px]"
                    alt={option.label}
                  />
                  <p
                    className="text-[12px] sm:text-[17px] font-bold"
                    style={{
                      color: propertyType === option.value ? "#fff" : "#696A6F", // Change text color when selected
                    }}
                  >
                    {option.label}
                  </p>
                </div>
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            className="w-[120px] h-[50px] rounded-[25px] "
            type="primary"
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ThirdStep;
