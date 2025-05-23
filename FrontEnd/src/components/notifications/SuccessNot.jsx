// components/SuccessNot.jsx
import { notification } from "antd";
import { useEffect } from "react";

const SuccessNot = ({ message }) => {
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (message) {
      api.success({
        message: "Success",
        description: message,
        placement: "topRight",
        duration: 4,
        style: {
          backgroundColor: "#BDDEBB",
          borderRadius: 12,
          borderRadius: 12,
          fontSize: 15,
        },
      });
    }
  }, [message, api]);

  return <>{contextHolder}</>;
};

export default SuccessNot;
