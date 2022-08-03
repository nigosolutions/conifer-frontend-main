import { Button, message, Table } from "antd";
import React, { useEffect, useState } from "react";
import api from "../axios.config";

const ApiTable = ({ columns, apiURL, apiData, onValuesChange, ...rest }) => {
	const [data, setData] = useState();
	const [loading, setLoading] = useState(false);
	const [pagination, setPagination] = useState([]);
	const [page, setPage] = useState(0);
	const [prev, setPrev] = useState(false);
	const [next, setNext] = useState(false);

	const fetchData = (currPage = page) => {
		setLoading(true);
		api
			.get(apiURL, {
				params: {
					...(apiData ? apiData : {}),
					LastEvaluatedKey: currPage < 0 ? 0 : pagination[currPage],
				},
			})
			.then((res) => {
				setData(res.data.message.Items);
				if (res.data.message.LastEvaluatedKey) {
					pagination.push(res.data.message.LastEvaluatedKey);
					setNext(true);
				} else {
					setNext(false);
				}
			})
			.catch((err) => message.error("Error fetching data from database"))
			.finally(() => {
				setLoading(false);
			});
	};

	const onNext = () => {
		fetchData(page);
		setPage((curr) => curr + 1);
	};

	const onPrev = () => {
		pagination.pop();
		fetchData(page - 1);
		setPage((curr) => curr - 1);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleTableChange = (newPagination, filters, sorter) => {
		fetchData({
			sortField: sorter.field,
			sortOrder: sorter.order,
			pagination: newPagination,
			...filters,
		});
	};

	return (
		<>
			<Table
				columns={columns}
				dataSource={data}
				pagination={false}
				loading={loading}
				onChange={handleTableChange}
				{...rest}
			/>
			<Button disabled={page < 0} onClick={onPrev}>
				Prev
			</Button>
			<Button disabled={!next} onClick={onNext}>
				Next
			</Button>
		</>
	);
};

export default ApiTable;
