import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ colorBgContainer }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        values
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.user.name);
      localStorage.setItem("role", response.data.user.role);
      setLoading(false);
      form.resetFields();
      if (response.data.user.role === "admin") {
        message.success("Login successful");
        navigate("/");
      } else {
        message.error("You need an admin account to view the logs");
      }
      console.log("Login successful!", response.data);
    } catch (error) {
        setLoading(false);
        message.error("Login failed");
      console.error("Login failed:", error);
    }
  };

  return (
    <div style={{ padding: 24, minHeight: 380, background: colorBgContainer }}>
      <h2>Login</h2>
      <Form form={form} onFinish={handleLogin}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
