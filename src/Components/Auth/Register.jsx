import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Select, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const Register = ({ colorBgContainer }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  let navigate = useNavigate();

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/register`,
        values
      );
      setLoading(false);
      message.success("Registration successful");
      form.resetFields();
      navigate("/login");
      console.log("Registration successful! Please login now", response.data);
    } catch (error) {
        setLoading(false);
      message.error("Registration failed");
      console.error("Registration failed:", error);
    }
  };

  return (
    <div style={{ padding: 24, minHeight: 380, background: colorBgContainer }}>
      <h2>Register</h2>
      <Form form={form} onFinish={handleRegister}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
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
        <Form.Item
          name="role"
          rules={[{ required: true, message: "Please select a role!" }]}
        >
          <Select placeholder="Select Role">
            <Option value="user">User</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Register
          </Button>
        </Form.Item>
      </Form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
