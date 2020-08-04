import React from 'react'
import { Component } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown} from 'antd';
import '../components/assets/css/MyHeader.css'
import logo from '../components/assets/images/logo.png'
import {
  QuestionCircleOutlined,BellOutlined,UserOutlined,SettingOutlined, LogoutOutlined
} from '@ant-design/icons';

import { accountServices } from "@/services"

const { Header, Content } = Layout;

const menu = (
    <Menu>
        <Menu.Item key='4' icon={<UserOutlined/>}>Account</Menu.Item>
        <Menu.Item key='5' icon={<SettingOutlined/>}>Settings</Menu.Item>
        <Menu.Item key='6' style={{borderTop:'1px  solid #dbdbdb'}} icon={<LogoutOutlined/>}>Sign out</Menu.Item>
    </Menu>
    )

class MyHeader extends Component {


    constructor(props) {
        super(props);
        this.state = {
            account_data: {}
        }
    }


    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    componentDidMount() {
        let user = accountServices.userValue;
        if (user) {
            this.setState({account_data: user.account})
        }
        else {
          console.log("Oh no!");
        }
      }

	render(){
		return(
    <Header className="site-layout-background">
      <div className="logo" style={{fontWeight:"bold"}}>
          <img src={logo} style={{width:32, height:32, marginRight: 10, marginTop:-15}}></img>
          THĂM NGÀN NETWORK
      </div>
		<span className="left-menu">
		<Button type="text" style={{height: 64}}><QuestionCircleOutlined/></Button>
			<Button type="text" style={{height: 64}}><BellOutlined/></Button>
			<Dropdown overlay={menu} placement="bottomCenter"  icon={<UserOutlined />}>
				<Button type="text" style={{height: 64}}>
					<Avatar className="avatar-picture"/>
                    <span className="username">{this.state.account_data.username}</span>
				</Button>
			</Dropdown>
		</span>
      
    </Header>
    
			);
	}
}

export { MyHeader };