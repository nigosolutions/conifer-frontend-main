import { useState, useEffect } from "react";
import { Row, Col, Table, Form, Input, Divider, Button, Select } from "antd";

const { Option } = Select;
const ManageUsers = () => {
  const [form] = Form.useForm();
  const [addUserLoading, setAULoading] = useState(false);
  const dataSource = [
    {
      key: "1",
      name: "Gokul Shaji",
      username: "gokulas108",
      role: "SuperAdmin",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];

  const onFinish = (values) => {};

  const onReset = (values) => {
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const AddUserForm = () => (
    <div style={{ paddingLeft: "40px" }}>
      <Divider orientation="left" orientationMargin="0">
        Add a new User
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
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter Name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please enter Username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please select the Role!" }]}
        >
          <Select placeholder="Select a role">
            <Option value="Admin">male</Option>
            <Option value="Staff">female</Option>
            <Option value="Engineer">other</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            size="middle"
            loading={addUserLoading}
            type="primary"
            htmlType="submit"
          >
            Add User
          </Button>{" "}
          &nbsp;
          <Button size="middle" htmlType="button" onClick={onReset}>
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
            User Details
          </Divider>
          <Table dataSource={dataSource} columns={columns} />;
        </Col>
        <Col span={8}>
          <AddUserForm />
        </Col>
      </Row>
    </div>
  );
};

export default ManageUsers;
