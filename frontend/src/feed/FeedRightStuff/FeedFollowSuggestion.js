import React from 'react';
import { Card, Avatar, Typography, Row, Col, Tag, Divider, List, Button } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { CheckOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

function FeedFollowSuggestion(props) {
  const [suggestions, setSuggestion] = React.useState([
    {
      id: 1,
      avatar: "https://image.flaticon.com/icons/svg/2965/2965278.svg",
      name: "Google",
      specialty: "Internet",
      followed: false
    },
    {
      id: 2,
      avatar: "https://image.flaticon.com/icons/svg/2965/2965278.svg",
      name: "Not Google",
      specialty: "Damn Search Engine That is not Google or Shodan",
      followed: false
    },
    {
      id: 3,
      avatar: "https://image.flaticon.com/icons/svg/2965/2965278.svg",
      name: "Definitely not G00gl3",
      specialty: "Damn Search Engine",
      followed: false
    },
  ])

  const handleClick = (e, item) => {
    // TODO: Change handle click event, send request blah blah
    // E=mc2 stuff, make change to only 1 object
    setSuggestion([...suggestions].map(object => {
      if (object.id == item.id) {
        return {
          ...object,
          followed: true
        }
      } else {
        return object;
      }
    }))
  }

  return (
    <Card style={{ width: 400, height: 350, marginLeft: 10, marginRight: 10, marginBottom: 0, marginTop: 0 }}>
      <Meta title={<Text>Add to your feed</Text>} />
      <Divider style={{ marginTop: 16, marginBottom: 0 }} />
      <List
        style={{ margin: 0 }}
        grid={{ gutter: 0, column: 1 }}
        itemLayout="vertical"
        dataSource={suggestions.slice(0, 3)}
        renderItem={item => (
          <List.Item style={{ margin: 0, padding: 0 }} key={item.id}>
            <Card bordered={false} style={{ padding: 0 }}>
              <Row justify="space-between">
                <Col span={4}>
                  <Avatar src={item.avatar} style={{ marginTop: 5, marginLeft: 0 }} />
                </Col>
                <Col span={14}>
                  <Row justify="left"><Text ellipsis>{item.name}</Text></Row>
                  <Row justify="left"><Text ellipsis type="secondary">Company - {item.specialty}</Text></Row>
                </Col>
                <Col span={6}>
                  {!item.followed ? (
                    <Button
                      onClick={((e) => { handleClick(e, item) })}
                      type="primary"
                      style={{ padding: 0, textAlign: "center", marginLeft: 8, marginRight: 4, marginTop: 4, width: 84 }}
                    >
                      + Follow
                    </Button>
                  ) : (
                      <Button
                        onClick={() => { }}
                        type="primary"
                        style={{ padding: 0, textAlign: "center", marginLeft: 8, marginRight: 4, marginTop: 4, width: 84 }}
                        disabled
                      >
                        <CheckOutlined style={{ width: 10 }} />Followed
                      </Button>
                    )}
                </Col>
              </Row>
            </Card>
          </List.Item>
        )}
      />
    </Card>
  )
}

export { FeedFollowSuggestion };