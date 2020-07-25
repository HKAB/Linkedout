import React from 'react'
import { Component } from 'react';
import { Layout, Avatar, Descriptions, Card, Timeline, Row, Col, List } from 'antd';

import './assets/css/profileContent.css';
import Column from 'antd/lib/table/Column';
import { AlignCenterOutlined, RedEnvelopeFilled } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const data = {
  avatar:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  name:'Nguyen Phu Truong',
  quotes:'No pain, no fucking hospital bill',
  email:'nguyenphutruong2707@gmail.com',
  phone:'0981285376',
  DoB:'27/07/2000',
};
const exp_data = [
{
  avatar:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  title_href:'https://ant.design',
  title: 'Ant',
  ex_pos: 'Founder, dev, tester',
  date: 'June 1997 - Present',
},
{
  avatar:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  title_href:'https://ant.design',
  title: 'Facebook',
  ex_pos: 'dev',
  date: 'January 1998 - Present',
},
{
  avatar:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  title_href:'https://ant.design',
  title: 'Git',
  ex_pos: 'dev, tester',
  date: 'November 1999 - Present',
},
];
const follow_data = [
{
  avatar:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  title_href:'https://ant.design',
  title: 'Apple',
},
{
  avatar:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  title_href:'https://ant.design',
  title: 'Google',
},
{
  avatar:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  title_href:'https://ant.design',
  title: 'UET',
},
{
  avatar:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  title_href:'https://ant.design',
  title: 'Vin AI',
},
{
  avatar:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  title_href:'https://ant.design',
  title: 'Sony',
},
];
const skill_data = [
  {
    avatar:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    title_href:'https://ant.design',
    title: 'C++',
  },
  {
    avatar:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    title_href:'https://ant.design',
    title: 'SE',
  },
  {
    avatar:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    title_href:'https://ant.design',
    title: 'Python',
  },
  {
    avatar:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    title_href:'https://ant.design',
    title: 'Java',
  },
  {
    avatar:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    title_href:'https://ant.design',
    title: 'PHP',
  },
  ];
class ProfileContent extends Component {
  render(){
    return(
        <>
        <Card
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 300,
            marginTop: 24,
          }}
        >
          <Avatar size ={104} style = {{left:445}} src={data.avatar}></Avatar>
          <Layout className = "user-description">
            <div className = "user-fullname">{data.name}</div> 
            <div classname = "user-quotes">{data.quotes}</div>
            <Descriptions style = {{marginTop:24}}>
              <Descriptions.Item label="Email:">{data.email}</Descriptions.Item>
              <Descriptions.Item label="Phone:">{data.phone}</Descriptions.Item>
              <Descriptions.Item label="DoB">{data.DoB}</Descriptions.Item>
            </Descriptions>
          </Layout>
        </Card>
        <Row gutter={[24, 24]} style = {{marginTop:24}}>
            <Col span={12}>
              <Card title = "Education">
                <Timeline mode = 'left'>
                  <Timeline.Item label = '2015-09-01'>Create a services site </Timeline.Item>
                  <Timeline.Item label = '2015-09-01'>Solve initial network problems</Timeline.Item>
                  <Timeline.Item label = '2015-09-01'>Technical testing</Timeline.Item>
                  <Timeline.Item label = '2015-09-01'>Network problems being solved</Timeline.Item>
                </Timeline>
              </Card>
            </Col>
            <Col span={12}>
              <Card title = "Experiences" bordered = {false}>
                <List 
                  itemLayout= "vertical"
                  dataSource={exp_data}
                  renderItem={item =>(
                    <List.Item>
                      <Avatar src = {item.avatar} size="large"/>
                      <a href = {item.title_href} style ={{marginLeft:10}}>{item.title}</a>                        
                      <div style={{marginLeft:50, fontWeight:500}}>
                        {item.ex_pos} <br/> 
                        {item.date}
                      </div>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
        </Row>
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <Card title = "Following">
              <List grid = {{column:2}}
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
          <Col span = {12}>
            <Card title = "Skill">
              <List grid = {{column:2}}
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