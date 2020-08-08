import React from 'react';
import { Card, Avatar, Typography, Row, Col, Tag, Divider } from 'antd';
import Meta from 'antd/lib/card/Meta';
const { Title, Text } = Typography;

function FeedFollowSuggestion(props) {

  return (
    <Card style={{ width: 300, height: 300, margintop: 24, margin: 10 }}>
      <Meta title={<Text level={1}>You might want to follow</Text>} />
      <Divider />
    </Card>
  )
}

export { FeedFollowSuggestion };