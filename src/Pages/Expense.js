import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Table,
  Card,
  Button,
  Divider,
  Space,
  Tooltip,
  Popconfirm,
  Typography,
} from "antd";
import { DeleteOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import api from "../axios.config";
import ViewExpense from "../Components/ViewExpense";

const Expense = () => {
  const [dataSource, setDataSource] = useState([]);
  const [expense, setExpense] = useState([]);
  const [selectedRecord, setRecord] = useState({});
  useEffect(() => {
    getExpense();
  }, []);

  const deleteExpense = (id) => {
    return api
      .delete("/expense", { data: { id } })
      .then((res) => {
        getExpense();
        console.log(id);
        console.log(res);
      })
      .catch((err) => console.log(err))
      .finally(() => {});
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => a.date - b.date,
      render: (text, record) => {
        var date = moment(text).format("DD-MM-YYYY");
        return date;
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text, record) =>
        `${
          text === "Material"
            ? `Material (${record.material})`
            : `${text} ${record.particular ? `(${record.particular})` : ""}`
        }`,
    },
    {
      title: "Total Value (in ₹)",
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
      title: "Approval Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="View">
            <a
              onClick={() => {
                setRecord(record);
                setViewExpense(true);
              }}
            >
              <EyeOutlined />
            </a>
          </Tooltip>

          <Popconfirm
            title="Are you sure you want to delete this record ?"
            okText="Delete"
            onConfirm={() => deleteExpense(record.id)}
          >
            <Typography.Link
              type="danger"
              style={{
                marginLeft: "10px",
              }}
            >
              <Tooltip title="Delete">
                <DeleteOutlined />
              </Tooltip>
            </Typography.Link>
          </Popconfirm>
        </Space>
      ),
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

  const [viewExpense, setViewExpense] = useState(false);

  const [visible, setVisible] = useState(false);
  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setVisible(false);
  };

  return (
    <div>
      <ViewExpense
        data={selectedRecord}
        visible={viewExpense}
        setVisible={setViewExpense}
      />
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
