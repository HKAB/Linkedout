import {
  ClockCircleOutlined,
  HeartFilled, HomeOutlined, SafetyCertificateOutlined
} from '@ant-design/icons';
import {
  Avatar,
  Button, Card,
  Col, List,
  message, Row, Space,
  Tag,
  Tooltip, Typography
} from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { studentServices, accountServices } from "services";
import { Config } from "../../config/consts";


const { Meta } = Card;
const { Title } = Typography;

function FeedItSelf() {

  let history = useHistory();
  const addInterestedPost = (item) => {
    studentServices.createPostInterested(item.id)
      .then(() => {
        message.success("Add to interested post!");
      })
      .catch(error => {
        message.error("You added to interested post before!");
      });
  }

  const [posts, setPosts] = React.useState([]);
  const [count, setCount] = React.useState({ n_job: 0, n_post: 0 });
  const [interested, setInterested] = useState([]);
  useEffect(() => {
    studentServices.getStudentFeedPost().then((posts) => {
      setPosts(posts);
      var n_job = 0;
      var n_post = 0;

      posts.forEach(post => {
        if (post.type == "job")
          n_job++
        else
          n_post++
      });
      setCount({ n_job: n_job, n_post: n_post });
    });
   
      studentServices.getPostInterested(accountServices.userValue.account.id)
      .then((values)=>{
        let interested = values;
        setInterested(interested.map(d=>{
          return {id: d.id}
        }))
      })
      .catch((err)=>{
        console.log(err);
      })

  }, [])

  return (
    <>
      <Card>
        <Row style={{ textAlign: 'center' }}>
          <Col span={8} style={{ borderRight: '1px solid #ecf0f1' }}>
            <Title level={4}>Job Introduction</Title>
            <div>{count.n_job}</div>
          </Col>

          <Col span={8} style={{ borderRight: '1px solid #ecf0f1' }}>
            <Title level={4}>Sum</Title>
            <div>{count.n_job + count.n_post}</div>
          </Col>
          <Col span={8}>
            <Title level={4}>Find your partner</Title>
            <div>{count.n_post}</div>
          </Col>
        </Row>
      </Card>

      <List
        itemLayout="vertical"
        size="large"
        dataSource={posts}
        renderItem={(item) => {
          if (item.type == "job")
            return (
              <>
                <Card
                  className="card-info"
                  key={item.id}
                  style={{ marginTop: 24 }}
                  cover={<img src={Config.backendUrl + item.job_picture} height={200}></img>}
                >
                  <Meta
                    avatar={
                      <Tooltip placement="bottom" title={item.company_name}><Avatar src={Config.backendUrl + item.company_profile_picture} ></Avatar></Tooltip>
                    }
                    title={
                      <>
                        <Title level={4} href={item.recruitment_url}>
                          {item.title} •<Link to={"/profile/company/" + item.account_id}><i> {item.company_name}</i></Link>
                        </Title>
                        <Button
                          style={{ float: "right", width: 100, marginRight: 45, bottom: 24 }}
                          type="primary"
                          onClick={() => window.open(item.recruitment_url)}
                        >
                          Apply
                        </Button>
                        <u>
                          <i>
                            {moment(item.published_date, 'YYYY-MM-DD').format(
                              'MMMM Do YYYY'
                            )}
                          </i>
                        </u>
                      </>
                    }
                    description={
                      <>
                        <Row>
                          <Col span={18}>
                            <div style={{ fontSize: 14 }}>{item.description}</div>
                          </Col>
                          <Col offset={1} span={5}>
                            <div>
                              <Space>
                                <SafetyCertificateOutlined />
                                {item.seniority_level}
                              </Space>
                            </div>
                            <div>
                              <Space>
                                <ClockCircleOutlined />
                                {item.employment_type}
                              </Space>
                            </div>
                            <Space>
                              <HomeOutlined />
                              <List
                                grid={{ gutter: 0 }}
                                dataSource={item.cities}
                                renderItem={(city) => city}
                              ></List>
                            </Space>
                          </Col>
                        </Row>
                        <Row style={{ marginTop: 16 }}>
                          <Col span={19}>
                            <Space>
                              <List
                                dataSource={item.skills}
                                renderItem={(skill) => <Tag>{skill}</Tag>}
                              ></List>
                            </Space>
                          </Col>
                        </Row>
                      </>
                    }
                  ></Meta>
                </Card>
              </>
            )
          else
            return (
              <>
                <Card
                  className="card-info"
                  key={item.id}
                  style={{ marginTop: 24 }}
                  cover={<img src={Config.backendUrl + item.post_picture} height={200}></img>}
                >
                  <Meta
                    avatar={
                      <Tooltip placement="bottom" title={item.student_firstname + " " + item.student_lastname}><Avatar src={Config.backendUrl + item.student_profile_picture}></Avatar></Tooltip>
                    }
                    title={
                      <>
                        <Title level={4}>
                          {item.title}
                        </Title>
                        <u>
                          <i>
                            {moment(item.published_date, 'YYYY-MM-DD').format(
                              'MMMM Do YYYY'
                            )}
                          </i>
                        </u>
                      </>
                    }
                    description={
                      <>
                        <Row>
                          <Col span={19}>
                            <div style={{ fontSize: 14 }}>{item.content}</div>
                          </Col>
                        </Row>
                        <Row style={{ marginTop: 16 }}>
                          <Col span={19}>
                            <Space>
                              <List
                                dataSource={item.skills}
                                renderItem={(skill) => <Tag>{skill}</Tag>}
                              ></List>
                            </Space>
                          </Col>
                          <Col span={5}>
                             <Button
                              style={{ float: 'right' }}
                              type="primary"
                              shape="circle"
                              disabled={interested.filter(e => e.id === item.id)[0] !== undefined?true: false}
                              onClick={() => addInterestedPost(item)}
                            >
                              <HeartFilled />
                            </Button>
                           
                            
                          </Col>
                        </Row>
                      </>
                    }
                  ></Meta>
                </Card>
              </>
            )
        }
        }
      />
    </>
  );
}

export { FeedItSelf };