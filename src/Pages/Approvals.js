import React, { useState } from "react";
import { Row, Col, Table, Card, Button, Divider, Space, Tooltip } from "antd";
import {
  CheckCircleFilled,
  CheckCircleOutlined,
  CheckOutlined,
  CloseOutlined,
  EyeOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
const data = [
  {
    date: "1",
    title: "John Brown",
    profile: "hello",
    type: "New York No. 1 Lake Park",
    totalValue: 1234,
    user: "Gokul",
  },
];

const Approvals = () => {
  const [selectionType, setSelectionType] = useState([]);
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
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: () => (
        <Space size="middle">
          <Tooltip title="View">
            <a>
              <EyeOutlined />
            </a>
          </Tooltip>
          <Tooltip title="Approve">
            <a style={{ color: "green" }}>
              <Space>
                <CheckOutlined />
              </Space>
            </a>
          </Tooltip>
          <Tooltip title="Reject">
            <a style={{ color: "red" }}>
              <Space>
                <CloseOutlined />
              </Space>
            </a>
          </Tooltip>
        </Space>
      ),
    },
  ];

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
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  return (
    <div>
      <Row>
        <Col span={20}>
          <Divider orientation="left" orientationMargin="0">
            Approvals
          </Divider>

          <Table
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
            dataSource={data}
            expandable={{
              expandedRowRender: (record) => (
                <p
                  style={{
                    margin: 0,
                  }}
                >
                  {record.description}
                </p>
              ),
              rowExpandable: (record) => record.name !== "Not Expandable",
            }}
            columns={columns}
          />
        </Col>
        <Col span={4}>
          <Row justify="center">
            <Card
              style={{ margin: "0 0 10px 25px", width: "100%" }}
              bodyStyle={{ display: "flex", justifyContent: "center" }}
              hoverable
              title="Pending"
            >
              0
            </Card>
            <Card
              style={{ margin: "0 0 10px 25px", width: "100%" }}
              bodyStyle={{ display: "flex", justifyContent: "center" }}
              hoverable
              title="Approved"
            >
              0
            </Card>
            <Card
              style={{ margin: "0 0 10px 25px", width: "100%" }}
              bodyStyle={{ display: "flex", justifyContent: "center" }}
              hoverable
              title="Rejected"
            >
              0
            </Card>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
export default Approvals;
