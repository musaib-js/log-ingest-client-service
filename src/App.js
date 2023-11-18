import React from 'react';
import { Breadcrumb, Layout, theme } from 'antd';
import Nav from './Utilities/Nav';
import Home from './Components/Home';
import Ingest from './Components/Ingest';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const { Content, Footer } = Layout;

function App() {
  const colorBgContainer = theme.useToken().token.colorBgContainer;

  return (
    <Router>
      <Layout>
        <Nav />
        <Content className="site-layout" style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Logs</Breadcrumb.Item>
          </Breadcrumb>
          <Routes>
            <Route exact path="/" element={<Home colorBgContainer={colorBgContainer} />} />
            <Route exact path="ingest" element={<Ingest colorBgContainer={colorBgContainer} />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Log Management Dashboard ©2023</Footer>
      </Layout>
    </Router>
  );
}

export default App;
