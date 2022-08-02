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
  Tabs,
  Tag,
} from "antd";
import { DeleteOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import api from "../axios.config";

const expandableRowColumns = {
  projectname: "Project Name",
};

const TotalExpense = () => {
  const [dataSource, setDataSource] = useState([]);
  const [expenseLoading, setExpenseLoading] = useState(false);
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
      render: (text, record) =>
        `${text === "Project" ? `Project (${record.projectname})` : `${text}`}`,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text, record) =>
        `${
          text === "Material"
            ? `Material (${record.material})`
            : text === undefined
            ? ""
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
  ];

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getExpense = () => {
    setExpenseLoading(true);
    api
      .get("/expense", {
        params: {
          status: "approved",
        },
      })
      .then((res) => {
        console.log(res);
        setExpense(res.data.message.Items);
      })
      .finally(() => {
        setExpenseLoading(false);
      });
  };

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
    <Table
      dataSource={expense}
      rowKey="id"
      expandable={{
        expandedRowRender: (record) => (
          <Row>
            {Object.keys(record).map((attr) =>
              attr === "project" ||
              attr === "id" ||
              attr === "username" ? null : (
                <Col span={12}>
                  <b>
                    {capitalizeFirstLetter(expandableRowColumns[attr] || attr)}
                  </b>{" "}
                  :{" "}
                  {attr === "date"
                    ? moment(record[attr]).format("DD-MM-YYYY")
                    : record[attr]}
                </Col>
              )
            )}
          </Row>
        ),
        rowExpandable: (record) => record.id !== "Not Expandable",
        expandRowByClick: true,
      }}
      columns={columns}
      loading={expenseLoading}
    />
  );
};

export default TotalExpense;
