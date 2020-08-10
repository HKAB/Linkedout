import { Button, Layout, Menu, Space, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from "./assets/images/logo.svg";

const { SubMenu } = Menu;
const { Title } = Typography;
const { Header, Content } = Layout;

function HomeHeader() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }
    , [])

  if (!loading) {
    return (<Spin></Spin>)
  }
  return (
    <Header style={{ backgroundColor: "white" }}>
      <Menu mode="horizontal" style={{ borderBottom: "0px" }}>
        <Space>
          <Link to="/"><img src={logo} width="48" height="48"></img></Link>
          <Title level={2} style={{ position: 'relative', top: 4 }}>KIETNGAN</Title>
        </Space>

        <Button style={{ height: "100%", float: "right", marginTop: 16, fontFamily: "sans-serif", fontSize: 16 }} type="primary" onClick={() => history.push("/login")}>Sign up</Button>
        <Button style={{ float: "right", marginTop: 16, fontFamily: "sans-serif", fontSize: 16 }} type="text" onClick={() => history.push("/login")}>Sign in</Button>


        <Menu.Item style={{ float: "right", fontFamily: "sans-serif", fontSize: 16 }}>About us</Menu.Item>
        <Menu.Item style={{ float: "right", fontFamily: "sans-serif", fontSize: 16 }}>Features</Menu.Item>
        <Menu.Item style={{ float: "right", fontFamily: "sans-serif", fontSize: 16 }}>Why us?</Menu.Item>
      </Menu>
    </Header>

  );
}

export { HomeHeader };
