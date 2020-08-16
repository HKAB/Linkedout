import { Avatar, Button, Card, Col, Input, Row, Space, Typography } from "antd";
import { BarChart, DonutChart } from "bizcharts";
import QueueAnim from "rc-queue-anim";
import OverPack from "rc-scroll-anim/lib/ScrollOverPack";
import React, { useState, useEffect } from "react";
import { accountServices } from "services";
import blacklivematter from "./assets/images/blacklivematter.svg";
import communication from "./assets/images/communication.svg";
import CV from "./assets/images/CV.svg";
import findjob from "./assets/images/findjob.svg";
import mancoding from "./assets/images/mancoding.svg";
import acer from "./assets/images/sponsor/acer.svg";
import canon from "./assets/images/sponsor/canon.svg";
import cisco from "./assets/images/sponsor/cisco.svg";
import samsung from "./assets/images/sponsor/samsung.svg";
import subscribemail from "./assets/images/subscribemail.svg";
import woman from "./assets/images/woman.svg";
import { HomeHeader } from "./HomeHeader";
import { getJobsBySkill, getPostsBySkill, getStudentsBySkill } from 'services';

import male from './assets/images/male.svg'
import female from './assets/images/female.svg'

const { Title } = Typography;

const data_comment = [
  {
    avatar: male,
    title: "Lê Đức Tùng",
    description:
      `Lab Member 001,<br/>
      The founder of this lab<br/>
      The seeker of chaos, the destroyer of this world's ruling structure...<br/>
      The mad scientist...<br/>
      Hououin... Kyouma!`,
  },

  {
    avatar: female,
    title: "Vũ Thị Dịu",
    description:
      "Life is short. Smile while you still have teeth. You 're magical",
  },

  {
    avatar: female,
    title: "Nguyễn Thị Thanh Bảo",
    description:
      "VY Canis Majoris (abbreviated to VY CMa) is an extreme oxygen-rich (O-rich) red hypergiant (RHG) or red supergiant (RSG) and pulsating variable star located at 1.2 kiloparsecs (3,900 ly) away from Earth in the constellation of Canis Major. It is one of the largest known stars by radius, and is also one of the most luminous and massive red supergiants, as well as one of the most luminous stars in the Milky Way",
  },

  {
    avatar: male,
    title: "Lê Trần Hải Tùng",
    description:
      "Tuỳ.",
  },

  {
    avatar: male,
    title: "Nguyễn Xuân Trường",
    description:
      "You are ill. I recommend suicide :v",
  },

  {
    avatar: male,
    title: "Nguyễn Phú Trường",
    description:
      `Individuals and interactions over processes and tools<br/>
      Working software over comprehensive documentation<br/>
      Customer collaboration over contract negotiation<br/>
      Responding to change over following a plan`,
  },
];

