import React, { useState } from "react";
import { Table, Tag } from "antd";
import { Select, Space } from "antd";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { Dropdown, Menu, Button } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import StUsMenu from "./StUsMenu";

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
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Wilaya",
    dataIndex: "wilaya",
    key: "wilaya",
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
    render: (text) => <StUsMenu initial={text} />,
  },
];
const data = [
  {
    key: "1",
    id: 1254,
    firstName: "Ousaied",
    lastName: " Sami",
    email: "sami@gmail.com",
    wilaya: "Constantine",
    status: "active",
  },
];
const UsersTable = () => {
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

export default UsersTable;
