import React, { useState, useEffect } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, Drawer } from "antd";
import { FaUserEdit, FaRegFileAlt } from "react-icons/fa";
import { LuKeyRound } from "react-icons/lu";
import { MdChecklistRtl, MdHistory } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import EditProf from "./AccountSetting/EditProf";
import ResetPass from "./AccountSetting/ResetPass";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import RequiredLogin from "./Error/RequiredLogin";

const { Header, Sider, Content } = Layout;
const textGray = "#696A6F";
const greenCol = "#7ABC87"; // Active & hover color

const App = () => {
  
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [activeTab, setActiveTab] = useState("empty");
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setCollapsed(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const getSelectedKey = (path) => {
    const parts = path.split("/");
    return parts[2] || "editProfile";
  };
  const menuItems = [
    {
      key: "header1",
      label: (
        <span
          className="font-title font-semibold text-[12px]"
          style={{ color: textGray }}
        >
          Account
        </span>
      ),
      type: "group",
    },
    {
      key: "editProfile",
      icon: <FaUserEdit className="w-[28px] transition-colors" />,
      label: "Edit Profile",
    },
    {
      key: "resetPassword",
      icon: <LuKeyRound className="w-[28px] h-[20px] transition-colors" />,
      label: "Reset Password",
    },
    { key: "divider1", type: "divider" },
    {
      key: "header2",
      label: (
        <span
          className="font-title font-semibold text-[12px]"
          style={{ color: textGray }}
        >
          Activities
        </span>
      ),
      type: "group",
    },
    {
      key: "yourListing",
      icon: <MdChecklistRtl className="w-[28px] h-[26px] transition-colors" />,
      label: "Your Listing",
    },
    {
      key: "yourActivities",
      icon: <MdHistory className="w-[28px] h-[25px] transition-colors" />,
      label: "Your Activities",
    },
    {
      key: "termsOfUse",
      icon: <FaRegFileAlt className="w-[28px] h-[20px] transition-colors" />,
      label: "Terms of Use",
    },
    {
      key: "logout",
      icon: <FiLogOut className="w-[29px] h-[20px] transition-colors" />,
      label: "Logout",
    },
  ];

  return (
    <Layout>
      {!isMobile ? (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={240}
          className="bg-white"
        >
          <div className="demo-logo-vertical" />
          <Menu
            mode="inline"
            selectedKeys={[getSelectedKey(location.pathname)]}
            items={menuItems.map((item) => ({
              ...item,
              label: (
                <span
                  className="text-[15px] w-[220px] font-title block transition-colors"
                  style={{
                    color: textGray,
                    transition: "color 0.3s",
                    margin: "5px",
                  }}
                >
                  {item.label}
                </span>
              ),
              icon:
                item.icon &&
                React.cloneElement(item.icon, {
                  style: {
                    color: textGray,
                    transition: "color 0.3s",
                    marginLeft: collapsed ? "-8px" : "0",
                  },
                }),

              onClick: (e) => {
                setActiveTab(item.key);
                if (item.key === "logout") {
                  // handle logout here
                } else {
                  navigate(`/dashboard/${item.key}`);
                }
                document.querySelectorAll(".ant-menu-item").forEach((el) => {
                  el.style.color = textGray;
                  el.querySelector("svg")?.setAttribute(
                    "style",
                    `color: ${textGray}; transition: color 0.3s;`
                  );
                });
                e.domEvent.currentTarget.style.color = greenCol;
                e.domEvent.currentTarget
                  .querySelector("svg")
                  ?.setAttribute(
                    "style",
                    `color: ${greenCol}; transition: color 0.3s;`
                  );
              },
            }))}
          />
        </Sider>
      ) : (
        <Drawer
          placement="left"
          closable
          onClose={() => setCollapsed(false)}
          open={collapsed}
          bodyStyle={{ padding: 0 }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["editProfile"]}
            items={menuItems.map((item) => ({
              ...item,
              label: (
                <span
                  className="font-title w-[220px] block transition-colors"
                  style={{
                    color: textGray,
                    transition: "color 0.3s",
                  }}
                >
                  {item.label}
                </span>
              ),
              icon:
                item.icon &&
                React.cloneElement(item.icon, {
                  style: { color: textGray, transition: "color 0.3s" },
                }),
              onClick: (e) => {
                if (item.key === "logout") {
                  // handle logout here
                } else {
                  navigate(`/dashboard/${item.key}`);
                }
                setActiveTab(item.key);

                document.querySelectorAll(".ant-menu-item").forEach((el) => {
                  el.style.color = textGray;
                  el.querySelector("svg")?.setAttribute(
                    "style",
                    `color: ${textGray}; transition: color 0.3s;`
                  );
                });
                e.domEvent.currentTarget.style.color = greenCol;
                e.domEvent.currentTarget
                  .querySelector("svg")
                  ?.setAttribute(
                    "style",
                    `color: ${greenCol}; transition: color 0.3s;`
                  );
              },
            }))}
          />
        </Drawer>
      )}

      <Layout>
        <Header className="flex justify-between items-center px-4 bg-white">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="text-lg w-12 h-12"
          />
        </Header>
        <Content className="m-6 p-6 min-h-screen bg-white rounded-lg">
          <Outlet />
          {activeTab === "logout" && (
            <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
              <RequiredLogin onClose={handleClose} />
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
