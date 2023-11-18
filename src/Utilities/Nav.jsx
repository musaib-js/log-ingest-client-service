import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

export default function Nav() {
  const items = [
    { key: "1", label: "Home", link: "/" },
    { key: "2", label: "Ingest", link: "/ingest" },
  ];

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="demo-logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        {items.map((item) => (
          <Menu.Item key={item.key}>
            <Link to={item.link}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Header>
  );
}
