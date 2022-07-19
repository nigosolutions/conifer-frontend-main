import { Button, Card, Divider, List, Select } from "antd";
import { useState } from "react";
const { Option } = Select;
const onChange = (value) => {
  console.log(`selected ${value}`);
};

const onSearch = (value) => {
  console.log("search:", value);
};
const data = [
  {
    title: "Total Accounts",
    content: (
      <>
        Summary of total accounts.
        <br />
        <br />
        <Button type="primary">Download</Button>
      </>
    ),
  },
  {
    title: "Project Accounts",
    content: (
      <>
        Summary of accounts for selected project.
        <br />
        <br />
        <Button type="primary">Download</Button>
      </>
    ),
  },
  {
    title: "User Expenses",
    content: (
      <>
        Total expenses made by the selected user.
        <br />
        <br />
        <Button type="primary">Download</Button>
      </>
    ),
  },
];

function Reports(props) {
  return (
    <div>
      <Divider orientation="left" orientationMargin="0">
        Reports
      </Divider>
      <List
        grid={{
          gutter: 16,
          column: 4,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.title}>{item.content}</Card>
          </List.Item>
        )}
      />
    </div>
  );
}

export default Reports;
