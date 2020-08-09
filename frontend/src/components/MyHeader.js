import React from 'react'
import { Component } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, Typography, Space } from 'antd';
import '../components/assets/css/MyHeader.css'
import logo from "../account/assets/logo.png"
import {
  QuestionCircleOutlined, BellOutlined, UserOutlined, SettingOutlined, LogoutOutlined
} from '@ant-design/icons';

import {
  Link
} from "react-router-dom";

import { accountServices } from "@/services"

const { Title } = Typography;
const { Header, Content } = Layout;

const menu = (
  <Menu>
    <Menu.Item key='4' icon={<UserOutlined />}>Account</Menu.Item>
    <Menu.Item key='5' icon={<SettingOutlined />}>Settings</Menu.Item>
    <Menu.Item key='6' style={{ borderTop: '1px  solid #dbdbdb' }} icon={<LogoutOutlined />}>Sign out</Menu.Item>
  </Menu>
)

class MyHeader extends Component {


  constructor(props) {
    super(props);
    this.state = {
      account_data: {}
    }
  }

  componentDidMount() {
    let user = accountServices.userValue;
    if (user) {
      this.setState({ account_data: user.account })
    }
    else {
      console.log("Oh no!");
    }
  }

  render() {
    return (
      <Header className="site-layout-background">
        {/* <div className="logo"> */}
        <Space>
          <Link to="/"><img src={logo} width="48" height="48"></img></Link>
          <Title level={2} style={{ position: 'relative', top: 4 }}>Thăm ngàn Network</Title>
        </Space>
        {/* </div> */}
        <span className="left-menu">
          <Button type="text" style={{ height: 64, fontSize: "20px" }}><QuestionCircleOutlined /></Button>
          <Button type="text" style={{ height: 64, fontSize: "20px" }}><BellOutlined /></Button>
          <Dropdown overlay={menu} placement="bottomCenter" icon={<UserOutlined />}>
            <Button type="text" style={{ height: 64 }}>
              <Avatar size="large" className="avatar-picture" />
              <span className="username">{this.state.account_data.username}</span>
            </Button>
          </Dropdown>
        </span>

      </Header>

    );
  }
}

export { MyHeader };