import React from 'react'
import { Component } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown} from 'antd';
import '../components/assets/css/MyHeader.css'
import logo from '../components/assets/images/logo.png'
import {
  MenuFoldOutlined,MenuUnfoldOutlined, QuestionCircleOutlined,BellOutlined,UserOutlined,SettingOutlined, LogoutOutlined
} from '@ant-design/icons';

const { Header, Content } = Layout;

const menu = (
    <Menu>
        <Menu.Item key='4' icon={<UserOutlined/>}>Account</Menu.Item>
        <Menu.Item key='5' icon={<SettingOutlined/>}>Settings</Menu.Item>
        <Menu.Item key='6' icon={<LogoutOutlined/>}>Sign out</Menu.Item>
    </Menu>
    )

class MyHeader extends Component {
  
    state = {
        collapsed: false,
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

	render(){
		return(
    <Header className="site-layout-background">
      <div className="logo" style={{fontWeight:"bold"}}>
          <img src={logo} style={{width:32, height:32, marginRight: 10}}></img>
          SUNSHINE
      </div>
       

      <Button type='primary' onClick={this.toggleCollapsed} style={{marginBottom:16, marginTop: 16, marginLeft:80}}>
        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,{
           className: 'trigger',
           onClick: this.toggle,
        })}
      </Button>
		<span className="left-menu">
		<Button type="text" style={{height: 64}}><QuestionCircleOutlined/></Button>
			<Button type="text" style={{height: 64}}><BellOutlined/></Button>
			<Dropdown overlay={menu} placement="bottomCenter"  icon={<UserOutlined />}>
				<Button type="text" style={{height: 64}}>
					<Avatar className="avatar-picture" src="https://image.flaticon.com/icons/svg/3084/3084416.svg"/>
					<span className="username">Nguyen Phu Truong</span>
				</Button>
			</Dropdown>
		</span>
      
    </Header>
    
			);
	}
}

export { MyHeader };