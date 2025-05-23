import { notification } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const ErrorNot = ({ error }) => {
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (error) {
      api.error({
        message: "Error",
        description: error,
        placement: "topRight",
        duration: 4,
        icon: <CloseCircleOutlined style={{ color: "#ff4d4f" }} />,
        style: {
          backgroundColor: "#ffcccc", // Soft red background
          border: "1px solid #ff6666", // Slightly darker red border
          borderRadius: 12,
          fontSize: 15,
        },
      });
    }
  }, [error, api]);

  return <>{contextHolder}</>;
};

export default ErrorNot;
