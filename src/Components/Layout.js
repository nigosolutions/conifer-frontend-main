import {
  RiseOutlined,
  ProjectOutlined,
  BankOutlined,
  PlusOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FormOutlined,
  UserOutlined,
  LogoutOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Avatar, Divider, Image, Layout, Menu } from "antd";
import React, { useState } from "react";
import logo from "./clogo.png";

import { Outlet, useLocation, useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const headings = {
  "/": "Dashboard",
  "/buildings": "Buildings",
  "/workorder": "Work Orders",
  "/notifications": "Notifications",
};

React.useLayoutEffect = React.useEffect;

const LayoutComponent = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [showButton, setShowButton] = useState(false);

  let navigate = useNavigate();
  let location = useLocation();

  return (
    <div>
      <Layout>
        <div
          style={{
            zIndex: 999,
            top: 3,
            left: 8,
            height: "40px",
            position: "fixed",
            display: showButton ? "inline-block" : "none",
            color: "black",
            cursor: "pointer",
            fontSize: 18,
          }}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
        </div>
        {showButton && (
          <Header
            style={{
              position: "absolute",
              display: "none",
            }}
          >
            <Menu theme="dark" mode="horizontal"></Menu>
          </Header>
        )}
        <Sider
          theme="light"
          width={170}
          style={{
            overflow: "auto",
            height: "100%",
            position: "fixed",
            left: 0,
            zIndex: 998,
          }}
          breakpoint="lg"
          collapsed={collapsed}
          onCollapse={(val) => setCollapsed(val)}
          collapsedWidth={0}
          onBreakpoint={(val) => setShowButton(val)}
        >
          <div className="logo">
            <Image src={logo} />
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
            onClick={(item) => navigate(item.key)}
          >
            <Menu.Item key="project" icon={<ProjectOutlined />}>
              Projects
            </Menu.Item>
            <Menu.SubMenu
              onTitleClick={(item) => navigate(item.key)}
              key="expense"
              title="Expense"
              icon={<RiseOutlined />}
            >
              <Menu.Item key="addexpense" icon={<PlusOutlined />}>
                Add Expense
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key="fundmanager" icon={<BankOutlined />}>
              Fund Manager
            </Menu.Item>
            <Menu.Item key="reports" icon={<FormOutlined />}>
              Reports
            </Menu.Item>

            <Divider />
            <Menu.SubMenu key="user" title="User" icon={<UserOutlined />}>
              <Menu.Item key="changepassword" icon={<EditOutlined />}>
                Change Password
              </Menu.Item>
              <Menu.Item key="logout" icon={<LogoutOutlined />}>
                Signout
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Sider>

        <Layout
          className="site-layout sidebar"
          style={{
            marginLeft: showButton ? 0 : 170,
            marginTop: 0,
          }}
        >
          <Content
            style={{
              borderRadius: showButton ? "0" : "2px 0 0 0",
              overflow: "initial",
            }}
          >
            <div
              className="site-layout-background"
              style={{ backgroundColor: "#F7F7F7", padding: 15 }}
            >
              <div style={{ backgroundColor: "#FFFF", padding: 24 }}>
                <Outlet />
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: "center", backgroundColor: "#F7F7F7" }}>
            CONIFER GROUP ©2022
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default LayoutComponent;
