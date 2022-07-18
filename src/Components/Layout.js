import {
	RiseOutlined,
	ProjectOutlined,
	BankOutlined,
	PlusOutlined,
	PoweroffOutlined,
} from "@ant-design/icons";
import { Image, Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "./clogo.png";
const { Header, Content, Footer, Sider } = Layout;

const App = () => {
	const [pathName, setPathName] = useState(null);

	let navigate = useNavigate();
	let location = useLocation();

	useEffect(() => {
		if (location.pathname === "/") navigate("/project");
		else setPathName(location.pathname);
	}, [location.pathname]);

	return (
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
					<Image src={logo} preview={false} />
				</div>
				<Menu
					theme="light"
					mode="inline"
					defaultSelectedKeys={pathName}
					selectedKeys={[pathName]}
					onClick={(item) => navigate(item.key)}
				>
					<Menu.Item key="/project" icon={<ProjectOutlined />}>
						Projects
					</Menu.Item>
					<Menu.Item key="/expense" icon={<RiseOutlined />}>
						Expenses
					</Menu.Item>
					{/* <Menu.SubMenu key="expense" title="Expense" icon={<RiseOutlined />}>
          <Menu.Item key="addexpense" icon={<PlusOutlined />}>
            Add Expense
          </Menu.Item>
        </Menu.SubMenu> */}
					<Menu.Item key="/fundManager" icon={<BankOutlined />}>
						Fund Manager
					</Menu.Item>
					<Menu.Item
						title=""
						style={{
							position: "absolute",
							bottom: 2,
							zIndex: 1,
							textAlign: "left",
							marginLeft: "37px",
							transition: "all 0.2s",
						}}
						key="logout"
					>
						<PoweroffOutlined /> LOGOUT
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
};

export default App;
