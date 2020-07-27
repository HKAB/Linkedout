import React from 'react'
import { Component } from 'react';
import { Layout, Avatar, Descriptions, Card, Timeline, Row, Col, List, AutoComplete } from 'antd';

import './assets/css/profileContent.css';
import Column from 'antd/lib/table/Column';
import {MailOutlined, ScheduleOutlined, PhoneOutlined} from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';


const { Header, Sider, Content } = Layout;
const data = {
  avatar:'https://image.flaticon.com/icons/svg/3084/3084416.svg',
  name:'Nguyen Phu Truong',
  quotes:'No pain, no gain',
  email:'nguyenphutruong2707@gmail.com',
  phone:'0981285376',
  DoB:'27/07/2000',
};
const exp_data = [
{
  avatar:'https://image.flaticon.com/icons/svg/2950/2950372.svg',
  title_href:'https://ant.design',
  title: 'Ant',
  ex_pos: 'Dev',
  date: 'June 1997 - Present',
},
{
  avatar:'https://image.flaticon.com/icons/svg/508/508123.svg',
  title_href:'https://ant.design',
  title: 'Facebook',
  ex_pos: 'Dev',
  date: 'January 1998 - Present',
},
{
  avatar:'https://image.flaticon.com/icons/svg/2111/2111425.svg',
  title_href:'https://ant.design',
  title: 'Github',
  ex_pos: 'dev, tester',
  date: 'November 1999 - Present',
},
];
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
const skill_data = [
  {
    avatar:'https://dwglogo.com/wp-content/uploads/2017/09/c_logo.png',
    title_href:'https://ant.design',
    title: 'C++',
  },
  {
    avatar:'https://image.flaticon.com/icons/svg/919/919851.svg',
    title_href:'https://ant.design',
    title: 'React',
  },
  {
    avatar:'https://image.flaticon.com/icons/svg/1822/1822899.svg',
    title_href:'https://ant.design',
    title: 'Python',
  },
  {
    avatar:'https://image.flaticon.com/icons/svg/1387/1387539.svg',
    title_href:'https://ant.design',
    title: 'Java',
  },
  {
    avatar:'https://image.flaticon.com/icons/svg/919/919830.svg',
    title_href:'https://ant.design',
    title: 'PHP',
  },
  ];

  const education_data = [
    {
        school_name: "THCS Le Quy Don",
        start_date: "Feb 2011",
        end_date: "Jan 2015",
        degree: "Associate degree",
        major: "No"
    },
    {
        school_name: "THPT Moc Ly",
        start_date: "Feb 2015",
        end_date: "Jan 2018",
        degree: "Associate degree",
        major: "No"
    },
    {
        school_name: "Life",
        start_date: "Feb 2018",
        end_date: "Jan 2019",
        degree: "Bachelor's degree",
        major: "No"
    },
    {
        school_name: "UET",
        start_date: "Feb 2019",
        end_date: "Jan 2024",
        degree: "Bachelor's degree",
        major: "IT"
    },
  ];

  const timeline_element = [];
  education_data.forEach(item => {
      timeline_element.push(<Timeline.Item label={item.start_date + " - " + item.end_date}><div><b>{item.school_name}</b></div><div>{"Degree: " + item.degree}</div><div>{"Major: " + item.major}</div></Timeline.Item>);
  });
class ProfileContent extends Component {
  render(){


    return(
        <>
        <Card
          style={{
        //     padding: 24,
        //     margin: 0,
        //     minHeight: 300,
            marginTop: 24,
		  }}
        >
			<Row>
				<Col style={{textAlign: "center"}} span={24}>
					<Avatar style={{marginBottom: 32}} size={128} src={data.avatar}></Avatar>
					<div className = "user-fullname"><h1>{data.name}</h1></div>
					<span classname = "user-quotes">{data.quotes}</span>
				</Col>
			</Row>
			<Row style={{marginTop: 32}}>
				<Col style={{textAlign: "center"}} span={8}><MailOutlined /> Email: {data.email}</Col>
				<Col style={{textAlign: "center"}} span={8}><PhoneOutlined /> Phone: {data.phone}</Col>
				<Col style={{textAlign: "center"}} span={8}><ScheduleOutlined /> DoB: {data.DoB}</Col>
			</Row>
			{/* <Meta avatar={<Avatar size={128} src={data.avatar}></Avatar>}></Meta>
			<div className = "user-fullname">{data.name}</div> 
            <div classname = "user-quotes">{data.quotes}</div>
          {/* <Avatar size ={128} src={data.avatar}></Avatar> */}
          {/* <Layout className = "user-description">
            <div className = "user-fullname">{data.name}</div> 
            <div classname = "user-quotes">{data.quotes}</div>
            <Descriptions style = {{marginTop:24}}>
              <Descriptions.Item label="Email">{data.email}</Descriptions.Item>
              <Descriptions.Item label="Phone">{data.phone}</Descriptions.Item>
              <Descriptions.Item label="DoB">{data.DoB}</Descriptions.Item>
            </Descriptions>
          </Layout> */}
        </Card>
        <Row gutter={[24, 24]} style = {{marginTop:24}}>
            <Col span={12}>
              <Card>
			  <Meta title="Education"></Meta>
				<Timeline style={{marginTop: 24, paddingTop: 16}} mode="left">
						{timeline_element}
					</Timeline>
              </Card>
            </Col>
            <Col span={12}>
              <Card>
			  <Meta title="Experiences"></Meta>
                <List 
				  itemLayout= "vertical"
				  style={{marginTop: 24}}
                  dataSource={exp_data}
                  renderItem={item =>(
					<List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar}></Avatar>}
                                title={item.title}
                                description={<div className="company-info">
												<div>{"Title: " + item.ex_pos}</div>
												<div>{"Time: " + item.date}</div>
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
                dataSource = {skill_data}
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
        </Row>
      </>
      )
  }
}

export { ProfileContent };