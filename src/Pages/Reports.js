import { Button, Card, Divider, List, Modal, Select } from "antd";
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
    content: <>Summary of total accounts.</>,
  },
  {
    title: "Project Accounts",
    content: <>Summary of accounts for selected project.</>,
  },
  {
    title: "User Expenses",
    content: <>Total expenses made by the selected user.</>,
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
            <Card title={item.title}>
              {item.content} <br />
              <br />
              <Button type="primary">Download</Button>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}

export default Reports;
