import React from 'react'
import { Component } from 'react';
import { Layout, Avatar, Descriptions, Card, Timeline, Row, Col, List, AutoComplete } from 'antd';

import './assets/css/profileContent.css';
import Column from 'antd/lib/table/Column';
import { MailOutlined, ScheduleOutlined, PhoneOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';

import { studentServices } from "../home/node_modules/@/services"
import { accountServices } from "../home/node_modules/@/services"

import dayjs from 'dayjs';

const { Header, Sider, Content } = Layout;
const follow_data = [
  {
    avatar: 'https://image.flaticon.com/icons/svg/1532/1532495.svg',
    title_href: 'https://ant.design',
    title: 'Apple',
  },
  {
    avatar: 'https://image.flaticon.com/icons/svg/2965/2965278.svg',
    title_href: 'https://ant.design',
    title: 'Google',
  },
  {
    avatar: 'https://image.flaticon.com/icons/svg/3046/3046121.svg',
    title_href: 'https://ant.design',
    title: 'Tiktok',
  },
  {
    avatar: 'https://image.flaticon.com/icons/svg/882/882747.svg',
    title_href: 'https://ant.design',
    title: 'Samsung',
  },
  {
    avatar: 'https://image.flaticon.com/icons/svg/806/806086.svg',
    title_href: 'https://ant.design',
    title: 'Tesla',
  },
];
const skill_data = [
  {
    avatar: 'https://dwglogo.com/wp-content/uploads/2017/09/c_logo.png',
    title_href: 'https://ant.design',
    title: 'C++',
  },
  {
    avatar: 'https://image.flaticon.com/icons/svg/919/919851.svg',
    title_href: 'https://ant.design',
    title: 'React',
  },
  {
    avatar: 'https://image.flaticon.com/icons/svg/1822/1822899.svg',
    title_href: 'https://ant.design',
    title: 'Python',
  },
  {
    avatar: 'https://image.flaticon.com/icons/svg/1387/1387539.svg',
    title_href: 'https://ant.design',
    title: 'Java',
  },
  {
    avatar: 'https://image.flaticon.com/icons/svg/919/919830.svg',
    title_href: 'https://ant.design',
    title: 'PHP',
  },
];

class ProfileContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      basic_profile_data: {},
      experience_data: [],
      follow_data: {},
      skill_data: {},
      education_data: {},
      education_element: [],
      phone_data: {},
      email_data: {}
    }
  }


  componentDidMount() {
    let user = accountServices.userValue;
    if (user) {
      studentServices.getStudent(user.account.id).then(student => {

        this.setState({ basic_profile_data: student.basic_data });
        this.setState({ experience_data: student.experience });
        this.setState({ education_data: student.education });
        this.setState({ email_data: student.email });
        this.setState({ phone_data: student.phone });

        var timeline_element = []
        this.state.education_data.forEach(item => {
          timeline_element.push(<Timeline.Item label={item.start_date + " - " + item.end_date}><div><b>{item.school_name}</b></div><div>{"Degree: " + item.degree}</div><div>{"Major: " + item.major}</div></Timeline.Item>);
        });

        this.setState({ education_element: timeline_element });

        console.log(this.state)
      });

    }
    else {
      console.log("Oh no!");
    }
  }
  render() {
    return (
      <>
        <Card
          style={{
            marginTop: 24,
          }}
        >
          <Row>
            <Col style={{ textAlign: "center" }} span={24}>
              <Avatar style={{ marginBottom: 32 }} size={128} src={"http://127.0.0.1:8000" + this.state.basic_profile_data.profile_picture}></Avatar>
              <div className="user-fullname"><h1>{this.state.basic_profile_data.firstname + this.state.basic_profile_data.lastname}</h1></div>
              <span classname="user-quotes">{this.state.basic_profile_data.description}</span>
            </Col>
          </Row>
          <Row style={{ marginTop: 32 }}>
            <Col style={{ textAlign: "center" }} span={8}><MailOutlined /> Email: {this.state.email_data[0]}</Col>
            <Col style={{ textAlign: "center" }} span={8}><PhoneOutlined /> Phone: {this.state.phone_data[0]}</Col>
            <Col style={{ textAlign: "center" }} span={8}><ScheduleOutlined /> DoB: {this.state.basic_profile_data.dateofbirth}</Col>
          </Row>
        </Card>
        <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
          <Col span={12}>
            <Card>
              <Meta title="Education"></Meta>
              <Timeline style={{ marginTop: 24, paddingTop: 16 }} mode="left">
                {this.state.education_element}
              </Timeline>
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Meta title="Experiences"></Meta>
              <List
                itemLayout="vertical"
                style={{ marginTop: 24 }}
                dataSource={this.state.experience_data}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={"http://127.0.0.1:8000" + item.profile_picture}></Avatar>}
                      title={item.company_name}
                      description={<div className="company-info" id={item.id}>
                        <div>{"Title: " + item.title}</div>
                        <div>{"Time: " + item.start_date + " " + item.end_date}</div>
                      </div>}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <Card>
              <Meta title="Following"></Meta>
              <List style={{ marginTop: 24 }} grid={{ column: 2 }}
                dataSource={follow_data}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={<a href={item.title_href}>{item.title}</a>}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Meta title="Skill"></Meta>
              <List style={{ marginTop: 24 }} grid={{ column: 2 }}
                dataSource={skill_data}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={<a href={item.title_href}>{item.title}</a>}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </>
    )
  }
}
export { ProfileContent };