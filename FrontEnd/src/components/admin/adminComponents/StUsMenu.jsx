import { useState } from "react";
import { Dropdown, Menu, Button } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

const StUsMenu = ({ initial }) => {
  const [status, setStatus] = useState(initial);

  const getDotColor = (value) => {
    switch (value) {
      case "active":
        return "bg-green-500";
      case "blocked":
        return "bg-red-500";

      default:
        return "bg-gray-400";
    }
  };

  const menu = (
    <Menu
      onClick={(e) => setStatus(e.key)}
      items={[
        { key: "active", label: "active" },
        { key: "blocked", label: "Block" },
      ]}
    />
  );

  return (
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${getDotColor(status)}`} />
      <span className="capitalize text-sm">{status}</span>
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button
          type="text"
          icon={<EllipsisOutlined className="text-gray-500" />}
        />
      </Dropdown>
    </div>
  );
};

export default StUsMenu;
