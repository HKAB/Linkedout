import React from 'react'
import { Component } from 'react';
import { Layout } from 'antd';

import './assets/css/profileContent.css';

const { Header, Sider, Content } = Layout;

class ProfileContent extends Component {

  render(){
    return(
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            marginTop: 24,
          }}
        >
          Content
        </Content>
      )
  }
}

export { ProfileContent };