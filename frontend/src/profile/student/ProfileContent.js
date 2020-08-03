import React from 'react'
import { Component } from 'react';
import { Layout, Avatar, Descriptions, Card, Timeline, Row, Col, List, AutoComplete, Modal, Button, Empty } from 'antd';

import '../assets/css/profileContent.css';
import Column from 'antd/lib/table/Column';
import { MailOutlined, ScheduleOutlined, PhoneOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';

import { studentServices } from "@/services"
import { accountServices } from "@/services"

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

class ProfileContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      basic_profile_data: {},
      experience_data: [],
      follow_data: {},
      skill_data: [],
      education_data: {},
      education_element: [<Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>],
      phone_data: {},
      email_data: {},
      //modal
      experience_visible:false,
      education_visible:false,
      skill_visible:false,
    }
  }

  showExperienceModal = () => {
    this.setState({ experience_visible: true });
  };

  showEducationModal = () => {
    this.setState({ education_visible: true });
  };

  showSkillModal = () => {
    this.setState({ skill_visible: true });
  };

  handleExperienceCancel = (e) => {
    this.setState({ experience_visible: false });
  };

  handleEducationCancel = (e) => {
    this.setState({ education_visible: false });
  };

  handleSkillCancel = (e) => {
    this.setState({ skill_visible: false });
  };

  componentDidMount() {
    let user = accountServices.userValue;
    if (user) {
	  studentServices.getStudent(user.account.id);
	  studentServices.studentObject.subscribe((student) => {
		  if (student) {
			this.setState({basic_profile_data: student.basic_data});
			this.setState({experience_data: student.experience});
			this.setState({education_data: student.education});
			this.setState({email_data: student.email});
			this.setState({phone_data: student.phone});
			this.setState({skill_data: student.skill});
	
			var timeline_element = []
			student.education.forEach(item => {
				timeline_element.push(<Timeline.Item key={item.id} label={dayjs(item.start_date).format("MMMM YYYY") + " - " + dayjs(item.end_date).format("MMMM YYYY")}><div><b>{item.school_name}</b></div><div>{"Degree: " + item.degree}</div><div>{"Major: " + item.major}</div></Timeline.Item>);
			});
      if (timeline_element.length == 0) this.setState({education_element: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />});  
      else this.setState({education_element: timeline_element});
      console.log(this.state.education_element);
		  }
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
            <Col span={24}>
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
                  {this.state.education_element.slice(0, 4)}
              </Timeline>
              <Button 
                type = "primary" 
                style = {{float:'right'}} 
                onClick = {()=>this.showEducationModal()}> Show all
              </Button>
            </Card>
          </Col>

          <Col span={12}>
            <Card>
              <Meta title="Experiences"></Meta>
              <List
                itemLayout="vertical"
                style={{ marginTop: 24 }}
                dataSource={this.state.experience_data.slice(0, 4)}
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
              <Button 
                type = "primary" 
                style = {{float:'right'}} 
                onClick = {()=>this.showExperienceModal()}> Show all
              </Button>
            </Card>
          </Col>
        </Row>
        
        <Modal
          forceRender
          title="Educations"
          footer = {null}
          visible={this.state.education_visible}
          onCancel={this.handleEducationCancel}
        >
          <Timeline style={{ marginTop: 24, paddingTop: 16 }} mode="left">
            {this.state.education_element}
          </Timeline>
        </Modal>

        <Modal
          forceRender
          title="Experiences"
          footer = {null}
          visible={this.state.experience_visible}
          onCancel={this.handleExperienceCancel}
        >
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
        </Modal>

        <Modal
          forceRender
          title="Skills"
          footer = {null}
          visible={this.state.skill_visible}
          onCancel={this.handleSkillCancel}
        >
          <List style={{ marginTop: 24 }}
            dataSource={this.state.skill_data}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar />}
                  title={item}
                />
              </List.Item>
            )}
          />
        </Modal>

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
                dataSource={this.state.skill_data.slice(0, 6)}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar />}
                      title={item}
                    />
                  </List.Item>
                )}
              />
              <Button 
                type = "primary" 
                style = {{float:'right'}} 
                onClick = {()=>this.showSkillModal()}> Show all
              </Button>
            </Card>
          </Col>
        </Row>
      </>
    )
  }
}
export { ProfileContent };