import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Image, Layout, Menu } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
const items = [UserOutlined, VideoCameraOutlined, UploadOutlined].map(
  (icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
  })
);

const App = () => (
  <Layout hasSider>
    <Sider
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
        <Image src="" />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={items}
      />
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
