import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Row, Col, DatePicker, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Ingest({colorBgContainer}) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        message.error("Please login to ingest the logs");
      navigate('/login');
    }
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
        const formattedData = {
            level: values.level,
            message: values.message,
            resourceId: values.resourceId,
            timestamp: values.timestamp.toISOString(),
            traceId: values.traceId,
            spanId: values.spanId,
            commit: values.commit,
            metadata: {
              parentResourceId: values['metadata.parentResourceId'],
            },
          };
      await axios.post(`${process.env.REACT_APP_API_URL}/insert-logs`, formattedData);
      message.success('Log inserted successfully');
      form.resetFields();
    } catch (error) {
      console.error('Error inserting logs:', error);
      message.error('Failed to insert log');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24, minHeight: 480, background: colorBgContainer }}>
      <h1>Log Insertion Page</h1>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <Form.Item
              label="Level"
              name="level"
              rules={[{ required: true, message: 'Please enter the log level' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Form.Item
              label="Message"
              name="message"
              rules={[{ required: true, message: 'Please enter the log message' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Form.Item
              label="Resource ID"
              name="resourceId"
              rules={[{ required: true, message: 'Please enter the resource ID' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Form.Item
              label="Timestamp"
              name="timestamp"
              rules={[{ required: true, message: 'Please select the timestamp' }]}
            >
              <DatePicker showTime />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Form.Item label="Trace ID" name="traceId" rules={[{ required: true, message: 'Please enter the trace ID' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Form.Item label="Span ID" name="spanId" rules={[{ required: true, message: 'Please enter the span ID' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Form.Item label="Commit" name="commit" rules={[{ required: true, message: 'Please enter the commit' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Form.Item label="Parent Resource ID" name="metadata.parentResourceId" rules={[{ required: true, message: 'Please select the parent resource ID' }]}>
              <Input />
            </Form.Item>
          </Col>
          {/* Add other fields for log attributes */}
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Insert Log
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
