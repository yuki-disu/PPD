import React from "react";
import { Button } from "antd";
import { GreenButton } from "../ui";
import { Link, useLocation } from "react-router-dom";
import Title from "./Title";

const NavLog = () => {
  const location = useLocation();
  let content;
  let link;
  if (location.pathname === "/register") {
    content = "Login";
    link = "/login";
  } else {
    content = "Sign up";
    link = "/register";
  }
  return (
    <div className=" flex flex-rwo items-center justify-between  align-element ">
      <Link to="/" className="cursor-pointer">
        <Title />
      </Link>
      <div className="flex flex-rwo gap-[20px] sm:ml-[60px]">
        <Link to={link}>
          <Button variant="outlined" color="primary" className="h-[42px] ">
            {content}
          </Button>
        </Link>
        <Link to="/">
          <Button variant="solid" color="primary" className="h-[42px]">
            continue as guest
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NavLog;
