import { feedFollowSuggestionService } from '@/services/feed/feedFollowSuggestion.service';
import { followService } from '@/services/follow.service';
import { CheckOutlined } from '@ant-design/icons';
import { Affix, Avatar, Button, Card, Col, Divider, List, Row, Typography } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React, { useEffect } from 'react';
import { Config } from '../../config/consts';
const { Title, Text } = Typography;


function FeedFollowSuggestion(props) {
  const [suggestions, setSuggestions] = React.useState([]);

  const fetchSuggesions = async () => {
    let response = await feedFollowSuggestionService.getSuggestions();
    let result = response.map((item) => {
      return {
        id: item.id,
        name: item.name,
        avatar: item.profile_picture,
        specialties: item.specialties,
        followed: false
      }
    });
    setSuggestions(result);
  }

  useEffect(() => {
    fetchSuggesions();
  }, [])

  const doFollow = async (id) => {
    await followService.follow(id);
  }

  const doUnFollow = async (id) => {
    await followService.unfollow(id);
  }

  const handleClick = (e, item) => {
    // TODO: Change handle click event, send request blah blah
    // E=mc2 stuff, make change to only 1 object
    if (!item.followed) doFollow(item.id);
    else doUnFollow(item.id);
    setSuggestions([...suggestions].map(object => {
      if (object.id == item.id) {
        return {
          ...object,
          followed: !object.followed
        }
      } else {
        return object;
      }
    }));
  }

  return (
    <Affix offsetTop={80}>
      <Card className="card-info" style={{ width: 400, height: 350 }}>
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
                    <Avatar src={Config.backendUrl + item.avatar} style={{ marginTop: 5, marginLeft: 0 }} />
                  </Col>
                  <Col span={14}>
                    <Row justify="left"><Text ellipsis>{item.name}</Text></Row>
                    <Row justify="left"><Text ellipsis type="secondary">Company - {item.specialties.join(", ")}</Text></Row>
                  </Col>
                  <Col span={6}>
                    {!item.followed ? (
                      <Button
                        onClick={((e) => { handleClick(e, item) })}
                        type="default"
                        style={{ padding: 0, textAlign: "center", marginLeft: 8, marginRight: 4, marginTop: 4, width: 84 }}
                      >
                        + Follow
                      </Button>
                    ) : (
                        <Button
                          onClick={((e) => { handleClick(e, item) })}
                          type="default"
                          style={{ padding: 0, textAlign: "center", marginLeft: 8, marginRight: 4, marginTop: 4, width: 84 }}
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
    </Affix>
  )
}

export { FeedFollowSuggestion };
