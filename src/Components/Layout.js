import {
  RiseOutlined,
  ProjectOutlined,
  BankOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Image, Layout, Menu } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import logo from "./clogo.png";
const { Header, Content, Footer, Sider } = Layout;

const App = () => (
  <Layout hasSider>
    <Sider
      theme="light"
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div className="logo">
        <Image src={logo} />
      </div>
      <Menu theme="light" mode="inline" defaultSelectedKeys={["projects"]}>
        <Menu.Item key="projects" icon={<ProjectOutlined />}>
          Projects
        </Menu.Item>
        <Menu.SubMenu key="expense" title="Expense" icon={<RiseOutlined />}>
          <Menu.Item key="addexpense" icon={<PlusOutlined />}>
            Add Expense
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="fundmanager" icon={<BankOutlined />}>
          Fund Manager
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout
      className="site-layout"
      style={{
        marginLeft: 200,
      }}
    >
      <Content
        style={{
          margin: "24px 16px 0",
          overflow: "initial",
        }}
      >
        <div
          className="site-layout-background"
          style={{
            padding: 24,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Conifer Group ©2022
      </Footer>
    </Layout>
  </Layout>
);

export default App;
