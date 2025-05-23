import React, { useState } from "react";
import { Input } from "antd";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
const { TextArea } = Input;
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";

const FifthStep = ({ fileList, setFileList }) => {
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = (file) =>
    __awaiter(void 0, void 0, void 0, function* () {
      let src = file.url;
      if (!src) {
        src = yield new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj);
          reader.onload = () => resolve(reader.result);
        });
      }
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow === null || imgWindow === void 0
        ? void 0
        : imgWindow.document.write(image.outerHTML);
    });

  return (
    <div className="flex flex-col items-center gap-[10px] sm:gap-[20px]">
      <h1 className="text-textblack text-[20px] sm:text-[40px] font-bold">
        Description & Images
      </h1>
      <p className="text-[18px] text-textgray font-light text-center max-w-[600px]">
        Capture the essence of your property with a compelling description.{" "}
        <br /> This is your chance to highlight its unique features and make it
        stand out.
      </p>
      <div className="flex flex-col gap-[100px] justify-center items-center mt-[40px]">
        <div className="flex flex-col items-center gap-[10px] ">
          <p className="text-[16px] text-semibold font-semibold text-textgray ">
            Images
          </p>
          <p className="text-[16px] mb-[15px]">
            the first image added will be the main image <br />
            so be specific with the images order
          </p>
          <ImgCrop rotationSlider className="w-[400px]">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              beforeUpload={() => false}
              className=""
            >
              {fileList.length < 5 && (
                <div className="flex flex-row items-center justify-center">
                  <p className="text-[100px] font-thin mb-[20px] text-greencol">
                    +
                  </p>
                </div>
              )}
            </Upload>
          </ImgCrop>
        </div>
      </div>
    </div>
  );
};

export default FifthStep;
