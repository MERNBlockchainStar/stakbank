import "./App.css";

// ui
import { Layout, Menu, Row, Col } from "antd";

// icons
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

// components
import Header from "./components/Layouts/Header";

const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;

function App() {
  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64 }}
      >
        <Row>
          <Col md={6}>
            Sidebar
          </Col>
          <Col md={18}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 380 }}
            >
              Content
            </div>
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default App;
