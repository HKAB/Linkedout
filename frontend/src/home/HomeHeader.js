import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Layout, Menu, Space, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { accountServices, companyServices, studentServices } from "services";
import { Config } from '../config/consts';
import logo from "./assets/images/logo.svg";


const { Title } = Typography;
const { Header} = Layout;

const menu = (
  <Menu>
    <Menu.Item key='1' icon={<UserOutlined />}><Link to={{ pathname: '/profile' }}>Account</Link></Menu.Item>
    {/* <Menu.Item key='5' icon={<SettingOutlined />}><Link to={{pathname: '/profile'}}>Settings</Link></Menu.Item> */}
    <Menu.Item key='2' style={{ borderTop: '1px  solid #dbdbdb' }} icon={<LogoutOutlined />} onClick={accountServices.logout}><Link to="/">Sign out</Link> </Menu.Item>
  </Menu>
)

function HomeHeader() {
  const user = accountServices.userValue;
  var isLogin = (<Spin></Spin>);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    setLoading(true);
    if (user) {
      if (user.account.account_type == "student") {
        studentServices.getStudent(user.account.id);
        const subscription = studentServices.studentObject.subscribe((student) => {
          if (student) {
            setAvatar(Config.backendUrl + student.basic_data.profile_picture);
          }
        });
      }
      else {
        companyServices.getCompany(user.account.id);
        const subscription = companyServices.companyObject.subscribe((company) => {
          if (company) {
            setAvatar(Config.backendUrl + company.basic_data.profile_picture);
          }
        });
      }
    }
  }, [])
  if (!loading) {
    return (<Spin></Spin>)
  }
  if (user) {
    isLogin = (
      <Dropdown overlay={menu} placement="bottomCenter" icon={<UserOutlined />}>
        <Button type="text" style={{ height: 64 }}>
          {/* <Avatar size="large" className="avatar-picture" />
        <span className="username">{this.state.account_data.username}</span> */}
          <Avatar style={{ float: "right" }} size="large" className="avatar-picture" src={avatar} alt=""></Avatar>
        </Button>
      </Dropdown>
    )
  } else
    isLogin = <>
      <Button style={{ height: "100%", float: "right", marginTop: 16, fontFamily: "sans-serif", fontSize: 16 }} type="primary" onClick={() => history.push("/login")}>Sign up</Button>
      <Button style={{ float: "right", marginTop: 16, fontFamily: "sans-serif", fontSize: 16 }} type="text" onClick={() => history.push("/login")}>Sign in</Button>
    </>

  return (

    <Header style={{ backgroundColor: "white" }}>
      <Menu mode="horizontal" style={{ borderBottom: "0px" }}>
        <Space>
          <Link to="/"><img src={logo} width="48" height="48"></img></Link>
          <Title level={2} style={{ position: 'relative', top: 4 }}>KIETNGAN</Title>
        </Space>
        <span style={{ float: "right" }}>
          {isLogin}
        </span>
        <Menu.Item style={{ float: "right", fontFamily: "sans-serif", fontSize: 16 }}>About us</Menu.Item>
        <Menu.Item style={{ float: "right", fontFamily: "sans-serif", fontSize: 16 }}>Features</Menu.Item>
        <Menu.Item style={{ float: "right", fontFamily: "sans-serif", fontSize: 16 }}>Why us?</Menu.Item>
      </Menu>
    </Header>

  );
}

export { HomeHeader };

