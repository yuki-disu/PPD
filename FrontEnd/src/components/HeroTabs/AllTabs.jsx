import React, { useState } from "react";
import { Tabs } from "antd";
import "./AllTabs.css";
import RentTAb from "./RentTAb";
import BuyTab from "./BuyTab";
import RequiredLogin from "../Error/RequiredLogin"; // Adjust path as needed

const AllTabs = () => {
  const [activeKey, setActiveKey] = useState("1");

  const onChange = (key) => {
    setActiveKey(key);
  };
  const handleClose = () => {
    setActiveKey("1");
  };

  const items = [
    {
      key: "1",
      label: "RENT",
      children: <RentTAb />,
    },
    {
      key: "2",
      label: "BUY",
      children: <BuyTab />,
    },
    {
      key: "3",
      label: "POST",
      children: "", // We handle this via overlay
    },
  ];

  return (
    <div className="relative">
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        activeKey={activeKey}
        className="custom-tabs w-[360px] sm:w-[700px] grid-cols-2 sm:grid-cols-4"
      />

      {activeKey === "3" && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <RequiredLogin onClose={handleClose} />
        </div>
      )}
    </div>
  );
};

export default AllTabs;
