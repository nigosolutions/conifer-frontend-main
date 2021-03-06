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
import ViewExpense from "../Components/ViewExpense";
import ApiTable from "../Components/ApiTable";
const { TabPane } = Tabs;

const PendingExpense = (props) => {
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

	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	const getExpense = () => {
		setExpenseLoading(true);
		api
			.get("/expense", {
				params: {
					status: props.status,
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

	return "hello";
	// <Table
	// 	dataSource={expense}
	// 	rowKey="id"
	// 	expandable={{
	// 		expandedRowRender: (record) => <ViewExpense record={record} />,
	// 		rowExpandable: (record) => record.id !== "Not Expandable",
	// 		expandRowByClick: true,
	// 	}}
	// 	columns={columns}
	// 	loading={expenseLoading}
	// />
};

const onChange = (key) => {
	console.log(key);
};

const OverallExpense = ({ status = "rejected" }) => {
	const deleteExpense = (id) => {
		// return api
		// 	.delete("/expense", { data: { id } })
		// 	.then((res) => {
		// 		getExpense();
		// 		console.log(id);
		// 		console.log(res);
		// 	})
		// 	.catch((err) => console.log(err))
		// 	.finally(() => {});
	};

	let navigate = useNavigate();

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
			title: "Total Value (in ???)",
			dataIndex: "amount",
			key: "amount",
			sorter: (a, b) => a.amount - b.amount,
		},
		{
			title: "Approval Status",
			dataIndex: "status",
			key: "status",
			render: (text, record) => (
				<Tag
					color={
						text === "approved"
							? "green"
							: text === "rejected"
							? "red"
							: "orange"
					}
					key={text}
				>
					{text.toUpperCase()}
				</Tag>
			),
		},
		...(status === "pending"
			? [
					{
						title: "Action",
						dataIndex: "action",
						key: "action",
						render: (text, record) => (
							<Space size="middle">
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
			  ]
			: []),
		...(status === "rejected"
			? [
					{
						title: "Reason",
						dataIndex: "reason",
						key: "reason",
					},
			  ]
			: []),
	];

	return (
		<div>
			<Row>
				<Col span={20}>
					<Row>
						<Divider orientation="left" orientationMargin="0">
							My Expenses
						</Divider>
					</Row>
					<Row>
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
					</Row>
					<Row>
						<Tabs
							style={{ width: "100%" }}
							defaultActiveKey="1"
							onChange={onChange}
						>
							<TabPane tab="Pending" key="1">
								<PendingExpense status="pending" />
							</TabPane>
							<TabPane tab="Approved" key="2">
								<PendingExpense status="approved" />
							</TabPane>
							<TabPane tab="Rejected" key="3">
								<PendingExpense status="rejected" />
								<ApiTable
									apiURL="/expense"
									apiData={{ status: "rejected" }}
									columns={columns}
								/>
							</TabPane>
						</Tabs>
					</Row>
				</Col>
				<Col span={4}>
					<Row justify="center">
						<Card
							style={{ margin: "0 0 10px 25px", width: "100%" }}
							bodyStyle={{ display: "flex", justifyContent: "center" }}
							hoverable
							title="Today"
						>
							0 ???
						</Card>
						<Card
							style={{ margin: "0 0 10px 25px", width: "100%" }}
							bodyStyle={{ display: "flex", justifyContent: "center" }}
							hoverable
							title="Month"
						>
							0 ???
						</Card>
						<Card
							style={{ margin: "0 0 10px 25px", width: "100%" }}
							bodyStyle={{ display: "flex", justifyContent: "center" }}
							hoverable
							title="Total"
						>
							0 ???
						</Card>
					</Row>
				</Col>
			</Row>
		</div>
	);
};

export default OverallExpense;
