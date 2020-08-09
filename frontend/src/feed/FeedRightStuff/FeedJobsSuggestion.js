import React, { useState } from 'react';
import { Card, Avatar, Typography, Row, Col, Tag, Divider, List, Button } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { ExportOutlined, RightOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

function FeedJobSuggestion() {
  const [suggestions, setSuggestion] = useState([
    {
      jobId: 1,
      companyName: "FPT Software",
      companyProfilePicture: "https://upload.wikimedia.org/wikipedia/vi/8/80/FPT_New_Logo.png",
      jobTitle: "Senior Software Engineer",
      recruitmentUrl: "",
      cities: ["Hanoi", "Danang"]
    },
    {
      jobId: 3,
      companyName: "Viettel Network But Not In Danang",
      companyProfilePicture: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Viettel_Logo.jpg",
      jobTitle: "Senior System Administrator",
      recruitmentUrl: "",
      cities: ["Hanoi", "Ho Chi Minh"]
    },
    {
      jobId: 6,
      companyName: "Vin Bigdata FTW",
      companyProfilePicture: "https://brasol.vn/public/ckeditor/uploads/thiet-ke-logo-tin-tuc/logo-vingroup.jpg",
      jobTitle: "Chief Executive Officer That Is Unable To Replace Pham Nhat Vuong",
      recruitmentUrl: "",
      cities: ["Danang", "Ho Chi minh"]
    },
  ])

  return (
    <Card className="card-info" style={{ width: 400, height: 400, margintop: 24, margin: 10 }}>
      <Meta title={<Text>Jobs you might interest</Text>} />
      <Divider style={{ marginTop: 16, marginBottom: 0 }} />
      <List
        style={{ margin: 0 }}
        grid={{ gutter: 0, column: 1 }}
        itemLayout="vertical"
        dataSource={suggestions.slice(0, 3)}
        renderItem={item => (
          <List.Item style={{ margin: 0, padding: 0 }} key={item.jobId}>
            <Card bordered={false} style={{ padding: 0 }}>
              <Row justify="space-between">
                <Col span={4}>
                  <Avatar shape="square" size={32} src={item.companyProfilePicture} style={{ marginTop: 16, marginLeft: 0 }} />
                </Col>
                <Col span={14}>
                  <Row justify="left"><Text ellipsis>{item.jobTitle}</Text></Row>
                  <Row justify="left"><Text ellipsis type="secondary">{item.companyName}</Text></Row>
                  <Row justify="left"><Text ellipsis type="secondary">{item.cities.join(", ")}</Text></Row>
                </Col>
                <Col span={6}>
                  <Button
                    onClick={() => { }}
                    type="primary"
                    style={{ padding: 0, textAlign: "center", marginLeft: 8, marginRight: 4, marginTop: 4, width: 84 }}
                  >Visit <RightOutlined />
                  </Button>
                </Col>
              </Row>
            </Card>
          </List.Item>
        )}
      />
    </Card>
  )
}

export { FeedJobSuggestion };