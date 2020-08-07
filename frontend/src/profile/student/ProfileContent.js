import React, { useState, useEffect } from 'react'
import { Component } from 'react';
import { Spin, Layout, Typography, Avatar, Descriptions, Card, Timeline, Row, Col, List, AutoComplete, Modal, Button, Empty } from 'antd';

import '../assets/css/profile.css';
import Column from 'antd/lib/table/Column';
import { MailOutlined, ScheduleOutlined, PhoneOutlined, DoubleRightOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';

import { studentServices } from "@/services"
import { accountServices } from "@/services"

import dayjs from 'dayjs';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;
const followData = [
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

function ProfileContent() {

  const [basicProfileData, setBasicProfileData] = useState([]);
  const [experienceData, setExperienceData] = useState([]);
  const [followData, setFollowData] = useState([]);
  const [skillData, setSkillData] = useState([]);
  const [educationData, setEducationData] = useState([]);
  const [educationElement, setEducationElement] = useState([<Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>]);
  const [phoneData, setPhoneData] = useState([]);
  const [emailData, setEmailData] = useState([]);
  const [experienceVisible, setExperienceVisible] = useState(false);
  const [educationVisible, setEducationVisible] = useState(false);
  const [skillVisible, setSkillVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const showExperienceModal = () => {
    setExperienceVisible(true);
  };

  const showEducationModal = () => {
    setEducationVisible(true);
  };

  const showSkillModal = () => {
    setSkillVisible(true);
  };

  const handleExperienceCancel = (e) => {
    setExperienceVisible(false);
  };

  const handleEducationCancel = (e) => {
    setEducationVisible(false);
  };

  const handleSkillCancel = (e) => {
    setSkillVisible(false);
  };

  useEffect(() => {

	// setState({isLoading: true});

    let user = accountServices.userValue;
    if (user) {
	  studentServices.getStudent(user.account.id);
	  const subscription = studentServices.studentObject.subscribe((student) => {
		  if (student) {
        setBasicProfileData(student.basic_data);
        setExperienceData(student.experience);
        setEducationData(student.education);
        setEmailData(student.email);
        setPhoneData(student.phone);
        setSkillData(student.skill);
          console.log(student);
        var timeline_element = []
        student.education.forEach(item => {
          timeline_element.push((<Timeline.Item key={item.id} label={dayjs(item.start_date).format("MMMM YYYY") + " - " + dayjs(item.end_date).format("MMMM YYYY")}><div><b>{item.school_name}</b></div><div>{"Degree: " + item.degree}</div><div>{"Major: " + item.major}</div></Timeline.Item>));
        });
		if (timeline_element.length == 0) setEducationElement([<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />]); 
		else {
			setEducationElement(timeline_element); 
		}
        // if (educationData.length == 0) setState({educationData : []});
      // else setState({educationElement: timeline_element});
      	setIsLoading(false);
        console.log(educationElement);
		  }

		  return () => {
			subscription.unsubscribe();
		}
    });
    setIsLoading(false);
    }
    else {
      console.log("Oh no!");
	}

  }, []);


    if (isLoading) {
      return (
		  <Spin/>
	  );
	}
    return (
      <>
        <Card
          className="card-info"
          style={{
            marginTop: 24,
          }}
        >
          <Row justify="center">
            <Col textAlign="center">
              <div style={{textAlign: "center"}}>
                <Avatar style={{ marginBottom: 32 }} size={128} src={"http://127.0.0.1:8000" + basicProfileData.profile_picture} onError={(e)=>{console.log(e);}}></Avatar>
                <Title level={2} className="user-fullname">{basicProfileData.firstname + " " + basicProfileData.lastname}</Title>
                <Text copyable classname="user-quotes">{basicProfileData.description}</Text>
              </div>
            </Col>
          </Row>
          <Row style={{ marginTop: 32 }}>
            <Col style={{ textAlign: "center" }} span={8}><MailOutlined /> Email: {emailData[0]}</Col>
            <Col style={{ textAlign: "center" }} span={8}><PhoneOutlined /> Phone: {phoneData[0]}</Col>
            <Col style={{ textAlign: "center" }} span={8}><ScheduleOutlined /> DoB: {basicProfileData.dateofbirth}</Col>
          </Row>
        </Card>

        <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
          <Col span={12}>
            <Card className="card-info">
              <Meta title={<Title level={3}>Học vấn</Title>}></Meta>
              <Timeline style={{ marginTop: 24, paddingTop: 16 }} mode="left">
                  {educationElement.slice(0, 4)}
              </Timeline>
              <Button 
                type = "link" 
                style = {{float:'right'}} 
                onClick = {()=>showEducationModal()}> Show all <DoubleRightOutlined />
              </Button>
            </Card>

            <Card className="card-info" style = {{marginTop:24}}>
              <Meta title={<Title level={3}>Theo dõi</Title>}></Meta>
              <List style={{ marginTop: 24 }} grid={{ column: 2 }}
                dataSource={followData}
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
            <Card className="card-info">
              <Meta title={<Title level={3}>Kinh nghiệm</Title>}></Meta>
              <List
                itemLayout="vertical"
                style={{ marginTop: 24 }}
                dataSource={experienceData.slice(0, 4)}
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
                type = "link" 
                style = {{float:'right'}} 
                onClick = {()=>showExperienceModal()}> Show all <DoubleRightOutlined />
              </Button>
            </Card>

            <Card className="card-info" style = {{marginTop:24}}>
              <Meta title={<Title level={3}>Kỹ năng</Title>}></Meta>
              <List style={{ marginTop: 24 }} grid={{ column: 2 }}
                dataSource={skillData.slice(0, 6)}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar/>}
                      title={item}
                    />
                  </List.Item>
                )}
              />
              <Button 
                type = "link" 
                style = {{float:'right'}} 
                onClick = {()=>showSkillModal()}> Show all <DoubleRightOutlined />
              </Button>
            </Card>
          </Col>
        </Row>
        
        <Modal
          forceRender
          title="Educations"
          footer = {null}
          visible={educationVisible}
          onCancel={handleEducationCancel}
        >
          <Timeline style={{ marginTop: 24, paddingTop: 16 }} mode="left">
            {educationElement}
          </Timeline>
        </Modal>

        <Modal
          forceRender
          title="Experiences"
          footer = {null}
          visible={experienceVisible}
          onCancel={handleExperienceCancel}
        >
          <List
            itemLayout="vertical"
            style={{ marginTop: 24 }}
            dataSource={experienceData}
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
          visible={skillVisible}
          onCancel={handleSkillCancel}
        >
          <List style={{ marginTop: 24 }}
            dataSource={skillData}
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
      </>
    )
}
export { ProfileContent };