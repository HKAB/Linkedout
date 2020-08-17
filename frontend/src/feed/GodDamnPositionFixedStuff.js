import { Col, Row, Spin } from 'antd';
import { StudentProfile } from 'feed/FeedLeftStuff/StudentProfile';
import React from 'react';
import { FeedItSelf } from './FeedMiddleStuff/FeedItSelf';
import { FeedFollowSuggestion } from './FeedRightStuff/FeedFollowSuggestion';
import { FeedJobSuggestion } from './FeedRightStuff/FeedJobsSuggestion';
import { accountServices, studentServices } from "services";

function GodDamnPositionFixedStuff(props) {

  const user = accountServices.userValue;

  if (user) {
    if (user.account.account_type == "student")
    {
      return (
        <>
          <Row style={{ margin: 16 }}>
            <Col span={7} >
              <Row justify="end" style={{ paddingRight: 24 }}>
                <StudentProfile />
              </Row>
            </Col>
            <Col span={10}>
              <FeedItSelf />
            </Col>
            <Col span={7}>
              <Row style={{ paddingTop: 0, paddingLeft: 24 }}>
                <FeedFollowSuggestion />
              </Row>
              <Row style={{ paddingTop: 16, paddingLeft: 24 }}>
                <FeedJobSuggestion />
              </Row>
            </Col>
          </Row>
        </>
    )
      }
      return (<div>STUDENT ONLY</div>)
  }


  return (<Spin></Spin>)
}

export { GodDamnPositionFixedStuff };
