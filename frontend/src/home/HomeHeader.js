import { LogoutOutlined, UserOutlined , SendOutlined, CheckOutlined} from '@ant-design/icons';
import { Avatar, Button, Dropdown, Layout, Menu, Space, Spin, Typography , Modal} from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { accountServices, companyServices, studentServices } from "services";
import { Config } from '../config/consts';
import logo from "./assets/images/logo.svg";
import { List } from 'antd/lib/form/Form';


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
          <Link to="/"><img src={logo} width="48" height="48"></img></Link>
          <Title level={2} style={{ position: 'relative', top: 16 }}>Thăm ngàn Network</Title>
        </Space>
        <span style={{ float: "right" }}>
          {isLogin}
        </span>
        <Menu.Item style={{ float: "right", fontFamily: "sans-serif", fontSize: 16 }} onClick = {onShowAboutUs}>About us</Menu.Item>
        <Menu.Item style={{ float: "right", fontFamily: "sans-serif", fontSize: 16 }} onClick={onShowFeatures}>Features</Menu.Item>
        <Menu.Item style={{ float: "right", fontFamily: "sans-serif", fontSize: 16 }} onClick={onShowWhyUs}>Why us?</Menu.Item>
      </Menu>
      <Modal 
       title={<Title level={4} style={{textAlign:'center'}}>Why Us</Title>}
       visible={showWhyUs}
       onOk={handleOkWhyUs}
       onCancel={handleOkWhyUs}
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
       title={<Title level={4} style={{textAlign:'center'}}>Features</Title>}
       visible={showFeatures}
       onOk={handleOkFeatures}
       onCancel={handleOkFeatures}
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
       title={<Title level={4} style={{textAlign:'center'}}>About us</Title>}
       visible={showAboutUs}
       onOk={handleOkAboutUs}
       onCancel={handleOkAboutUs}
      >
        <div style={{display:'grid', fontSize:20, marginRight: 24, marginBottom:20 }}>
        <a style={{marginBottom: 20}}href="https://www.facebook.com/hkabpietaker"><Avatar src={'https://scontent.fhan8-1.fna.fbcdn.net/v/t1.0-9/95137030_2684415785121490_8173338840350588928_n.jpg?_nc_cat=105&_nc_sid=09cbfe&_nc_ohc=Qxf4KHXtmTsAX9RliUE&_nc_ht=scontent.fhan8-1.fna&oh=3a0ee033bd540c4011133df48b913dcf&oe=5F5D9420'}></Avatar> Nguyễn Phú Trường </a>
        
        <a style={{marginBottom: 20}} href="https://www.facebook.com/hoamayman.2910"><Avatar src={'https://scontent.fhan8-1.fna.fbcdn.net/v/t1.0-9/116907537_297717714776838_7062892457081446245_n.jpg?_nc_cat=100&_nc_sid=09cbfe&_nc_ohc=vtGHdPpckGYAX-0Y_O-&_nc_ht=scontent.fhan8-1.fna&oh=aa5e31657dd68f116764d10336e2615e&oe=5F5CDAD1'}></Avatar> Vũ Thị Dịu</a>
        <a style={{marginBottom: 20}} href="https://www.facebook.com/tacbliw"><Avatar src={'https://scontent.fhan8-1.fna.fbcdn.net/v/t1.0-9/36522088_1300746486728496_8306472149237891072_o.jpg?_nc_cat=107&_nc_sid=09cbfe&_nc_ohc=NrZ2ZWbmpiAAX_YSDzY&_nc_ht=scontent.fhan8-1.fna&oh=c4268cde357cae19ec99832628358adb&oe=5F5CDB7A'}></Avatar> Lê Trần Hải Tùng</a>
        <a style={{marginBottom: 20}} href="https://www.facebook.com/ultoxtung"><Avatar src={'https://scontent.fhan8-1.fna.fbcdn.net/v/t1.0-9/91080452_2805352593025333_8705038156459671552_o.jpg?_nc_cat=100&_nc_sid=09cbfe&_nc_ohc=STU7GCPGW0gAX-Qi3G8&_nc_ht=scontent.fhan8-1.fna&oh=2cbb5ca4dee18c10fe9ab3651a9c3afd&oe=5F5DB4B4'}></Avatar> Lê Đức Tùng</a>
        <a style={{marginBottom: 20}} href="https://www.facebook.com/truong.nguyenxuan.58323431"><Avatar src={'https://1.bp.blogspot.com/-A7UYXuVWb_Q/XncdHaYbcOI/AAAAAAAAZhM/hYOevjRkrJEZhcXPnfP42nL3ZMu4PvIhgCLcBGAsYHQ/s1600/Trend-Avatar-Facebook%2B%25281%2529.jpg'}></Avatar> Nguyễn Xuân Trường</a>
        <a style={{marginBottom: 20}} href="https://www.facebook.com/ThanhBao117"> <Avatar src={'https://dohoafx.com/wp-content/uploads/2014/07/geometric.jpg'}></Avatar>Nguyễn Thị Thanh Bảo</a>
        
      </div>
      </Modal>
    </Header>

  );
}

export { HomeHeader };

