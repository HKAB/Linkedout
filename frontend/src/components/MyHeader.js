import React from 'react'
import { Component } from 'react';
import { Layout, Menu } from 'antd';

import {
  MenuFoldOutlined,
} from '@ant-design/icons';


const { Header, Content } = Layout;

class MyHeader extends Component {

  state = {
    collapsed: false,
  };

	render(){
		return(
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>
			);
	}
}

export { MyHeader };