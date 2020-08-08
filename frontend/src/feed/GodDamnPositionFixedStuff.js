import React from 'react';

import { StudentProfile } from '@/feed/FeedLeftStuff/StudentProfile';
import { Col, Row, Space } from 'antd';
import { FeedFollowSuggestion } from './FeedRightStuff/FeedFollowSuggestion';
import { FeedItSelf } from './FeedMiddleStuff/FeedItSelf';
import { FeedJobSuggestion } from './FeedRightStuff/FeedJobsSuggestion';

function GodDamnPositionFixedStuff(props) {

  return (
    <>
      <Row justify="center" style={{ margin: 16 }}>
        <Col span={4} textAlign="center">
          <StudentProfile />
        </Col>
        <Col span={16} textAlign="center">
          <FeedItSelf />
        </Col>
        <Col span={4} textAlign="center">
          <FeedFollowSuggestion />
          <FeedJobSuggestion />
        </Col>
      </Row>
    </>
  )
}

export { GodDamnPositionFixedStuff };