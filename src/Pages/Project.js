import React, { useState } from "react";
import { Row, Col, Table, Form, Input, Divider, Button } from "antd";

const Project = () => {
	const [form] = Form.useForm();
	const [dataSource, setDataSource] = useState([]);
	const columns = [
		{
			title: "Project No.",
			dataIndex: "number",
			key: "number",
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Type",
			dataIndex: "type",
			key: "type",
		},
		{
			title: "Location",
			dataIndex: "location",
			key: "location",
		},
		{
			title: "Contact",
			dataIndex: "contact",
			key: "contact",
		},
	];

	const onFinish = (values) => {
		console.log("Success:", values);
	};

	const onReset = (values) => {
		form.resetFields();
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	const AddPropertyForm = () => (
		<div style={{ paddingLeft: "40px" }}>
			<Divider orientation="left" orientationMargin="0">
				Add a new Project
			</Divider>
			<Form
				name="basic"
				form={form}
				layout="vertical"
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
				size="small"
			>
				<Form.Item
					label="Project Number"
					name="number"
					rules={[
						{ required: true, message: "Please input correct Project Number!" },
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Project Name"
					name="name"
					rules={[{ required: true, message: "Please enter Project Name!" }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Project Type"
					name="type"
					rules={[{ required: true, message: "Please enter Project Type!" }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Location"
					name="location"
					rules={[{ required: true, message: "Please enter location!" }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Contact Details"
					name="contact"
					rules={[{ required: true, message: "Please enter contact details!" }]}
				>
					<Input />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Add Project
					</Button>{" "}
					&nbsp;
					<Button htmlType="button" onClick={onReset}>
						Clear
					</Button>
				</Form.Item>
			</Form>
		</div>
	);

	return (
		<div>
			<Row>
				<Col span={16}>
					<Divider orientation="left" orientationMargin="0">
						Project Details
					</Divider>
					<Table dataSource={dataSource} columns={columns} />
				</Col>
				<Col span={8}>
					<AddPropertyForm />
				</Col>
			</Row>
		</div>
	);
};

export default Project;