// shamelessly copy from so
function getRandom(arr, n) {
  var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
  if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

function Home({ history }) {
  const sponsor = [acer, canon, cisco, samsung];
  const [satisticJobsBySkillData, setSatisticJobsBySkillData] = useState([]);
  const [satisticPostsBySkillData, setSatisticPostsBySkillData] = useState([]);
  const [satisticStudentsBySkillData, setSatisticStudentsBySkillData] = useState([]);

  const show_comments = getRandom(data_comment, 3);


  const sponsor_children = sponsor.map((d, i) => (
    <QueueAnim
      component={Col}
      key={i}
      type="bottom"
      componentProps={{ span: 4, offset: 1 }}
    >
      <img src={d} width={"128"} height={"128"}></img>
    </QueueAnim>
  ));

  const comments = show_comments.map((d, i) => (
    <QueueAnim
      component={Col}
      key={i}
      type="bottom"
      componentProps={{ span: 6, offset: 1 }}
    >
      <Card style={{height: 250}}>
        <Card.Meta
          key={i}
          avatar={<Avatar src={d.avatar} />}
          title={d.title}
          description={(<div dangerouslySetInnerHTML={{__html: d.description}}></div>)}
        />
      </Card>
    </QueueAnim>
  ));
  
  useEffect(() => {
    getJobsBySkill()
    .then((data) => {
      setSatisticJobsBySkillData(data);
    });

    getPostsBySkill()
    .then((data) => {
      setSatisticPostsBySkillData(data);
    });

    getStudentsBySkill()
    .then((data) => {
      setSatisticStudentsBySkillData(data);
    });

  }, [])

  const user = accountServices.userValue;
  return (
    <>
      <HomeHeader></HomeHeader>

      <Card bordered={false}>
        <div
          style={{
            backgroundColor: "#1890ff",
            position: "relative",
            minWidth: "80vw",
            minHeight: "80vh",
          }}
        >
          {/* <img src={banner} width="100%" height="100%"></img> */}
          {/* <Row> */}
          <QueueAnim key="content" component={Row}>
            <QueueAnim
              delay={300}
              component={Col}
              key="col1"
              componentProps={{
                span: 10,
                offset: 1,
                style: { position: "relative" },
              }}
              type="left"
            >
              <img
                key="woman"
                src={woman}
                width="100%"
                style={{ position: "absolute", top: "10vh" }}
              ></img>
            </QueueAnim>
            <QueueAnim
              type="right"
              key="col2"
              component={Col}
              delay={300}
              ease="easeOutQuart"
              componentProps={{ key: "2", span: 11, offset: 1 }}
            >
              <div
                className="banner-content"
                style={{ marginTop: "10vh " }}
              >
                <div
                  key="demo1"
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: 60,
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  CREATE AMAZING CV.
								</div>
                <div
                  key="demo2"
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: 60,
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  FIND YOUR PARTNER.
								</div>
                <div
                  key="demo3"
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: 30,
                    color: "white",
                  }}
                >
                  Individuals and interactions over processes
                  and tools Working software over
                  comprehensive documentation Customer
                  collaboration over contract negotiation
                  Responding to change over following a plan
								</div>
                <Button
                  key="demo4"
                  type="primary"
                  danger
                  size="large"
                  style={{
                    float: "right",
                    // marginRight: 128,
                    marginTop: 32,
                    fontSize: 30,
                    height: 64,
                    textAlign: "center",
                    verticalAlign: "middle",
                    padding: "10px"
                  }}
                  href="https://youtu.be/dQw4w9WgXcQ"
                >
                  Get started now!
								</Button>
              </div>
            </QueueAnim>
            <QueueAnim
              key="col3"
              component={Col}
              componentProps={{ key: "3", span: 1 }}
            ></QueueAnim>
          </QueueAnim>
        </div>
      </Card>

      <Card bordered={false}>
        <div style={{ height: "20vh" }}>
          <OverPack className="home-layout" playScale={0.1}>
            <div
              style={{
                width: "100%",
                textAlign: "center",
                fontFamily: "sans-serif",
                fontSize: 20,
                fontWeight: "bold",
                marginTop: 64,
              }}
            >
              THEY TRUST US
						</div>
            {/* <Row justify="center" align="middle"> */}
            <QueueAnim
              delay={300}
              key="sponsor-content"
              component={Row}
              type="bottom"
              componentProps={{
                justify: "center",
                align: "middle",
              }}
            >
              {sponsor_children}
              {/* <Col key="c1" span={5} offset={2}><img src={acer}  width={"128"} height={"128"}></img></Col>
						<Col key="c2"  span={4} offset={1}><img src={canon}   width={"128"} height={"128"} ></img></Col>
						<Col key="c3" span={4} offset={1}><img src={cisco}   width={"128"} height={"128"} ></img></Col>
						<Col key="c4" span={5} offset={2}><img src={samsung}   width={"128"} height={"128"} ></img></Col> */}
            </QueueAnim>
            {/* </Row> */}
          </OverPack>
        </div>
      </Card>

      <Card bordered={false}>
        <QueueAnim delay={300}>
          <OverPack playScale={0.4}>
            <div
              key="banner2"
              style={{
                backgroundColor: "#bdc3c7",
                position: "relative",
                minWidth: "80vw",
                minHeight: "80vh",
              }}
            >
              <Row>
                <Col span={10} offset={1}>
                  <QueueAnim delay={50}>
                    <img
                      key="img_mancoding"
                      src={mancoding}
                      style={{
                        height: "60vh",
                        marginTop: "10vh",
                      }}
                    ></img>
                  </QueueAnim>
                </Col>
                <Col span={11} offset={1}>
                  <div
                    className="banner-content"
                    style={{ marginTop: "15vh " }}
                  >
                    <QueueAnim delay={50}>
                      <div
                        key="header"
                        style={{
                          fontFamily: "sans-serif",
                          fontSize: 30,
                          fontWeight: "bold",
                        }}
                      >
                        We developed useful feature for
                        you
											</div>
                    </QueueAnim>
                    <Row style={{ marginTop: 64 }}>
                      <Col span={12}>
                        <Space>
                          <QueueAnim delay={300} type="top">
                            <img
                              key="img_communication"
                              src={CV}
                              style={{
                                height: "64",
                                width: "64",
                              }}
                            ></img>
                            <span
                              key="title"
                              style={{
                                fontFamily:
                                  "sans-serif",
                                fontSize: 20,
                              }}
                            >
                              Build your CV
														</span>
                          </QueueAnim>
                        </Space>
                      </Col>
                      <Col span={12}>
                        <Space>
                          <QueueAnim delay={300} type="top">
                            <img
                              key="img_findjob"
                              src={findjob}
                              style={{
                                height: "64",
                                width: "64",
                              }}
                            ></img>
                            <span
                              key="title"
                              style={{
                                fontFamily:
                                  "sans-serif",
                                fontSize: 20,
                              }}
                            >
                              Find a job
														</span>
                          </QueueAnim>
                        </Space>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: 64 }}>
                      <Col span={12}>
                        <Space>
                          <QueueAnim delay={300} type="bottom">
                            <img
                              key="img_communication"
                              src={communication}
                              style={{
                                height: "64",
                                width: "64",
                              }}
                            ></img>
                            <span
                              key="title"
                              style={{
                                fontFamily:
                                  "sans-serif",
                                fontSize: 20,
                              }}
                            >
                              Connect to company
														</span>
                          </QueueAnim>
                        </Space>
                      </Col>
                      <Col span={12}>
                        <Space>
                          <QueueAnim delay={300} type="bottom">
                            <img
                              key="img_blacklivematter"
                              src={
                                blacklivematter
                              }
                              style={{
                                height: "64",
                                width: "64",
                              }}
                            ></img>
                            <span
                              key="title"
                              style={{
                                fontFamily:
                                  "sans-serif",
                                fontSize: 20,
                              }}
                            >
                              Find your partner
														</span>
                          </QueueAnim>
                        </Space>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col span={1}></Col>
              </Row>
            </div>
          </OverPack>
        </QueueAnim>
      </Card>

      <Card key="statistic" bordered={false}>
        <QueueAnim delay={300}>
          <OverPack playScale={0.4}>
            <div style={{ minHeight: "50vh" }}>
              <div
                key="chart"
                style={{
                  width: "100%",
                  textAlign: "center",
                  fontFamily: "sans-serif",
                  fontSize: 20,
                  fontWeight: "bold",
                  marginTop: 64,
                }}
              >
                Thống kê kỹ năng
							</div>

              <Row>
                <Col span={8}>
                  <div>
                  
                    <DonutChart
                      key="donut"
                      data={satisticJobsBySkillData}
                      // highlight-end
                      angleField="count"
                      colorField="name"
                      legend={{
                        position: "left-center",
                      }}
                      statistic={{
                        totalLabel: "Tổng",
                      }}
                    />
                  </div>
                </Col>

                <Col span={8}>
                  <div>
                    
                    <DonutChart
                      key="donut"
                      data={satisticPostsBySkillData}
                      // highlight-end
                      angleField="count"
                      colorField="name"
                      legend={{
                        position: "left-center",
                      }}
                      statistic={{
                        totalLabel: "Tổng",
                      }}
                    />
                    
                  </div>
                </Col>

                <Col span={8}>
                  <div>
                    
                    <DonutChart
                      key="donut"
                      data={satisticStudentsBySkillData}
                      // highlight-end
                      angleField="count"
                      colorField="name"
                      legend={{
                        position: "left-center",
                      }}
                      statistic={{
                        totalLabel: "Tổng",
                      }}
                    />
                    
                  </div>
                </Col>
              </Row>
              <Row >
                <Col span={8} style={{textAlign: "center"}}><Title level={3}>Công việc</Title></Col>
                <Col span={8} style={{textAlign: "center"}}><Title level={3}>Tuyển dụng</Title></Col>
                <Col span={8} style={{textAlign: "center"}}><Title level={3}>Sinh viên</Title></Col>
              </Row>
            </div>
          </OverPack>
        </QueueAnim>
      </Card>

      <Card bordered={false}>
        <QueueAnim delay={300}>
          <OverPack playScale={0.5}>
            <div
              key="banner"
              style={{
                backgroundColor: "#bdc3c7",
                minWidth: "80vw",
                minHeight: "50vh",
              }}
            >
              <QueueAnim
                key="content"
                component={Row}
                type="bottom"
                componentProps={{
                  align: "middle",
                  // justify: "center",
                  style: { height: "40vh" },
                }}
              >
                <div
                  style={{
                    width: "100%",
                    textAlign: "center",
                    fontFamily: "sans-serif",
                    fontSize: 20,
                    fontWeight: "bold",
                    // marginTop: 16,
                  }}
                >
                  WHAT THEY THINK ABOUT US
								</div>
                <Col span={1}></Col>
                {comments}
                <Col span={1}></Col>
              </QueueAnim>
            </div>
          </OverPack>
        </QueueAnim>
      </Card>

      {/* <OverPack playScale={0.5}> */}
      <Card bordered={false}>
        <QueueAnim delay={300}>
          <OverPack playScale={0.2}>
            <div style={{ minHeight: "30vh" }}>
              <QueueAnim delay={300}>
                <div
                  key="title"
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: 40,
                    marginTop: 16,
                    marginLeft: "10vw",
                  }}
                >
                  Not ready to get start?
					</div>
              </QueueAnim>
              <Row style={{ marginTop: "10vh" }}>
                <Col
                  span={10}
                  offset={7}
                  style={{ textAlign: "center" }}
                >
                  <QueueAnim delay={300}>
                    <Input
                      key="input"
                      size="large"
                      placeholder="Your email here!"
                    ></Input>
                    <Button
                      key="button"
                      style={{ marginTop: 32 }}
                      type="primary"
                      shape="round"
                      size="large"
                    >
                      Spam me
								</Button>
                  </QueueAnim>
                </Col>
              </Row>
            </div>

          </OverPack>
        </QueueAnim>
      </Card>
      <img key="image" src={subscribemail} style={{ width: "100vw" }}></img>
    </>
  );
}

export { Home };
