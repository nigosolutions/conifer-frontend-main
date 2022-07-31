import React from "react";
import { Modal, Row, Col } from "antd";
import moment from "moment";

const ViewExpense = ({ title, visible, setVisible, data }) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <Modal
      title={title || ""}
      centered
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      width={800}
    >
      <Row>
        {Object.keys(data).map((attr) =>
          attr === "project" || attr === "id" ? null : (
            <Col span={12}>{`${capitalizeFirstLetter(attr)}: ${
              attr === "date"
                ? moment(data[attr]).format("DD-MM-YYYY")
                : data[attr]
            }`}</Col>
          )
        )}
      </Row>
    </Modal>
  );
};

export default ViewExpense;
