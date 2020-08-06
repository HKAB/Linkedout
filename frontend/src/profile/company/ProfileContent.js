import React from 'react'
import { Component } from 'react';
import { Spin, Layout, Statistic, Carousel, Avatar, Progress, Divider, Descriptions, Card, Timeline, Row, Col, List, AutoComplete, Modal, Button, Empty, Tag } from 'antd';

import { Typography } from 'antd';
import Column from 'antd/lib/table/Column';
import { MailOutlined, ScheduleOutlined, PhoneOutlined, LikeOutlined, SettingOutlined, EditOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';

import '../assets/css/profile.css';
import pic1 from '../assets/images/abc.jpg'
import pic2 from '../assets/images/xyz.jpg'

import { accountServices } from "@/services"

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const data = {
    name: "Facebook",
    // cities: "Hà Nội, thủ đô của nước Cộng hòa Xã hội chủ nghĩa Việt Nam",
	website: "lotus.vn",
	profile_picture: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
	// company_size: "4000+",
	specialties: ["Ban buon ban le :)"],
    email: "omegalul@gmail.com",
    phone: "0981285376",
    description: (<b>Founded in 2004, Facebook’s mission is to give people the power to build community and bring the world closer together. Over 2 billion people use Facebook, Insskillsram, WhatsApp, or Messenger every month to stay connected with friends and family, to discover what’s going on in the world, and to share and express what matters to them.
                  Facebook is defined by our unique culture – one that rewards impact. We encourage people to be bold and solve the problems they care most about. We work in small teams and move fast to develop new products, constantly iterating. The phrase “this journey is 1% finished” reminds us that we’ve only begun to fulfill our mission.</b>)
}

const jobs = [
	{
		title: "Tuyển Dev tại facebook.wap.sh",
		seniority_level: "Junior",
		employment_type: "Full time",
		cities: "Hà Nội",
		skills: ["Python", "C++", "C#", "Java", "Coffee"],
		description: ""
	},
	{
		title: "Tuyển Dev tại facebook.wap.sh",
		seniority_level: "Mid level",
		employment_type: "Part time",
		cities: "Hà Nội",
		skills: ["Python", "C++", "C#", "Java", "Coffee"],
		description: ""
	},
	{
		title: "Tuyển Dev tại facebook.wap.sh",
		seniority_level: "Fresher",
		employment_type: "Remote",
		cities: "Hà Nội",
		skills: ["Python", "C++", "C#", "Java", "Coffee"],
		description: ""
	}
]

const rowStyle = {
  position: "relative", 
  alignContent: "middle"
}

const centerInRowStyle = {
  position: "absolute",
  left: 0, 
  right: 0, 
  top: 0, 
  bottom: 0, 
  margin: "auto"
}

class ProfileContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
		isLoading: true
    }
  }

  componentDidMount() {
	this.setState({isLoading: false});
    let user = accountServices.userValue;
    if (user) {
        // studentServices.getStudent(user.account.id);
        // studentServices.studentObject.subscribe((student) => {
		//   if (student) {
		//   }
	    // });
    }
    else {
      console.log("Oh no!");
    }
  }
  render() {
	  if (this.state.isLoading) {
		  return (
			<Spin />
		  );
	  }
	  else {
		return (
		<>
			<Card
			style={{
				marginTop: 24,
			}}
			className="card-info"
			>
				<Row>
					<Col style={rowStyle} span={4}>
						<Avatar src={data.profile_picture} style={centerInRowStyle} size={128}></Avatar>
					</Col>
					<Col style={{marginLeft: 24, marginTop: 64}} span={17}>
						<Title level={3}>{data.name}</Title>
						<div>
							<MailOutlined />{" Email: " + data.email}
							<Divider type="vertical" />
							<PhoneOutlined />{" Phone: " + data.phone}
						</div>
						
					</Col>
					<Col style={{position: "relative"}}>
						<Button style={{position: "absolute", bottom: 0}} type="primary">Follow+</Button>
					</Col>
				</Row>
			</Card>

			<Card   
				className="card-info"       
				style={{
					marginTop: 24,
				}}>
				<Meta title={<Title level={3}>Mô tả</Title>}></Meta>
				<div style={{marginTop: 16}}>{data.description}</div>
				{/* <span styles={{marginTop: 100}}>{data.description}</span> */}
			</Card>

			<Card   
				className="card-info"       
				style={{
					marginTop: 24,
				}}>
					<Row>
						<Col style={{textAlign: "center"}} span={8}><Title level={4}>Sử dụng NodeJS</Title></Col>
						<Col  style={{textAlign: "center"}} span={8}><Title level={4}>Tỉ lệ apply thành công</Title></Col>
						<Col  style={{textAlign: "center"}} span={8}><Title level={4}>Đánh giá của chúng tôi</Title></Col>
					</Row>
					<Row justify="center" align="middle">
						<Col span={8} style={{textAlign: "center"}}>
							<Progress type="circle" percent={75} />
						</Col>
						{/* <Divider type="vertical"/> */}
						<Col span={8}>
							<Progress percent={30} status="exception" />
							<Progress percent={50} status="active" />
							<Progress percent={100} status="success" />
						</Col>
						{/* <Divider type="vertical"/> */}
						<Col span={8}>
							<Statistic
								title="Active"
								value={11.28}
								precision={2}
								valueStyle={{ color: '#3f8600' }}
								prefix={<LikeOutlined />}
				suffix="%"
				style={{textAlign: "center"}}
							/>
						</Col>
					</Row>
			</Card>

			<Card 
				className="card-info"         
				style={{
					marginTop: 24,
				}}>
				<Meta title={<Title level={3}>Việc làm</Title>}></Meta>
					<List
						grid={{gutter: 24, column: 2}}
						dataSource={jobs}
						renderItem={item => (
							<List.Item>
							<Card 
								style={{marginTop: 16 }}
								actions={[
								<SettingOutlined key="setting" />,
								<EditOutlined key="edit" />,
								]}
							>
								<Meta 
									avatar={<Avatar src="https://image.flaticon.com/icons/svg/3198/3198832.svg"></Avatar>}
									title={item.title}
									description={<div>
										<div>Yêu cầu: {item.seniority_level}</div>
										<div>Địa điểm: {item.seniority_level}</div>
										<div>Công việc: {item.seniority_level}</div>
									<List dataSource={item.skills} renderItem={skills => (<Tag>{skills}</Tag>)}></List>
									</div>}
								/>
							</Card>
							</List.Item>
						)}>
					</List>
			</Card>
			

			<Card        
				className="card-info"  
				style={{
					marginTop: 24,
				}}>
			<Carousel>
				<img src={pic1} style={{maxWidth: "100%", maxHeight: "100%"}}></img>
				<img  src={pic2} style={{maxWidth: "100%", maxHeight: "100%"}}></img>
			</Carousel>
			</Card>
		</>
		)}
	}
}
export { ProfileContent };