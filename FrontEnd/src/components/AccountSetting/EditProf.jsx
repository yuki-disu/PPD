import React, { useState } from "react";
import { Image, Dropdown, Upload, message } from "antd";
import { MdModeEdit } from "react-icons/md";
import UpdateInfoForm from "../UserAccess/UpdateInfoForm";
import defaultPic from "../../assets/user1.png";

const EditProf = () => {
  const [imageUrl, setImageUrl] = useState(defaultPic);
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  // Handle file upload
  const handleUpload = ({ file }) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result); // Update profile picture
      message.success("Profile picture updated!");
      selectedImageFile(file);
    };
    reader.readAsDataURL(file);
  };

  // Dropdown menu items
  const items = [
    {
      key: "1",
      label: (
        <button
          className="w-full text-left"
          onClick={() => document.getElementById("profile-img").click()}
        >
          View
        </button>
      ),
    },
    {
      key: "2",
      label: (
        <Upload
          showUploadList={false}
          beforeUpload={() => false} // Prevent automatic upload
          onChange={handleUpload}
          accept="image/*"
        >
          <button className="w-full text-left">Add</button>
        </Upload>
      ),
    },
    {
      key: "3",
      label: (
        <Upload
          showUploadList={false}
          beforeUpload={() => false}
          onChange={handleUpload}
          accept="image/*"
        >
          <button className="w-full text-left">Change</button>
        </Upload>
      ),
    },
    {
      key: "4",
      label: (
        <button
          className="w-full text-left text-red-500"
          onClick={() => {
            setImageUrl(defaultPic);
            message.success("Profile picture removed!");
          }}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center md:flex-row justify-between w-full md:px-[300px] ">
      {/* Profile Picture Container */}
      <div className="relative flex flex-col items-center">
        <div className="rounded-full w-[180px] h-[180px] flex items-center justify-center border-2 border-greencol overflow-hidden">
          <Image
            id="profile-img"
            width={170}
            height={170}
            className="rounded-full object-cover w-full h-full"
            src={imageUrl}
            alt="Profile"
            preview={{
              maskClassName: "rounded-full", // Ensures circular preview overlay
            }}
          />
        </div>

        {/* Dropdown for Edit Options */}
        <Dropdown menu={{ items }} placement="bottom">
          <div className="absolute bottom-2 right-2 w-[40px] h-[40px] flex items-center justify-center rounded-full bg-bggray p-[10px] transition-colors cursor-pointer hover:bg-gray-100">
            <MdModeEdit className="w-[24px] h-[24px] text-textgray" />
          </div>
        </Dropdown>
      </div>
      <div className="mt-[40px]">
        <UpdateInfoForm imageFile={selectedImageFile} />
      </div>
    </div>
  );
};

export default EditProf;
