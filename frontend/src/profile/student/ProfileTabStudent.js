import { EditOutlined, InfoOutlined, UserOutlined, FileTextOutlined } from "@ant-design/icons";
import { Button, Col, Layout, Row, Space, Tabs, Tooltip } from "antd";
import ProfileChange from "profile/student/ProfileChange";
import { default as ProfileContent } from "profile/student/ProfileContent";
import { ProfileEdit } from "profile/student/ProfileEdit";
import { ProfileEditor } from "profile/student/ProfileEditor";
import React, { Component } from "react";


const { TabPane } = Tabs;
const { Header, Sider, Content } = Layout;

class ProfileTabStudent extends Component {
  state = {
    renderComponent: <ProfileContent />,
  };
  changeTabButton = (
    <Space direction="vertical" style={{ position: "fixed" }}>
      <Tooltip placement="right" title={"Profile"}>
        <Button
          style={{ boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.4)", width: 56, height: 56 }}
          shape="circle-outline"
          icon={<UserOutlined style={{ fontSize: '24px' }}></UserOutlined>}
          // size="large"
          onClick={() => {
            this.setState({ renderComponent: <ProfileContent /> });
          }}
        />
      </Tooltip>
      <Tooltip placement="right" title={"Account information"}>
        <Button
          style={{ boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.4)", width: 56, height: 56 }}
          shape="circle-outline"
          icon={<InfoOutlined style={{ fontSize: '24px' }} />}
          size="large"
          onClick={() => {
            this.setState({ renderComponent: <ProfileEdit /> })
          }}
        />
      </Tooltip>
      <Tooltip placement="right" title={"Cv information"}>
        <Button
          style={{ boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.4)", width: 56, height: 56 }}
          shape="circle-outline"
          icon={<EditOutlined style={{ fontSize: '24px' }} />}
          size="large"
          onClick={() => {
            this.setState({ renderComponent: <ProfileChange /> })
          }}
        />
      </Tooltip>
      <Tooltip placement="right" title={"Post management"}>
          <Button
          style={{ boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.4)", width: 56, height: 56 }}
          shape="circle-outline"
          icon={<FileTextOutlined  style={{ fontSize: '24px' }} />}
          size="large"
          onClick={() => {
            this.setState({ renderComponent: <ProfileEditor/> })
          }}>

          </Button>
      </Tooltip>
    </Space>
  )

  render() {
    return (
      <Row>
        <Col></Col>
        <Col span={24}>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Row>
              <Col span={4} style={{ paddingLeft: "5vw", marginTop: "20vh" }}>
                {this.changeTabButton}
              </Col>
              <Col span={16}>
                {this.state.renderComponent}
              </Col>
            </Row>
          </Layout>
        </Col>
        <Col></Col>
      </Row>
    );
  }
}

export { ProfileTabStudent };
