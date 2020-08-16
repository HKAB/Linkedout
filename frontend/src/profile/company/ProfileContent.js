import { CheckOutlined, MailTwoTone, PhoneTwoTone, PlusOutlined, ProfileTwoTone } from '@ant-design/icons';
import { Avatar, Button, Card, Carousel, Col, Divider, Empty, List, message, Modal, Progress, Row, Space, Spin, Statistic, Tag, Typography } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { accountServices, companyServices } from "services";
import { Config } from "../../config/consts";
import { followService } from '../../services/follow.service';
import '../assets/css/profile.css';
import pic1 from '../assets/images/abc.jpg';
import pic2 from '../assets/images/xyz.jpg';
import protest from '../assets/images/protest.svg'

const { Title, Text } = Typography;

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
  const [followed, setFollowed] = useState(false);
  const [followButtonVisible, setFollowButtonVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [jobDetail, setJobDetail] = useState([]);
  const [jobDetailVisible, setJobDetailVisible] = useState(false);
  const [followCount, setFollowCount] = useState(0);
  const [middleChartData, setMiddleChartData] = useState([0, 0, 0]);
  const [leftChartData, setLeftChartData] = useState({ name: "", percent: 0 });

  const fetchFollowCount = async (id) => {
    let response = await followService.count(id);
    setFollowCount(response.count);
  }

  const updateFollow = async () => {
    const result = await followService.check(props.id);
    setFollowed(result.followed);
  }

  const doFollow = async () => {
    await followService.follow(props.id);
  }

  const doUnFollow = async () => {
    await followService.unfollow(props.id);
  }

  useEffect(() => {
    let data = { name: "", percent: 0 };
    let skillCount = { "": 0 };
    let maxSkill = "";
    listJobData.forEach((item) => {
      if (item.skills) {
        item.skills.forEach((s) => {
          skillCount[s] = (skillCount[s] || 0) + 1
          if (skillCount[s] > skillCount[maxSkill]) maxSkill = s;
        });
      }
    });
    data = { name: maxSkill, percent: (skillCount[maxSkill] * 100 / listJobData.length) | 0 }
    setLeftChartData(data); // some magik stuff to convert float to int
  }, [listJobData])

  useEffect(() => {
    let data = [0, 0, 0];
    listJobData.forEach((item) => {
      if (item.seniority_level === "Junior") data[0]++;
      else if (item.seniority_level === "MidLevel") data[1]++;
      else if (item.seniority_level === "Senior") data[2]++;
      setMiddleChartData(data);
    });
  }, [listJobData]);

  useEffect(() => {
    setIsLoading(true);
    let user = accountServices.userValue;
    if (user) {
      var viewCompanyId = user.account.id;
      if (props.id) { // student viewing company
        viewCompanyId = props.id;
        setFollowButtonVisible(true);
        updateFollow();
      }
      companyServices.getCompany(viewCompanyId).then(() => {
        setIsLoading(false);
      })
        .catch(() => {
          setIsLoading(true);
          message.error("Please enter basic information!")
          history.push("/create-profile")
        });
      const subscription = companyServices.companyObject.subscribe((company) => {
        if (company) {
          setBasicProfileData(company.basic_data);
          setEmailData(company.email);
          setPhoneData(company.phone);
          setListJobData(company.job);
        }
      });

      fetchFollowCount(viewCompanyId);

      return () => {
        subscription.unsubscribe();
      }
    }
    else {
      message.error("You need to login!");
      history.push("/login");
    }
  }, []);

  const handleFollow = () => {
    if (followed) doUnFollow();
    else doFollow();
    setFollowed(!followed);
  }

  const showJobDetailModal = () => {
    setJobDetailVisible(true);
  };

  const handleJobDetailCancel = (e) => {
    setJobDetailVisible(false);
  };

  const onShowJobDetail = (values) => {
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
          <Row type="flex" align="middle">
            <Col style={rowStyle} span={4}>
              <Avatar src={Config.backendUrl + basicProfileData.profile_picture} style={centerInRowStyle} size={128}></Avatar>
            </Col>
            <Col style={{ marginLeft: 24, marginTop: 16 }} span={16}>
              <Title level={3}>{basicProfileData.name}</Title>
              <Space><Text strong>{basicProfileData.specialties.slice(0, 3).join(', ')}</Text></Space>
              <div><ProfileTwoTone /> Website: <a href={basicProfileData.website}>{basicProfileData.website}</a> </div>
              <div>
                <MailTwoTone />{" Email: " + (emailData.length > 0 ? emailData[0] : "")}
                <Divider type="vertical" />
                <PhoneTwoTone />{" Phone: " + (phoneData.length > 0 ? phoneData[0] : "")}
              </div>

            </Col>
            <Col style={{ verticalAlign: "middle", justifyContent: "center" }}>
              <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>
                {followButtonVisible &&
                  <Button
                    type={!followed ? "primary" : "default"}
                    style={{ padding: 0, textAlign: "center", width: 100, display: 'inline-block', verticalAlign: 'middle' }}
                    onClick={handleFollow}>{!followed ? <div><PlusOutlined /> Follow</div> : <div><CheckOutlined /> Followed</div>}
                  </Button>
                }
              </div>
            </Col>
          </Row>
        </Card>

        <Card
          className="card-info"
          style={{
            marginTop: 24,
          }}>
          <Meta title={<Title level={3}>Description</Title>}></Meta>
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
            <Col style={{ textAlign: "center" }} span={8}><Title level={4}>Skill {leftChartData.name}</Title></Col>
            <Col style={{ textAlign: "center" }} span={8}><Title level={4}>Seniority level</Title></Col>
            <Col style={{ textAlign: "center" }} span={8}><Title level={4}>Followers</Title></Col>
          </Row>
          <Row justify="center" align="middle">
            <Col span={8} style={{ textAlign: "center" }}>
              <Progress type="circle" percent={leftChartData.percent} />
            </Col>
            {/* <Divider type="vertical"/> */}
            <Col span={8}>
              Junior<Progress percent={middleChartData[0] * 100 / listJobData.length} status="success" showInfo={false} />
              Mid Level<Progress percent={middleChartData[1] * 100 / listJobData.length} status="active" showInfo={false} />
              Senior<Progress percent={middleChartData[2] * 100 / listJobData.length} status="exception" showInfo={false} />
            </Col>
            {/* <Divider type="vertical"/> */}
            <Col span={8}>
              <Statistic
                title="followers"
                value={followCount}
                precision={0}
                valueStyle={{ color: '#3f8600' }}
                style={{ textAlign: "center", fontSize: 24 }}
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
          <Meta title={<Title level={3}>Job</Title>}></Meta>
          <List
            pagination={{pageSize: 4}}
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
                    avatar={<Avatar src={protest}></Avatar>}
                    title={item.title}
                    description={<Space direction="vertical" size={3}>
                      <div>Seniority Level: {item.seniority_level}</div>
                      <div>Cities: {item.cities.join(', ')}</div>
                      <div>Employment type: {item.employment_type}</div>
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
          title="Job"
          visible={jobDetailVisible}
          onCancel={handleJobDetailCancel}
          footer={null}
        >
          <List grid={{ gutter: 24, column: 2 }}>
            <List.Item>
              <Meta
                avatar={<Avatar src={protest}></Avatar>}
                title={jobDetail.title}
                description={<Space direction="vertical" size={3}>
                  <div>Seniority Level: {jobDetail.seniority_level}</div>
                  <div>Cities: <Space><List dataSource={jobDetail.cities} renderItem={city => (city)}></List></Space></div>
                  <div>Employment type: {jobDetail.employment_type}</div>
                  <div>Description: {jobDetail.description}</div>
                  <div style={{ display: 'flex' }}>
                    <div>Skills: </div>
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