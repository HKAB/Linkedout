import { accountServices } from "@/services";
import { BellOutlined, LogoutOutlined, QuestionCircleOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Affix, Avatar, Button, Dropdown, Layout, Menu, Space, Typography } from 'antd';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import logo from "../account/assets/logo.png";
import '../components/assets/css/MyHeader.css';


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
      <Affix offsetTop={0}>
        <Header className="site-layout-background">
          {/* <div className="logo"> */}
          <Space>
            <Link to="/feed"><img src={logo} width="48" height="48"></img></Link>
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
      </Affix>
    );
  }
}

export { MyHeader };
