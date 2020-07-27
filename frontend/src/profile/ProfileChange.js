import React from 'react'
import { Component } from 'react';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';

import { Skeleton, Switch, Card, Button, Timeline } from 'antd';
import Meta from 'antd/lib/card/Meta';

import { List, Avatar } from 'antd';
import Item from 'antd/lib/list/Item';

const data_experiences = [
    {
        avatar: 'https://image.flaticon.com/icons/svg/508/508123.svg',
        companyName: 'Facebook',
        title: 'CEO',
        time: 'Apr 2013 - Feb 2019',
        description: 'Working here is an amazing opportunity!'
    },
    {
        avatar: 'https://image.flaticon.com/icons/svg/2965/2965278.svg',
        companyName: 'Google',
        title: 'CEO',
        time: 'Apr 2013 - Feb 2019',
        description: 'Working here is an amazing opportunity!'
    },
    {
        avatar: 'https://image.flaticon.com/icons/svg/870/870910.svg',
        companyName: 'Netflix',
        title: 'CEO',
        time: 'Apr 2013 - Feb 2019',
        description: 'Working here is an amazing opportunity!'
    },
    {
        avatar: 'https://image.flaticon.com/icons/svg/888/888870.svg',
        companyName: 'Paypal',
        title: 'CEO',
        time: 'Apr 2013 - Feb 2019',
        description: 'Working here is an amazing opportunity!'
    },
  ];

  const data_education = [
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
  data_education.forEach(item => {
      timeline_element.push(<Timeline.Item label={item.start_date + " - " + item.end_date}><div><b>{item.school_name}</b></div><div>{"Degree: " + item.degree}</div><div>{"Major: " + item.major}</div><DeleteOutlined style={{color: "red"}}/></Timeline.Item>);
  });

class ProfileChange extends Component {
    state = {  
        tabPosition: 'left'
    }
    
    render() { 
        return ( 
            <>
            <Card style={{marginTop: 24}}>
                <Meta title="Experiences"></Meta>
                <List
                style={{marginTop: 24}}
                    itemLayout="horizontal"
                    dataSource={ data_experiences }
                    renderItem= {item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar}></Avatar>}
                                title={item.companyName}
                                description={item.description}
                            />
                            
                            <Meta
                                title="Title"
                                description={item.title}
                                style={{marginRight: 48}}
                            />
                            <Meta
                                title="Working time"
                                description={item.time}
                                style={{marginRight: 48}}
                            />
                            <Button type="dashed" shape="circle" icon={<EditOutlined/>} />
                        </List.Item>
                    )}>
                </List>
            </Card>

            <Card style={{marginTop: 24}}>
                <Meta title="Education" ></Meta>
                <Timeline mode="left" style={{marginTop: 24}}>
                    {timeline_element}
                    {/* <Timeline.Item label="2015-09-01 09:12:11">Solve initial network problems</Timeline.Item>
                    <Timeline.Item>Technical testing</Timeline.Item>
                    <Timeline.Item label="2015-09-01 09:12:11">Network problems being solved</Timeline.Item> */}
                </Timeline>
            </Card>
            </>
         );
    }
}
 
export default ProfileChange;