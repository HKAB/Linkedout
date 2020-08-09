import React from 'react';

import { StudentProfile } from '@/feed/FeedLeftStuff/StudentProfile';
import { Col, Row, Space } from 'antd';
import { FeedFollowSuggestion } from './FeedRightStuff/FeedFollowSuggestion';
import { FeedItSelf } from './FeedMiddleStuff/FeedItSelf';
import { FeedJobSuggestion } from './FeedRightStuff/FeedJobsSuggestion';

function GodDamnPositionFixedStuff(props) {

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
          <Row>
            <FeedFollowSuggestion />
          </Row>
          <Row>
            <FeedJobSuggestion />
          </Row>
        </Col>
      </Row>
    </>
  )
}

export { GodDamnPositionFixedStuff };