import { HomeOutlined, LogoutOutlined, ProfileOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Affix, Avatar, Button, Dropdown, Layout, Menu, Space, Typography } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { accountServices, companyServices, studentServices } from "services";
import logo from "../account/assets/logo.png";
import "./assets/css/MyHeader.css";

const { Title } = Typography;
const { Header, Content } = Layout;
const menu = (
  <Menu>
    <Menu.Item key='1' icon={<UserOutlined />}><Link to={{pathname: '/profile'}}>Account</Link></Menu.Item>
    {/* <Menu.Item key='5' icon={<SettingOutlined />}><Link to={{pathname: '/profile'}}>Settings</Link></Menu.Item> */}
    <Menu.Item key='2' style={{ borderTop: '1px  solid #dbdbdb' }} icon={<LogoutOutlined />} onClick={accountServices.logout}><Link to="/">Sing out</Link> </Menu.Item>
  </Menu>
)

var hasFeed = (<></>)
class MyHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account_data: {},
      avatar: ""
    }
  }

  componentDidMount() {
    let user = accountServices.userValue;
    if (user) {
      this.setState({ account_data: user.account })
      if (user.account.account_type === "student") {
        studentServices.getStudent(user.account.id);
        const subscription = studentServices.studentObject.subscribe((student) => {
          if (student) {
            this.setState({ avatar: "http://127.0.0.1:8000" + student.basic_data.profile_picture });
          }
        });
        console.log(user);
        console.log('Student');
        hasFeed = <Button title="Feed" type="text" style={{ height: 64, fontSize: "20px" }}><Link to='/feed'><ProfileOutlined /></Link></Button>
      }
      else {
        console.log(user);
        console.log('Company');
        companyServices.getCompany(user.account.id);
        const subscription = companyServices.companyObject.subscribe((company) => {
          if (company) {
            this.setState({ avatar: "http://127.0.0.1:8000" + company.basic_data.profile_picture });
          }
        });
        hasFeed = <></>
      }

    }
    else {
      console.log("Oh no!");
    }
  }

  render() {
    return (
      <Affix offsetTop={0}>
        <Header className="my-custom-header" style={{ backgroundColor: "#ffffff" }}>
          {/* <div className="logo"> */}
          <Space>
            <Link to="/"><img src={logo} width="48" height="48"></img></Link>
            <Title level={2} style={{ position: 'relative', top: 4 }}>Thăm ngàn Network</Title>
          </Space>
          {/* </div> */}
          <span className="left-menu">
            <Button title="Home" type="text" style={{ height: 64, fontSize: "20px" }}><Link to='/'><HomeOutlined /></Link></Button>
            {hasFeed}
            <Button title="Profile" type="text" style={{ height: 64, fontSize: "20px" }}><Link to={{pathname: '/profile', defaultTab: "Content"}}><UserOutlined /></Link></Button>
            <Dropdown overlay={menu} placement="bottomCenter" icon={<UserOutlined />}>
              <Button type="text" style={{ height: 64 }}>
                {/* <Avatar size="large" className="avatar-picture" />
                <span className="username">{this.state.account_data.username}</span> */}
                <Avatar size="large" className="avatar-picture" className="username" src={this.state.avatar} alt=""></Avatar>
              </Button>
            </Dropdown>
          </span>
        </Header>
      </Affix>
    );
  }
}

export { MyHeader };
