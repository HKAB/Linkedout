import { Col, Layout, Row } from "antd";
import { MyHeader } from "components";
import { default as CompanyProfileContent } from "profile/company/ProfileContent";
import { default as StudentProfileContent } from "profile/student/ProfileContent";
import React from 'react';
import { useParams } from 'react-router-dom';
import { accountServices } from "services";
import './assets/css/profile.css';

function ViewProfile(props) {

  let { id } = useParams();
  const user = accountServices.userValue;

  if (user) {
    if (props.accountType == "student") {
      return (
        <Layout>
          <MyHeader />
          <Row>
            <Col></Col>
            <Col span={24}>
              <Layout style={{ padding: "0 24px 24px" }}>
                <Row>
                  <Col span={5}>
                  </Col>
                  <Col span={14}>
                    <StudentProfileContent id={id} />
                  </Col>
                  <Col span={5}></Col>
                </Row>
              </Layout>
            </Col>
            <Col></Col>
          </Row>
        </Layout>
      );
    }
    else if (props.accountType == "company") {
      return (
        <Row>
          <MyHeader />
          <Col></Col>
          <Col span={24}>
            <Layout style={{ padding: "0 24px 24px" }}>
              <Row>
                <Col span={5}>
                </Col>
                <Col span={14}>
                  <CompanyProfileContent id={id} />
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
  return (
    <div>Nothing here</div>
  )
}

export { ViewProfile };
