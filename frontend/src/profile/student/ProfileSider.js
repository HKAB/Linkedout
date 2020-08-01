import React from 'react'
import { Component } from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import {Tabs } from 'antd';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  InfoOutlined,
  EditOutlined,
} from '@ant-design/icons';

import { ProfileContent } from "@/profile/student/ProfileContent";
import {ProfileEdit} from "@/profile/student/ProfileEdit";
import  ProfileChange  from "@/profile/student/ProfileChange";

const { TabPane } = Tabs;
const { Header, Sider, Content } = Layout;

class ProfileSider extends Component {

  state = {
    collapsed: false,
  };

	render(){
		return(
            <Tabs tabPosition="left" style={{marginTop: 24}}>
              <TabPane tab={<><UserOutlined/> Thông tin profile</>} key="1">
                <Layout style={{ padding: '0 24px 24px' }}>
                  <Row align="middle">
                    <Col span={4}></Col>
                    <Col span={16}><ProfileContent/></Col>
                    <Col span={4}></Col>
                  </Row>
                </Layout>
                </TabPane>
              <TabPane tab={<><InfoOutlined /> Thông tin tài khoản</>} key="2">
                <Layout style={{ padding: '0 24px 24px' }}>
                  <Row align="middle">
                    <Col span={4}></Col>
                    <Col span={16}><ProfileEdit/></Col>
                    <Col span={4}></Col>
                  </Row>
                </Layout>
              </TabPane>
              <TabPane tab={<><EditOutlined /> Chỉnh sửa thông tin</>} key="3">
                <Layout style={{ padding: '0 24px 24px' }}>
                  <Row align="middle">
                    <Col span={4}></Col>
                    <Col span={16}><ProfileChange/></Col>
                    <Col span={4}></Col>
                  </Row>
                </Layout>
              </TabPane>
          </Tabs>
			);
	}
}

export { ProfileSider };