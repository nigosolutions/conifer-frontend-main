import { useState } from "react";
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
import TextArea from "antd/lib/input/TextArea";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";

const AddExpense = () => {
	const [selectMaterial, setMaterial] = useState(null);
	const [selectType, setType] = useState(null);
	const [pvisible, setPVisible] = useState(false);
	const [projectSelected, setProjectSelected] = useState(null);
	const [selectCategory, setCategory] = useState(null);
	const [addProjectExpense, setAddPE] = useState(false);
	const [projectExpenses, setPE] = useState([
		{ type: "Material", amount: "20000" },
	]);
	const [mainform] = Form.useForm();
	const [projectform] = Form.useForm();

	const projectColumns = [
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

	const ProjectForm = () => (
		<Form
			form={projectform}
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
	);

	const MainForm = () => (
		<Form
			form={mainform}
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

				if (changedValues.project) {
					setProjectSelected(changedValues.project);
				}
			}}
		>
			<Row gutter={10}>
				<Col span={4}>
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
						<DatePicker defaultValue={moment()} style={{ width: "100%" }} />
					</Form.Item>
				</Col>
				<Col span={20}>
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
				</Col>
			</Row>
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
						<Select>
							<Select.Option value="project1">Project 1</Select.Option>
						</Select>
					</Form.Item>
					{/* <AddProjectExpensForm
						visible={pvisible}
						onCreate={onCreate}
						onCancel={() => {
							setPVisible(false);
						}}
					/> */}
					{projectSelected && (
						<>
							<span style={{ fontStyle: "italic", color: "gray" }}>
								&nbsp; Expenses of {projectSelected}
							</span>
							<Table
								columns={projectColumns}
								dataSource={projectExpenses}
								pagination={false}
							/>
							<br />
							{addProjectExpense ? (
								<ProjectForm />
							) : (
								<Button
									type="dashed"
									block
									onClick={() => {
										setAddPE(true);
									}}
									icon={<PlusOutlined />}
									style={{ marginBottom: 10 }}
								>
									Add Expense
								</Button>
							)}
						</>
					)}
				</>
			) : null}
		</Form>
	);

	return (
		<div>
			<Divider orientation="left" orientationMargin="0">
				Add a new Expense
			</Divider>
			<Row>
				<Col span={24}>
					<MainForm />
				</Col>
				{/* <Col span={24}>
					<ProjectForm />
				</Col> */}
			</Row>
		</div>
	);
};

export default AddExpense;
