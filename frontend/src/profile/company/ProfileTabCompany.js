import { EditOutlined, InfoOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Layout, Row, Space, Tooltip } from "antd";
import ProfileChange from "profile/company/ProfileChange";
import { default as ProfileContent } from "profile/company/ProfileContent";
import { ProfileEdit } from "profile/company/ProfileEdit";
import React, { Component } from "react";

class ProfileTabCompany extends Component {

  state = {
    renderComponent: <ProfileContent/>
  }
  changeTabButton = (
    <Space direction="vertical" style={{ position: "fixed" }}>
      <Tooltip placement="right" title={"Profile nè"}>
        <Button
          style={{ boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.4)", width: 56, height: 56 }}
          shape="circle-outline"
          icon={<UserOutlined style={{ fontSize: '24px' }}></UserOutlined>}
          // size="large"
          onClick={() => {
            this.setState({renderComponent: <ProfileContent/>});
          }}
        />
      </Tooltip>
      <Tooltip placement="right" title={"Thông tin tài khoản nè"}>
        <Button
          style={{ boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.4)", width: 56, height: 56 }}
          shape="circle-outline"
          icon={<InfoOutlined style={{ fontSize: '24px' }} />}
          size="large"
          onClick={() => {
            this.setState({renderComponent: <ProfileEdit />})
          }}
        />
      </Tooltip>
      <Tooltip placement="right" title={"Thông tin CV nè"}>
        <Button
          style={{ boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.4)", width: 56, height: 56 }}
          shape="circle-outline"
          icon={<EditOutlined style={{ fontSize: '24px' }} />}
          size="large"
          onClick={() => {
            this.setState({renderComponent: <ProfileChange />})
          }}
        />
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
              <Col span={5} style={{ paddingLeft: "5vw", marginTop: "20vh" }}>
                {this.changeTabButton}
              </Col>
              <Col span={14}>
                {this.state.renderComponent}
              </Col>
              <Col span={5}></Col>
            </Row>
          </Layout>
        </Col>
        <Col></Col>
      </Row>
    );
  }
}

export { ProfileTabCompany };
