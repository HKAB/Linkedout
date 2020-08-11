import { Button, Layout, Menu, Space, Spin, Typography, Avatar } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from "./assets/images/logo.svg";
import { accountServices, companyServices, studentServices } from "@/services";

const { SubMenu } = Menu;
const { Title } = Typography;
const { Header, Content } = Layout;

function HomeHeader() {
  const user = accountServices.userValue;
  var isLogin = (<Spin></Spin>);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar]=useState("");
  useEffect(() => {
    setLoading(true);
    if (user) {
      if(user.account.account_type=="student")
      {
       studentServices.getStudent(user.account.id);
       const subscription = studentServices.studentObject.subscribe((student) => {
         if (student) {
           setAvatar("http://127.0.0.1:8000" + student.basic_data.profile_picture);
         }
       });
      }
      else{
       companyServices.getCompany(user.account.id);
       const subscription = companyServices.companyObject.subscribe((company) => {
         if (company) {
            setAvatar("http://127.0.0.1:8000" + company.basic_data.profile_picture);
         }
       });
      }
    }
  }, [])
  if (!loading) {
    return (<Spin></Spin>)
  }
  if(user)
  {
    isLogin=<Link to="/profile"><Avatar style={{ float: "right", marginTop: 16}} size="large" className="avatar-picture" src={avatar} alt=""></Avatar></Link>
  }else
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
        {isLogin}
        <Menu.Item style={{ float: "right", fontFamily: "sans-serif", fontSize: 16 }}>About us</Menu.Item>
        <Menu.Item style={{ float: "right", fontFamily: "sans-serif", fontSize: 16 }}>Features</Menu.Item>
        <Menu.Item style={{ float: "right", fontFamily: "sans-serif", fontSize: 16 }}>Why us?</Menu.Item>
      </Menu>
    </Header>

  );
}

export { HomeHeader };
