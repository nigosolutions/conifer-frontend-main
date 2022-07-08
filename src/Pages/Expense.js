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
  Select,
  Space,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import Column from "antd/lib/table/Column";
import TextArea from "antd/lib/input/TextArea";

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
    const projectcolumns = [
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Total Amount",
        dataIndex: "amount",
        key: "amount",
      },
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <a>Delete</a>
          </Space>
        ),
      },
    ];
    const [pvisible, setPVisible] = useState(false);
    const [selectCategory, setCategory] = useState(null);
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
          name="addexpenseform"
          initialValues={{
            date: moment(),
            modifier: "public",
          }}
          onValuesChange={(changedValues, AllValues) => {
            if (changedValues.category) {
              setCategory(changedValues.category);
            }
          }}
        >
          <Form.Item
            name="date"
            label="Date"
            rules={[
              {
                required: true,
                message: "Please input the Date!",
              },
            ]}
          >
            <DatePicker defaultValue={moment()} />
          </Form.Item>
          <Form.Item
            name="category"
            label="Select Category"
            rules={[
              {
                required: true,
                message: "Please input the Expense Category!",
              },
            ]}
          >
            <Select>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="office">Office</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>
          {selectCategory === "project" ? (
            <>
              <Form.Item
                name="project"
                label="Select Project"
                rules={[
                  {
                    required: true,
                    message: "Please input the Project!",
                  },
                ]}
              >
                <Select></Select>
              </Form.Item>
              <Button
                type="dashed"
                block
                onClick={() => {
                  setPVisible(true);
                }}
                icon={<PlusOutlined />}
                style={{ marginBottom: 10 }}
              >
                Add Expense
              </Button>
              <AddProjectExpensForm
                visible={pvisible}
                onCreate={onCreate}
                onCancel={() => {
                  setPVisible(false);
                }}
              />
              <Table columns={projectcolumns} />
            </>
          ) : null}
        </Form>
      </Modal>
    );
  };

  const AddProjectExpensForm = ({ visible, onCreate, onCancel }) => {
    const [selectMaterial, setMaterial] = useState(null);
    const [selectType, setType] = useState(null);
    const [form] = Form.useForm();
    return (
      <Modal
        visible={visible}
        title="Add Expese for Project"
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
          name="addprojectexpenseform"
          onValuesChange={(changedValues, AllValues) => {
            if (changedValues.type) {
              setType(changedValues.type);
            }
            if (changedValues.material) {
              setMaterial(changedValues.material);
            }
          }}
          initialValues={{
            modifier: "public",
          }}
        >
          <Form.Item
            name="type"
            label="Select Type"
            rules={[
              {
                required: true,
                message: "Please input the Type of expense!",
              },
            ]}
          >
            <Select>
              <Select.Option value="material">Material</Select.Option>
              <Select.Option value="extrawork">Extra Work</Select.Option>
              <Select.Option value="subcontract">Sub-Contract</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>
          {selectType === "material" ? (
            <>
              <Form.Item
                name="material"
                label="Select Material"
                rules={[
                  {
                    required: true,
                    message: "Please select the Material!",
                  },
                ]}
              >
                <Select>
                  <Select.Option value="cement">Cement</Select.Option>
                  <Select.Option value="steel">Steel</Select.Option>
                  <Select.Option value="aggregate">Aggregate</Select.Option>
                  <Select.Option value="sand">Msand/Sand</Select.Option>
                  <Select.Option value="solidblock">Solid Block</Select.Option>
                  <Select.Option value="other">Other</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="supplier"
                label="Supplier"
                rules={[
                  {
                    required: true,
                    message: "Please input the Supplier!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              {selectMaterial === "cement" ? (
                <>
                  <Form.Item
                    name="brand"
                    label="Brand"
                    rules={[
                      {
                        required: true,
                        message: "Please input the brand!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Row gutter={12}>
                    <Col span={12}>
                      <Form.Item
                        name="amount"
                        label="Total Amount"
                        rules={[
                          {
                            required: true,
                            message: "Please input the total amount!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="quantity"
                        label="Total Quantity (in bags)"
                        rules={[
                          {
                            required: true,
                            message: "Please input the quantity!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              ) : null}
              {selectMaterial === "steel" ? (
                <>
                  <Form.Item
                    name="brand"
                    label="Brand"
                    rules={[
                      {
                        required: true,
                        message: "Please input the brand!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="size"
                    label="Size"
                    rules={[
                      {
                        required: true,
                        message: "Please input the size!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Row gutter={12}>
                    <Col span={12}>
                      <Form.Item
                        name="amount"
                        label="Total Amount"
                        rules={[
                          {
                            required: true,
                            message: "Please input the total amount!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="quantity"
                        label="Total Quantity (in Kg)"
                        rules={[
                          {
                            required: true,
                            message: "Please input the quantity!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              ) : null}
              {selectMaterial === "aggregate" || selectMaterial === "sand" ? (
                <>
                  <Row gutter={12}>
                    <Col span={12}>
                      <Form.Item
                        name="amount"
                        label="Total Amount"
                        rules={[
                          {
                            required: true,
                            message: "Please input the total amount!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="quantity"
                        label="Total Quantity (in Unit)"
                        rules={[
                          {
                            required: true,
                            message: "Please input the quantity!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              ) : null}
              {selectMaterial === "solidblock" ? (
                <>
                  <Form.Item
                    name="size"
                    label="Size"
                    rules={[
                      {
                        required: true,
                        message: "Please input the size!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Row gutter={12}>
                    <Col span={12}>
                      <Form.Item
                        name="amount"
                        label="Total Amount"
                        rules={[
                          {
                            required: true,
                            message: "Please input the total amount!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="quantity"
                        label="Total Quantity (in Unit)"
                        rules={[
                          {
                            required: true,
                            message: "Please input the quantity!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              ) : null}

              <Form.Item name="remarks" label="Remarks">
                <TextArea />
              </Form.Item>
            </>
          ) : null}
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
