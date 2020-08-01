import React from 'react'
import { Component } from 'react';
import { Layout, Avatar, Descriptions, Card, Timeline, Row, Col, List, AutoComplete } from 'antd';

import './assets/css/profileContent.css';
import Column from 'antd/lib/table/Column';
import {MailOutlined, ScheduleOutlined, PhoneOutlined} from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';

import { studentServices } from "@/services";
import { accountServices } from "@/services";

import dayjs from 'dayjs';

const { Header, Sider, Content } = Layout;
const follow_data = [
{
  avatar:'https://image.flaticon.com/icons/svg/1532/1532495.svg',
  title_href:'https://ant.design',
  title: 'Apple',
},
{
  avatar:'https://image.flaticon.com/icons/svg/2965/2965278.svg',
  title_href:'https://ant.design',
  title: 'Google',
},
{
  avatar:'https://image.flaticon.com/icons/svg/3046/3046121.svg',
  title_href:'https://ant.design',
  title: 'Tiktok',
},
{
  avatar:'https://image.flaticon.com/icons/svg/882/882747.svg',
  title_href:'https://ant.design',
  title: 'Samsung',
},
{
  avatar:'https://image.flaticon.com/icons/svg/806/806086.svg',
  title_href:'https://ant.design',
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
      skill_data: {},
	  education_data: {},
	  education_element: [],
	  phone_data: {},
	  email_data: {},
	  skill_data: []
    }
  }


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
	
			this.setState({education_element: timeline_element});
		  }
	  });
    }
    else {
      console.log("Oh no!");
    }
  }
  render(){
    return(
        <>
        <Card
          style={{
            marginTop: 24,
		  }}
        >
			<Row>
				<Col style={{textAlign: "center"}} span={24}>
					<Avatar style={{marginBottom: 32}} size={128} src={"http://127.0.0.1:8000" + this.state.basic_profile_data.profile_picture}></Avatar>
					<div className = "user-fullname"><h1>{this.state.basic_profile_data.firstname + this.state.basic_profile_data.lastname}</h1></div>
					<span classname = "user-quotes">{this.state.basic_profile_data.description}</span>
				</Col>
			</Row>
			<Row style={{marginTop: 32}}>
				<Col style={{textAlign: "center"}} span={8}><MailOutlined /> Email: {this.state.email_data[0]}</Col>
				<Col style={{textAlign: "center"}} span={8}><PhoneOutlined /> Phone: {this.state.phone_data[0]}</Col>
				<Col style={{textAlign: "center"}} span={8}><ScheduleOutlined /> DoB: {dayjs(this.state.basic_profile_data.dateofbirth).format("DD MMMM YYYY")}</Col>
				</Row>
        </Card>
        <Row gutter={[24, 24]} style = {{marginTop:24}}>
            <Col span={12}>
              <Card>
			  <Meta title="Education"></Meta>
				<Timeline style={{marginTop: 24, paddingTop: 16}} mode="left">
						{this.state.education_element}
					</Timeline>
              </Card>
            </Col>
            <Col span={12}>
              <Card>
			  <Meta title="Experiences"></Meta>
                <List 
				  itemLayout= "vertical"
				  style={{marginTop: 24}}
                  dataSource={this.state.experience_data}
                  renderItem={item =>(
					<List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={"http://127.0.0.1:8000" + item.profile_picture}></Avatar>}
                                title={item.company_name}
                                description={<div className="company-info" id={item.id}>
												<div>{"Title: " + item.title}</div>
												<div>{"Time: " + dayjs(item.start_date).format("MMMM YYYY") + " to " + dayjs(item.end_date).format("MMMM YYYY")}</div>
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
              <List style = {{marginTop:24}} grid = {{column:2}}
                dataSource = {follow_data}
                renderItem = {item =>(
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src = {item.avatar}/>}
                      title ={<a href={item.title_href}>{item.title}</a>}
                    />
                  </List.Item>
                )}
              />
            </Card>  
          </Col>
          <Col span={12}>
            <Card>
			<Meta  title="Skill"></Meta>
              <List style = {{marginTop:24}} grid = {{column:2}}
                dataSource = {this.state.skill_data}
                renderItem = {item =>(
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar/>}
                      title = {item}
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