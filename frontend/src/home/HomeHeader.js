import { LogoutOutlined, UserOutlined , SendOutlined, CheckOutlined} from '@ant-design/icons';
import { Avatar, Button, Dropdown, Layout, List, Tag, Menu, Space, Spin, Typography , Modal, Carousel, Badge, Tooltip} from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { accountServices, companyServices, studentServices } from "services";
import { Config } from '../config/consts';
import logo from "./assets/images/logo.svg";
import Meta from 'antd/lib/card/Meta';

import bao from "./assets/images/contributor/B.jpg";
import diu from "./assets/images/contributor/D.jpg";
import xtruong from "./assets/images/contributor/XT.jpg";
import ptruong from "./assets/images/contributor/PT.jpg";
import ductung from "./assets/images/contributor/DT.jpg";
import haitung from "./assets/images/contributor/HT.jpg";

import django_logo from "./assets/images/framework/django.png";
import react_logo from "./assets/images/framework/react.png";


const { Title } = Typography;
const { Header} = Layout;

const menu = (
  <Menu>
    <Menu.Item key='1'><Link to={{ pathname: '/profile' }}><UserOutlined /> Account</Link></Menu.Item>
    {/* <Menu.Item key='5' icon={<SettingOutlined />}><Link to={{pathname: '/profile'}}>Settings</Link></Menu.Item> */}
    <Menu.Item key='2' style={{ borderTop: '1px  solid #dbdbdb' }} onClick={accountServices.logout}><Link to="/"><LogoutOutlined /> Sign out</Link> </Menu.Item>
  </Menu>
)

const about_us = [
  {
    name: "Dịu",
    role: "frontend",
    avatar: diu,
    tooltip_text: 'this dude kêu "học nhiều làm gì" trong khi sắp deadline'
  },
  {
    name: "P.Trường",
    role: "frontend",
    avatar: ptruong,
    tooltip_text: "this dude do some design shit"
  },
  {
    name: "X.Trường",
    role: "frontend",
    avatar: xtruong,
    tooltip_text: "this dude tự nhận thần CSS, javascript, react, django"
  },
  {
    name: "Bảo",
    role: "backend",
    avatar: bao,
    tooltip_text: "this dude do some backend work, không biết ทำงาน(aka thăm ngàn) là gì"
  },
  {
    name: "Đ.Tùng",
    role: "backend",
    avatar: ductung,
    tooltip_text: "this dude để frontend làm phần testing, design shit logo"
  },
  {
    name: "H.Tùng",
    role: "backend",
    avatar: haitung,
    tooltip_text: "this dude do some backend work, docker grafana prome@#$@"
  }

]

function HomeHeader() {
  const user = accountServices.userValue;
  var isLogin = (<Spin></Spin>);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [showWhyUs, setshowWhyUs] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false); 
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
 const  handleOkWhyUs=()=>{
    setshowWhyUs(false);
  }
const onShowWhyUs = ()=>{
  setshowWhyUs(true);
}
const  handleOkAboutUs=()=>{
  setShowAboutUs(false);
}
const onShowAboutUs = ()=>{
  setShowAboutUs(true);
}
const  handleOkFeatures=()=>{
  setShowFeatures(false);
}
const onShowFeatures = ()=>{
setShowFeatures(true);
}
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
          <Link to="/"><img src={logo} width="144px" height="64px" style={{position:'absolute',top:10}}></img></Link>
          {/* <Title level={2} style={{ position: 'relative', top: 16 }}>LinkedOut</Title> */}
        </Space>
        <span style={{ float: "right" }}>
          {isLogin}
        </span>
        <Menu.Item style={{ float: "right", fontFamily: "sans-serif", fontSize: 16 }} onClick = {onShowAboutUs}>About us</Menu.Item>
        <Menu.Item style={{ float: "right", fontFamily: "sans-serif", fontSize: 16 }} onClick={onShowFeatures}>Features</Menu.Item>
        <Menu.Item style={{ float: "right", fontFamily: "sans-serif", fontSize: 16 }} onClick={onShowWhyUs}>Why us?</Menu.Item>
      </Menu>
      <Modal 
      closable={false}
       title={<Title level={4} style={{textAlign:'center'}}>Why Us</Title>}
       visible={showWhyUs}
       onCancel={handleOkWhyUs}
       footer={null}
       style={{fontFamily: "sans-serif"}}
      >
        <div style={{fontSize:20, marginRight: 24}}>
          <div><CheckOutlined style={{color:'red'}}/> We Listen.</div>
        <div><CheckOutlined style={{color:'red'}}/> We Understand.</div>
        <div><CheckOutlined style={{color:'red'}}/> We Analyze.</div>
        <div><CheckOutlined style={{color:'red'}}/> We Excute.</div>
        <div><CheckOutlined style={{color:'red'}}/> We Take Feedbacks.</div>
        </div>
        
      </Modal>
      <Modal
      closable={false}
       title={<Title level={4} style={{textAlign:'center'}}>Features</Title>}
       visible={showFeatures}
       onCancel={handleOkFeatures}
       footer={null}
       style={{fontFamily: "sans-serif"}}
      >
         <div style={{fontSize:20, marginRight: 24}}>
          <div><SendOutlined style={{color:'blue'}}/> The development of Information Technology has made education system simpler, easier, and widespread. Now, people of remote areas can also use technology for their children’s education and also avail the benefits of adult education</div>
        <div><SendOutlined style={{color:'blue'}}/> Diffusion of e-governance on a large scale.</div>
        <div><SendOutlined style={{color:'blue'}}/> Diffusion of e-governance on a large scale.</div>
        <div><SendOutlined style={{color:'blue'}}/> Participation of public in governance and policy making.</div>
        
        </div>
      </Modal>
      <Modal 
      closable={false}
      style={{minWidth: "600px"}}
      visible={showAboutUs}
      onCancel={handleOkAboutUs}
      footer={null}>
        <Title level={4}>Contributor ({about_us.length})</Title>
          <List 
          grid={{column: 3}}
          dataSource={about_us}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
              avatar={<Tooltip title={item.tooltip_text}><Avatar size={64} src={item.avatar}></Avatar></Tooltip>}
              title={<Title level={4}>{item.name}</Title>}
              description={<Tag color={item.role=="frontend"?"#f50":"#108ee9"}>{item.role}</Tag>}
              >

              </List.Item.Meta>
            </List.Item>
          )}>
          </List>

          <Title level={4}>We use</Title>
          <Space>
            <Tooltip title=""><Avatar size={64} src={django_logo}></Avatar></Tooltip>
            <Tooltip title="pretty good"><Avatar size={64} src={react_logo}></Avatar></Tooltip>
            </Space>
      </Modal>
    </Header>

  );
}

export { HomeHeader };

