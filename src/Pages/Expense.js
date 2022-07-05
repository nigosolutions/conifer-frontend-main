import React, { useState } from "react";
import {
  Row,
  Col,
  Table,
  Card,
  Button,
  Divider,
  Checkbox,
  Form,
  Modal,
  Radio,
  Input,
  DatePicker,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";

const Expense = () => {
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => a.date - b.date,
    },
    {
      title: "Profile",
      dataIndex: "profile",
      key: "profile",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Total Value",
      dataIndex: "totalValue",
      key: "totalValue",
      sorter: (a, b) => a.totalValue - b.totalValue,
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const AddExpenseForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        visible={visible}
        title="Add a New Expense"
        okText="Add"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            date: moment(),
            modifier: "public",
          }}
        >
          <Form.Item
            name="date"
            label="Date"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <DatePicker defaultValue={moment()} />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input type="textarea" />
          </Form.Item>
          <Form.Item
            name="modifier"
            className="collection-create-form_last-form-item"
          >
            <Radio.Group>
              <Radio value="public">Public</Radio>
              <Radio value="private">Private</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  const [visible, setVisible] = useState(false);
  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setVisible(false);
  };

  return (
    <div>
      <Row>
        <Col span={20}>
          <Divider orientation="left" orientationMargin="0">
            Expenses
          </Divider>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            block
            onClick={() => {
              setVisible(true);
            }}
            style={{ float: "right", marginBottom: 10 }}
          >
            Add Expense
          </Button>
          <AddExpenseForm
            visible={visible}
            onCreate={onCreate}
            onCancel={() => {
              setVisible(false);
            }}
          />
          <Table dataSource={dataSource} columns={columns} />
        </Col>
        <Col span={4}>
          <Row justify="center">
            <Card
              style={{ margin: "0 0 10px 25px", width: "100%" }}
              bodyStyle={{ display: "flex", justifyContent: "center" }}
              hoverable
              title="Today"
            >
              0 ₹
            </Card>
            <Card
              style={{ margin: "0 0 10px 25px", width: "100%" }}
              bodyStyle={{ display: "flex", justifyContent: "center" }}
              hoverable
              title="Month"
            >
              0 ₹
            </Card>
            <Card
              style={{ margin: "0 0 10px 25px", width: "100%" }}
              bodyStyle={{ display: "flex", justifyContent: "center" }}
              hoverable
              title="Total"
            >
              0 ₹
            </Card>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
export default Expense;
