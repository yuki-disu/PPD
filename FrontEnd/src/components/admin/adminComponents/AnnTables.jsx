import React, { useState } from "react";
import { Table, Tag } from "antd";
import { Select, Space } from "antd";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { Dropdown, Menu, Button } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import StatusMenu from "./StatusMenu";
const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: (
      <div className="flex flex-row items-center">
        <p>Announcer</p>
        <CgArrowsExchangeAltV className="text-textgray h-[20px] w-[22px]" />
      </div>
    ),
    dataIndex: "announcer",
    key: "announcer",
  },
  {
    title: (
      <div className="flex flex-row items-center">
        <p>Type</p>
        <CgArrowsExchangeAltV className="text-textgray h-[20px] w-[22px]" />
      </div>
    ),
    dataIndex: "type",
    key: "type",
  },
  {
    title: (
      <div className="flex flex-row items-center">
        <p>Category</p>
        <CgArrowsExchangeAltV className="text-textgray h-[20px] w-[22px]" />
      </div>
    ),
    dataIndex: "category",
    key: "category",
  },
  {
    title: (
      <div className="flex flex-row items-center">
        <p>Status</p>
        <CgArrowsExchangeAltV className="text-textgray h-[20px] w-[22px]" />
      </div>
    ),
    dataIndex: "status",
    width: 170,
    key: "status",
    render: (text) => <StatusMenu initial={text} />,
  },
];
const data = [
  {
    key: "1",
    id: 1254,
    title: "a large house with 3 interfaces",
    announcer: "yaakoub allaoua",
    type: "house",
    category: "sale",
    status: "active",
  },
];
const AnnTables = () => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      components={{
        header: {
          cell: (props) => {
            return (
              <th
                {...props}
                style={{ backgroundColor: "#E9E9E9", color: "#3A3939" }}
              />
            );
          },
        },
      }}
    />
  );
};

export default AnnTables;
