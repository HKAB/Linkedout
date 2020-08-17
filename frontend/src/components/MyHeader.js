import { FileSearchOutlined, HomeOutlined, LogoutOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';
import { Affix, Avatar, Button, Dropdown, Layout, Menu, Space, Typography } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { accountServices, companyServices, studentServices } from "services";
import { Config } from '../config/consts';
import logo from '../home/assets/images/logo.svg';
import "./assets/css/MyHeader.css";

const { Title } = Typography;
const { Header, Content } = Layout;
const menu = (
  <Menu>
    <Menu.Item key='1'><Link to={{ pathname: '/profile' }}><UserOutlined /> Account</Link></Menu.Item>
    {/* <Menu.Item key='5' icon={<SettingOutlined />}><Link to={{pathname: '/profile'}}>Settings</Link></Menu.Item> */}
    <Menu.Item key='2' style={{ borderTop: '1px  solid #dbdbdb' }} onClick={accountServices.logout}><Link to="/"><LogoutOutlined /> Sign out</Link> </Menu.Item>
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
      if (user.account.account_type == "student") {
        studentServices.getStudent(user.account.id);
        const subscription = studentServices.studentObject.subscribe((student) => {
          if (student) {
            this.setState({ avatar: Config.backendUrl + student.basic_data.profile_picture });
          }
        });
        hasFeed = <Button title="Feed" type="text" style={{ height: 64, fontSize: "20px" }}><Link to='/feed'><ProfileOutlined /></Link></Button>
      }
      else {
        companyServices.getCompany(user.account.id);
        const subscription = companyServices.companyObject.subscribe((company) => {
          if (company) {
            this.setState({ avatar: Config.backendUrl + company.basic_data.profile_picture });
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
            <Link to="/"><img src={logo} width="144" height="48" style={{ position: 'absolute', top: 8 }}></img></Link>
            {/* <Title level={2} style={{ position: 'relative', top: 4 }}>LinkedOut</Title> */}
          </Space>
          {/* <Space>
           
            <Search
            placeholder="Search St"
            onSearch={value => console.log(value)}
            style={{ width: 300, marginTop: 15, marginLeft: 30 }}
            />
          </Space> */}
          {/* </div> */}
          <span className="left-menu">
            <Button title="Search" type="text" style={{ height: 64, fontSize: "20px" }}><Link to='/search'><FileSearchOutlined /></Link></Button>
            <Button title="Home" type="text" style={{ height: 64, fontSize: "20px" }}><Link to='/'><HomeOutlined /></Link></Button>
            {hasFeed}
            <Button title="Profile" type="text" style={{ height: 64, fontSize: "20px" }}><Link to={{ pathname: '/profile', defaultTab: "Content" }}><UserOutlined /></Link></Button>
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

