import { Table } from "antd";
import React from "react";

const dataSource = [
  {
    key: "1",
    date: "20 March, 2024",
    orderId: "EO-TZY345",
    price: "499",
    event: "10 Downing Street",
  },
  {
    key: "1",
    date: "20 March, 2024",
    orderId: "EO-TZY345",
    price: "499",
    event: "10 Downing Street",
  },
  {
    key: "1",
    date: "20 March, 2024",
    orderId: "EO-TZY345",
    price: "499",
    event: "10 Downing Street",
  },
];

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Order ID",
    dataIndex: "orderId",
    key: "orderId",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Event",
    dataIndex: "event",
    key: "event",
  },
];

const page = () => {
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default page;
