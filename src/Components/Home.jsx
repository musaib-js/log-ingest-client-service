import React, { useEffect, useState } from "react";
import { Input, Button, Table, Row, Col, Select, DatePicker, message, Pagination } from "antd";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const { Option } = Select;

export default function Home({ colorBgContainer }) {
  let navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({
    level: "",
    message: "",
    resourceId: "",
    timestamp: "",
    traceId: "",
    spanId: "",
    commit: "",
    "metadata.parentResourceId": "",
    startDate: "",
    endDate: "",
  });
  const [filterType, setFilterType] = useState("");
  const [pagination, setPagination] = useState({
    pageSize: 50,
    currentPage: 1,
    totalLogs: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      message.error("Please login to view the logs");
      navigate('/login');
    }
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-logs`, {
        params: {
          ...filters,
          page: pagination.currentPage,
          pageSize: pagination.pageSize,
        },
      });
      const { logs: data, totalLogs } = response.data;
      setLogs(data);
      setPagination({ ...pagination, totalLogs });
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [filters, pagination.currentPage]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleStartDateChange = (date, dateString) => {
    setFilters({ ...filters, startDate: dateString });
  };

  const handleEndDateChange = (date, dateString) => {
    setFilters({ ...filters, endDate: dateString });
  };

  const applyFilters = () => {
    setPagination({ ...pagination, currentPage: 1 });
  };

  const handlePaginationChange = (page) => {
    setPagination({ ...pagination, currentPage: page });
  };

  const filterOptions = [
    "level",
    "message",
    "resourceId",
    "timestamp",
    "traceId",
    "spanId",
    "commit",
    "metadata.parentResourceId",
    "dateRange",
    "startDate",
    "endDate",
  ];

  const columns = [
    { title: "Level", dataIndex: "level", key: "level" },
    { title: "Message", dataIndex: "message", key: "message" },
    { title: "Resource ID", dataIndex: "resourceId", key: "resourceId" },
    { title: "Timestamp", dataIndex: "timestamp", key: "timestamp" },
    { title: "Trace ID", dataIndex: "traceId", key: "traceId" },
    { title: "Span ID", dataIndex: "spanId", key: "spanId" },
    { title: "Commit", dataIndex: "commit", key: "commit" },
    {
      title: "Parent Resource ID",
      dataIndex: "metadata",
      key: "metadata",
      render: (metadata) => (metadata ? metadata.parentResourceId : ""),
    },
  ];

  return (
    <div style={{ padding: 24, minHeight: 380, background: colorBgContainer }}>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={12} lg={8}>
          <Select
            placeholder="Select Filter"
            onChange={(value) => setFilterType(value)}
            style={{ width: "100%" }}
            value={filterType || "Select a filter to apply"}
          >
            {filterOptions.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          {filterType === "dateRange" ? (
            <>
              <DatePicker
                style={{ width: "100%", margin: "1px" }}
                onChange={handleStartDateChange}
                placeholder="Select Start Date"
              />
              <DatePicker
                style={{ width: "100%", margin: "1px" }}
                onChange={handleEndDateChange}
                placeholder="Select End Date"
              />
            </>
          ) : filterType ? (
            <Input
              name={filterType}
              placeholder={`Enter ${filterType}`}
              value={filters[filterType]}
              onChange={handleFilterChange}
            />
          ) : null}
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Button type="primary" onClick={applyFilters}>
            Apply Filters
          </Button>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: "20px" }}>
        <Col xs={24} sm={20} md={18} lg={16}>
          <Table columns={columns} dataSource={logs} scroll={{ x: "100%" }} pagination={false} />
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: "20px" }}>
        <Pagination
          current={pagination.currentPage}
          pageSize={pagination.pageSize}
          total={pagination.totalLogs}
          onChange={handlePaginationChange}
        />
      </Row>
    </div>
  );
}