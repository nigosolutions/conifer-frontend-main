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
	Input,
	Typography,
	message,
	Popover,
	Tag,
} from "antd";
import {
	CheckOutlined,
	CloseOutlined,
	DeleteOutlined,
	EyeOutlined,
	PlusOutlined,
	LoadingOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import api from "../axios.config";
import ViewExpense from "../Components/ViewExpense";

const Approvals = () => {
	const [dataSource, setDataSource] = useState([]);
	const [expenseLoading, setExpenseLoading] = useState(false);
	const [approveLoading, setApproveLoading] = useState("");
	const [rejectLoading, setRejectLoading] = useState("");
	const [expense, setExpense] = useState([]);
	const [selectedRecord, setRecord] = useState({});
	const [rejectReason, setRejectReason] = useState("");

	useEffect(() => {
		getExpense();
	}, []);
	const approveExpense = (id) => {
		setApproveLoading(id);
		api
			.post("/approveExpense", { id })
			.then((res) => {
				console.log(res);
				message.success("Expense has been Approved!");
				getExpense();
			})
			.finally(() => {
				setApproveLoading("");
			});
	};
	const rejectExpense = (id) => {
		setRejectLoading(id);
		api
			.post("/rejectExpense", { id, reason: rejectReason })
			.then((res) => {
				console.log(res);
				message.error("Expense has been Rejected!");
				getExpense();
			})
			.finally(() => {
				setRejectLoading("");
			});
	};

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
			title: "Total Value (in ???)",
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
			render: (text, record) => (
				<Tag color="orange" key={text}>
					{text.toUpperCase()}
				</Tag>
			),
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: (text, record) => (
				<Space size="middle">
					<Tooltip title="Approve">
						{approveLoading === record.id ? (
							<LoadingOutlined />
						) : (
							<a
								onClick={() => {
									approveExpense(record.id);
								}}
								style={{ color: "green" }}
							>
								<Space>
									<CheckOutlined />
								</Space>
							</a>
						)}
					</Tooltip>
					<Popconfirm
						onConfirm={() => {
							rejectExpense(record.id);
						}}
						onVisibleChange={() => setRejectReason("")}
						title={
							<>
								<h4>Reject Expense</h4>
								<br />
								<label>Reason :</label>
								<Input
									value={rejectReason}
									onChange={(e) => {
										console.log(e);
										setRejectReason(e.target.value);
									}}
								/>
							</>
						}
					>
						<Tooltip title="Reject">
							{rejectLoading === record.id ? (
								<LoadingOutlined />
							) : (
								<a style={{ color: "red" }}>
									<Space>
										<CloseOutlined />
									</Space>
								</a>
							)}
						</Tooltip>
					</Popconfirm>
				</Space>
			),
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
					status: "pending",
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
			<Row>
				<Col span={24}>
					<Divider orientation="left" orientationMargin="0">
						Approvals
					</Divider>

					<Table
						dataSource={expense}
						rowKey="id"
						expandable={{
							expandedRowRender: (record) => <ViewExpense record={record} />,
						}}
						columns={columns}
						loading={expenseLoading}
					/>
				</Col>
			</Row>
		</div>
	);
};
export default Approvals;
