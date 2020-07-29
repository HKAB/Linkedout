import React from 'react'
import { Component } from 'react';
import {EditOutlined, DeleteOutlined, PlusOutlined, MinusCircleOutlined} from '@ant-design/icons';

import { Skeleton, Switch, Card, Button, Timeline, Form,Input, Space, DatePicker} from 'antd';
import Meta from 'antd/lib/card/Meta';

import { List, Avatar } from 'antd';
import Item from 'antd/lib/list/Item';
//import Form from 'antd/lib/form/Form';
import { ProfileChangeServices } from "@/services"
const { RangePicker } = DatePicker;
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

  const timeline_element = [];
  data_education.forEach(item => {
      timeline_element.push(<Timeline.Item key = {item.school_name} label={item.start_date + " - " + item.end_date}><div><b>{item.school_name}</b></div><div>{"Degree: " + item.degree}</div><div>{"Major: " + item.major}</div>
      <DeleteOutlined style={{color: "red"}} 
      onClick={() =>  {
        for (let id = 0; id < timeline_element.length;id++) {
            if (timeline_element[id].key == item.school_name) {
                console.log(item.school_name);
                timeline_element.splice(id,1);
                break;
            }
        }
        //console.log(timeline_element.length);
    } }/></Timeline.Item>);
  });

  const addExpFinish = values => {
		console.log(values);
		ProfileChangeServices.addexp(values.companyname, values.description, values.title, values.startdate, values.enddate).then()
		.then(() => {
			alert("Experiences added");
		//	history.go();
		})
		.catch(error => {
			alert(error);
		});
	}


class ProfileChange extends Component {
    state = {  
        tabPosition: 'left',
    };
    
    
    
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
                          <Button type="dashed" shape="circle" icon={<EditOutlined/>}/>
                            
                        </List.Item>
                    )}>
                    <Form name="add-exp" autoComplete="off" onFinish={addExpFinish}>
              <Form.List name="exp-info">
                {(fields, { add, remove }) => {
                  return (
                    <div>
                     {fields.map(field => (
                       <Space key={field.key} style={{ display: 'flex', marginBottom: 8, marginTop:8 }} align="start">
                          <Form.Item //name = "companyname"
                            {...field}
                            name={[field.name, 'companyname']}
                            fieldKey={[field.fieldKey, 'companyname']}
                            rules={[{ required: true, message: 'Missing company name' }]}
                          > 
                            
                            <Input placeholder="Company Name" />
                          </Form.Item>
                      
                          <Form.Item //name = "description"
                            {...field}
                            name={[field.name, 'description']}
                            fieldKey={[field.fieldKey, 'description']}
                            rules={[{ required: true, message: 'Missing Description' }]}
                          >
                            <Input placeholder="Description" />
                          </Form.Item>

                          <Form.Item //name = "title"
                            {...field}
                            name={[field.name, 'title']}
                            fieldKey={[field.fieldKey, 'title']}
                            rules={[{ required: true, message: 'Missing title' }]}
                          >
                            <Input placeholder="Title" />
                          </Form.Item>

                          <Form.Item //name = "startdate"
                            {...field}
                            name={[field.name, 'startdate']}
                            fieldKey={[field.fieldKey, 'startdate']}
                            rules={[{ required: true, message: 'Missing start date' }]}
                          >
                            <DatePicker placeholder = "Start date"/>
                          </Form.Item>

                          <Form.Item //name = "enddate"
                            {...field}
                            name={[field.name, 'enddate']}
                            fieldKey={[field.fieldKey, 'enddate']}
                            rules={[{ required: false }]}
                          >
                            <DatePicker placeholder = "End date"/>
                          </Form.Item>

                          <MinusCircleOutlined
                            onClick={() => {
                              remove(field.name);
                            }}
                          />
                        </Space>
                     ))}

                     <Form.Item>
                        <Button type="dashed" onClick={() => {add()}} block>
                          <PlusOutlined /> Add Experience
                        </Button>
                      </Form.Item>
                    </div>
                  );
                }}
              </Form.List>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
             </Form.Item>
            </Form>
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
            <Card style = {{marginTop: 24}}>
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
              <Button type="dashed" shape = "circle">
                    <PlusOutlined />
                </Button> 
            </Card>
            
            </>
         );
    }
}
 
export default ProfileChange;