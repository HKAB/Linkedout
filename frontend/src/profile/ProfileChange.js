import React from 'react'
import { Component } from 'react';
import {EditOutlined, DeleteOutlined, PlusOutlined, MinusCircleOutlined} from '@ant-design/icons';

import { Skeleton, Switch, Card, Button, Timeline, Form,Input, Space, DatePicker, Modal} from 'antd';
import Meta from 'antd/lib/card/Meta';

import { List, Avatar } from 'antd';

import { studentServices } from "@/services"
import { accountServices } from "@/services"
import dayjs from 'dayjs';
	
  const onAddExperienceFinish = values => {
		console.log(values.experience_info[0].start_date.format('D MMMM YYYY'));
		studentServices.createStudentExperience(
			values.experience_info[0].company_name,
			values.experience_info[0].start_date.format('YYYY-MM-DD'),
			values.experience_info[0].end_date.format('YYYY-MM-DD'),
			values.experience_info[0].title,
			values.experience_info[0].description)
		.then(() => {
			studentServices.getStudent(accountServices.userValue.account.id);
			alert('done!');
		})
		.catch(error => {
			console.log(error);
			alert(error);
		});
	}

class ProfileChange extends Component {

	constructor(props) {
		super(props);
		this.modalRef = React.createRef();
		this.state = {
		  experience_data: [],
		  education_data: {},
		  education_element: [],
		  skill_data: [],
		  //for modal
		  visible: false,
		  selected_experience_item: {},
		}
	  }
	
	formRef = React.createRef();
	
	// handle modal
	showModal = () => {
		this.setState({visible: true});
	}

	onSaveExperience = fieldsValue => {
		console.log(fieldsValue);
		// TODO: handle request here!!
		this.setState({visible: false});
	}

	handleCancel = e => {
		this.setState({visible: false});
	}

	// modify experience list item 
	onModify(item) {
		console.log(item);
		this.showModal();
		this.setState({selected_experience_item: item})
  }
	  
	  componentDidMount() {
		studentServices.studentObject.subscribe((student) => {
			if (student)
			{
				console.log("updateee");
				this.setState({experience_data: student.experience});
				this.setState({education_data: student.education});
				this.setState({skill_data: student.skill});

				var timeline_element = []

				student.education.forEach(item => {
					timeline_element.push(<Timeline.Item key = {item.school_name} label={item.start_date + " - " + item.end_date}><div><b>{item.school_name}</b></div><div>{"Degree: " + item.degree}</div><div>{"Major: " + item.major}</div>
					<DeleteOutlined style={{color: "red"}} 
					onClick={() =>  {
					for (let id = 0; id < timeline_element.length;id++) {
						if (timeline_element[id].key == item.school_name) {
							console.log(item.school_name);
							timeline_element.splice(id, 1);
							break;
						}
					}
					//console.log(timeline_element.length);
				} }/></Timeline.Item>);
				});
				this.setState({education_element: timeline_element});
			}
		});
  }
  
    
    
    render() { 
        return ( 
            <>

		<Modal
			title="Đổi thông tin"
			visible={this.state.visible} 
			onCancel={this.handleCancel}
			footer={[
				<Button type="primary" key="submit" form="experience-edit" htmlType="submit">
					Save
				</Button>
			]}
			>
				<Form id="experience-edit"
					labelCol={{span: 6}} 
					wrapperCol={{span: 18}} 
					onFinish={this.onSaveExperience}
					>
				<Form.Item defaultValue="abc" label="Company" name="company_name" rules={[{ required: true, message: "Company name is required!" }]}>
					<Input value="damn"/>
				</Form.Item>
				<Form.Item label="Title" name="title" rules={[{ required: true, message: "Title name is required!" }]}>
					<Input defaultValue={this.state.selected_experience_item.title}/>
				</Form.Item>
				<Form.Item label="Time" rules={[{ required: true, message: "Time is required!"}]}>
					<Form.Item name="start-date" style={{ display: 'inline-block'}} >
						<DatePicker placeholder="Start date" />
					</Form.Item>
					<Form.Item name="end-date" style={{ display: 'inline-block', marginLeft: 8}}>
						<DatePicker placeholder="End date"  />
					</Form.Item>
				</Form.Item>

				<Form.Item label="Description" name="description">
					<Input defaultValue={this.state.selected_experience_item.description} />
				</Form.Item>

				</Form>
        </Modal>

            <Card style={{marginTop: 24}}>
                <Meta title="Experiences"></Meta>
                <List
                style={{marginTop: 24}}
                    itemLayout="horizontal"
                    dataSource={ this.state.experience_data }
                    renderItem= {item => (
                        <List.Item key={item}>
                            <List.Item.Meta
                                avatar={<Avatar src={"http://127.0.0.1:8000" + item.profile_picture}></Avatar>}
                                title={item.company_name}
                                description={item.description}
                            />
                            
                            <Meta
                                title="Title"
                                description={item.title}
                                style={{marginRight: 48, textAlign: "right"}}
                            />
                            <Meta
                                title="Working time"
                                description={item.start_date + " " + item.end_date}
                                style={{marginRight: 48}}
                            />
                          <Button type="dashed" shape="circle" onClick={ thís.onModify } icon={<EditOutlined/>}/>
                            
                        </List.Item>
                    )}>
                    <Form name="add-exp" autoComplete="off" onFinish={onAddExperienceFinish}>
              <Form.List name="experience_info">
                {(fields, { add, remove }) => {
                  return (
                    <div>
                     {fields.map(field => (
                       <Space key={field.key} style={{ display: 'flex', marginBottom: 8, marginTop:8 }} align="start">
                          <Form.Item //name = "companyname"
                            {...field}
                            name={[field.name, 'company_name']}
                            fieldKey={[field.fieldKey, 'company_name']}
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
                            name={[field.name, 'start_date']}
                            fieldKey={[field.fieldKey, 'start_date']}
                            rules={[{ required: true, message: 'Missing start date' }]}
                          >
                            <DatePicker placeholder = "Start date"/>
                          </Form.Item>

                          <Form.Item //name = "enddate"
                            {...field}
                            name={[field.name, 'end_date']}
                            fieldKey={[field.fieldKey, 'end_date']}
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
                  Save
                </Button>
             </Form.Item>
            </Form>
                </List>
            </Card>
            <Card style={{marginTop: 24}}>
                <Meta title="Education" ></Meta>
                <Timeline mode="left" style={{marginTop: 24}}>
                    {this.state.education_element}
                </Timeline>
            </Card>
            <Card style = {{marginTop: 24}}>
			        <Meta  title="Skill"></Meta>
              <List style = {{marginTop:24}} grid = {{column:2}}
                dataSource = {this.state.skill_data}
                renderItem = {item =>(
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar/>}
                      title ={item}
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