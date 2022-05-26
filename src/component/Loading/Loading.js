import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = (
  <LoadingOutlined style={{ fontSize: 60, color: "#069A8E" }} spin />
);

export default function Loading() {
  return <Spin indicator={antIcon} />;
}
