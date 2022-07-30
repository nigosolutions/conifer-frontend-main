import React, { useState, useEffect } from "react";
import { Row, Col, Table, Card, Button, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import api from "../axios.config";

const Expense = () => {
  const [dataSource, setDataSource] = useState([]);
  const [expense, setExpense] = useState([]);
  useEffect(() => {
    getExpense();
  }, []);

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
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
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

  const getExpense = () => {
    api.get("/expense").then((res) => {
      console.log(res);
      setExpense(res.data.message.Items);
    });
  };

  let navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
              navigate("/addExpense");
            }}
            style={{ float: "right", marginBottom: 10 }}
          >
            Add Expense
          </Button>

          <Table dataSource={expense} columns={columns} />
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
