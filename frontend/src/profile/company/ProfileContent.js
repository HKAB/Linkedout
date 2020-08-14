import { LikeOutlined, MailTwoTone, PhoneTwoTone, ProfileTwoTone } from '@ant-design/icons';
import { Avatar, Button, Card, Carousel, Col, Divider, Empty, Layout, List, message, Modal, Progress, Row, Space, Spin, Statistic, Tag, Typography } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { accountServices, companyServices } from "services";
import '../assets/css/profile.css';
import pic1 from '../assets/images/abc.jpg';
import pic2 from '../assets/images/xyz.jpg';
import {Config} from '../../config/consts.js'
const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;
const backendUrl = Config.backendUrl;
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

function ProfileContent(props) {
  let history = useHistory();
  const [basicProfileData, setBasicProfileData] = useState([]);
  const [phoneData, setPhoneData] = useState([]);
  const [emailData, setEmailData] = useState([]);
  const [listJobData, setListJobData] = useState([<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />]);
  const [isLoading, setIsLoading] = useState(true);
  const [jobDetail, setJobDetail] = useState([]);
  const [jobDetailVisible, setJobDetailVisible] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    let user = accountServices.userValue;
    if (user) {
      var viewCompanyId = user.account.id;
      if (props.id) {
        viewCompanyId = props.id;
      }
      companyServices.getCompany(viewCompanyId).then(() => {
        setIsLoading(false);
      })
        .catch(() => {
          setIsLoading(true);
        });
      const subscription = companyServices.companyObject.subscribe((company) => {
        if (company) {
          console.log(company);
          setBasicProfileData(company.basic_data);
          setEmailData(company.email);
          setPhoneData(company.phone);
          setListJobData(company.job);
        }
      });

      return () => {
        subscription.unsubscribe();
      }
    }
    else {
      message.error("You need to login!");
      history.push("/login");
    }
  }, []);

  const showJobDetailModal = () => {
    setJobDetailVisible(true);
  };

  const handleJobDetailCancel = (e) => {
    setJobDetailVisible(false);
  };

  const onShowJobDetail = (values) => {
    console.log(values);
    setJobDetail(values);
    showJobDetailModal();
  };

  if (isLoading) {
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
              <Avatar src={backendUrl+basicProfileData.profile_picture} style={centerInRowStyle} size={128}></Avatar>
            </Col>
            <Col style={{ marginLeft: 24, marginTop: 16 }} span={17}>
              <Title level={3}>{basicProfileData.name}</Title>
              <Space><Text strong>{basicProfileData.specialties.slice(0, 3).join(', ')}</Text></Space>
              <div><ProfileTwoTone /> Website: <a href={basicProfileData.website}>{basicProfileData.website}</a> </div>
              <div>
                <MailTwoTone />{" Email: " + (emailData.length > 0 ? emailData[0] : "")}
                <Divider type="vertical" />
                <PhoneTwoTone />{" Phone: " + (phoneData.length > 0 ? phoneData[0] : "")}
              </div>

            </Col>
            <Col style={{ position: "relative" }}>
              <Button style={{ position: "absolute", bottom: 0 }} type="primary">Follow+</Button>
            </Col>
          </Row>
        </Card>

        <Card
          className="card-info"
          style={{
            marginTop: 24,
          }}>
          <Meta title={<Title level={3}>Mô tả</Title>}></Meta>
          {/* <div style={{ marginTop: 16 }}>{basicProfileData.description}</div> */}
          <div style={{ marginTop: 16, overflowWrap: 'break-word', overflow: 'hidden' }} dangerouslySetInnerHTML={{ __html: basicProfileData.description }}></div>
          {/* <span styles={{marginTop: 100}}>{data.description}</span> */}
        </Card>

        <Card
          className="card-info"
          style={{
            marginTop: 24,
          }}>
          <Row>
            <Col style={{ textAlign: "center" }} span={8}><Title level={4}>Sử dụng NodeJS</Title></Col>
            <Col style={{ textAlign: "center" }} span={8}><Title level={4}>Tỉ lệ apply thành công</Title></Col>
            <Col style={{ textAlign: "center" }} span={8}><Title level={4}>Đánh giá của chúng tôi</Title></Col>
          </Row>
          <Row justify="center" align="middle">
            <Col span={8} style={{ textAlign: "center" }}>
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
                style={{ textAlign: "center" }}
              />
            </Col>
          </Row>
        </Card>

        <Card
          className="card-info"
          style={{
            marginTop: 24,
            padding: 24
          }}>
          <Meta title={<Title level={3}>Việc làm</Title>}></Meta>
          <List
            grid={{ gutter: 24, column: 2 }}
            dataSource={listJobData}
            renderItem={item => (
              <List.Item>
                <Card
                  hoverable
                  key={item.id}
                  style={{ marginTop: 16 }}
                  onClick={() => onShowJobDetail(item)}
                >
                  <Meta
                    avatar={<Avatar src="https://image.flaticon.com/icons/svg/3198/3198832.svg"></Avatar>}
                    title={item.title}
                    description={<Space direction="vertical" size={3}>
                      <div>Mức độ: {item.seniority_level}</div>
                      <div>Địa điểm: {item.cities.join(', ')}</div>
                      <div>Công việc: {item.employment_type}</div>
                      <List dataSource={item.skills} renderItem={skills => (<Tag style={{ margin: 3 }}>{skills}</Tag>)}></List>
                    </Space>}
                  />
                </Card>
              </List.Item>
            )}>
          </List>
        </Card>

        <Modal
          forceRender
          title="Việc làm"
          visible={jobDetailVisible}
          onCancel={handleJobDetailCancel}
          footer={null}
        >
          <List grid={{ gutter: 24, column: 2 }}>
            <List.Item>
              <Meta
                avatar={<Avatar src="https://image.flaticon.com/icons/svg/3198/3198832.svg"></Avatar>}
                title={jobDetail.title}
                description={<Space direction="vertical" size={3}>
                  <div>Yêu cầu: {jobDetail.seniority_level}</div>
                  <div>Địa điểm: <Space><List dataSource={jobDetail.cities} renderItem={city => (city)}></List></Space></div>
                  <div>Công việc: {jobDetail.employment_type}</div>
                  <div>Mô tả: {jobDetail.description}</div>
                  <div style={{ display: 'flex' }}>
                    <div>Kỹ năng: </div>
                    <List dataSource={jobDetail.skills} renderItem={skills => (<Tag style={{ margin: 3 }}>{skills}</Tag>)}></List>
                  </div>
                </Space>}
              />
            </List.Item>
          </List>
        </Modal>

        <Card
          className="card-info"
          style={{
            marginTop: 24,
          }}>
          <Carousel>
            <img src={pic1} style={{ maxWidth: "100%", maxHeight: "100%" }}></img>
            <img src={pic2} style={{ maxWidth: "100%", maxHeight: "100%" }}></img>
          </Carousel>
        </Card>
      </>
    )
  }
}
export default ProfileContent;