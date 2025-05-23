import React, { useEffect } from "react";
import { GiCheckMark } from "react-icons/gi";
import axios from "axios";
const Congratulations = ({ formData, fileList }) => {
  useEffect(() => {
    const addProperty = async () => {
      const token = localStorage.getItem("token");
      try {
        const formDataToSend = new FormData();
        for (let key in formData) {
          formDataToSend.append(key, formData[key]);
        }
        if (fileList.length > 0) {
          const imageCoverFile = fileList[0].originFileObj;
          formDataToSend.append("imageCover", imageCoverFile);

          for (let i = 1; i < fileList.length; i++) {
            formDataToSend.append("images", fileList[i].originFileObj);
          }
        }
        const response = await axios.post(
          "http://127.0.0.1:3000/api/v1/houses",
          formDataToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response);
      } catch (error) {
        console.error("Upload failed:", error.response?.data || error.message);
      }
    };
    addProperty();
  }, [formData, fileList]);
  return (
    <div className="flex flex-col items-center text-greencol">
      <div className="flex flex-row items-center justify-center rounded-full w-[90px] h-[90px] bg-greencol sm:mt-[50px]">
        <GiCheckMark className="text-white w-[50px] h-[50px]" />
      </div>
      <div className="mt-[20px]">
        <p className="text-[30px] font-semibold">Congratulations</p>
        <p className="text-[16px] mt-[20px]">
          Success! Your action is complete. If you need any assistance, we're
          here to help.
          <br /> Thank you for choosing us!
        </p>
      </div>
    </div>
  );
};

export default Congratulations;
