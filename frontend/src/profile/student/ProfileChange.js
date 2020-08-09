import React, { useState, useEffect } from "react";
import { Component } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";

import {
  Skeleton,
  Switch,
  Badge,
  Card,
  Button,
  Timeline,
  Form,
  Input,
  Space,
  DatePicker,
  Modal,
  Popconfirm,
  Empty,
  Typography,
  AutoComplete,
  Row,
  Col
} from "antd";
import Meta from "antd/lib/card/Meta";

import { List, Avatar } from "antd";

import { studentServices } from "@/services";
import { accountServices } from "@/services";
import { getCompanyName, getSchoolName, getSkillName } from "@/services";

import dayjs from "dayjs";
import moment from 'moment';

const {Title} = Typography;

const dateFormat = 'YYYY-MM-DD';

const onAddExperienceFinish = (values) => {

  values.experience_info.forEach((experience_info) => {
    studentServices
    .createStudentExperience(
      experience_info.company_name,
      experience_info.start_date.format("YYYY-MM-DD"),
      experience_info.end_date.format("YYYY-MM-DD"),
      experience_info.title,
      experience_info.description
    )
    .then(() => {
      studentServices.getStudent(accountServices.userValue.account.id);
      Modal.success({ title: "uWu", content: "Experience created!" });
      // this.formExperienceRef.current.resetFields();
    })
    .catch((error) => {
      console.log(error);
      Modal.error({ title: "uWu", content: error });
    });
  })
};

const onAddSkillFinish = (values) => {

  values.skill_info.forEach((skill_info) => {
    studentServices
    .createStudentSkill(
      skill_info.skill_name,
    )
    .then(() => {
      studentServices.getStudent(accountServices.userValue.account.id);
      Modal.success({ title: "uWu", content: "Student skill created!" });
    })
    .catch((error) => {
      console.log(error);
      Modal.error({ title: "uWu", content: error });
    });
  })
};

const onConfirmDeleteEducation = (id) => {
  console.log(id);
  studentServices.deleteStudentEducation(id)
    .then(() => {
      studentServices.getStudent(accountServices.userValue.account.id);
      Modal.success({ title: "uWu", content: "Education created!" });
    })
    .catch((error) => {
      console.log(error);
      Modal.error({ title: "uWu", content: error });
    });
}

const onConfirmDeleteExperience = (id) => {
  console.log(id);
  studentServices.deleteStudentExperience(id)
    .then(() => {
      studentServices.getStudent(accountServices.userValue.account.id);
      Modal.success({ title: "uWu", content: "Experience deleted!" });
    })
    .catch((error) => {
      console.log(error);
      Modal.error({ title: "uWu", content: error });
    });
}

const onAddEducationFinish = (values) => {
  values.education_info.forEach((education_info) => {
    studentServices
    .createStudentEducation(
      education_info.schoolname,
      education_info.startdate.format("YYYY-MM-DD"),
      education_info.enddate.format("YYYY-MM-DD"),
      education_info.major,
      education_info.degree
    )
    .then(() => {
      studentServices.getStudent(accountServices.userValue.account.id);
      Modal.success({ title: "uWu", content: "Done creating " +  education_info.schoolname});
    })
    .catch((error) => {
      console.log(error);
      Modal.error({ title: "uWu", content: error });
    });
  })
};

const onEditExperience = (values) => {
  studentServices
    .updateStudentExperience(
      values.id,
      values.company_name,
      values.start_date.format("YYYY-MM-DD"),
      values.end_date.format("YYYY-MM-DD"),
      values.title,
      values.description
    )
    .then(() => {
      studentServices.getStudent(accountServices.userValue.account.id);
      Modal.success({ title: "uWu", content: "Experience updated!" });
    })
    .catch((error) => {
      console.log(error);
      Modal.error({ title: "uWu", content: error });
    });
};

const onConfirmDeleteSkill = (skill) => {
  console.log(skill);
  studentServices.deleteStudentSkill(skill)
    .then(() => {
      studentServices.getStudent(accountServices.userValue.account.id);
      Modal.success({ title: "uWu", content: "Skill deleted!" });
    })
    .catch((error) => {
      console.log(error);
      Modal.error({ title: "uWu", content: error });
    });
}

function ProfileChange() {

  const [experienceData, setExperienceData] = useState([]);
  const [educationData, setEducationData] = useState([]);
  const [educationElement, setEducationElement] = useState([]);
  const [skillData, setSkillData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedExperienceItem, setSelectedExperienceItem] = useState({});
  const [selectedSkill, setSelectedSkill] = useState({});
  const [autoCompleteCompany, setAutoCompleteCompany] = useState([]);
  const [autoCompleteSchool, setAutoCompleteSchool] = useState([]);
  const [autoCompleteSkill, setAutoCompleteSkill] = useState([]);


	// handle form
	const [formEditExperience] = Form.useForm();

  // handle modal
  const showModal = () => {
    setVisible(true)
  };

  const onSaveExperience = (fieldsValue) => {
    console.log(fieldsValue);
    // TODO: handle request here!!
    setVisible(false)
  };

  const handleCancel = (e) => {
    setVisible(false)
  };

  // modify experience list item
  const onModify = (item) => {
	console.log(item);
	
	formEditExperience.setFieldsValue({
		company_name: item.company_name,
		title: item.title,
		start_date: moment(item.start_date, dateFormat),
		end_date: moment(item.end_date, dateFormat),
		description: item.description,
		id: item.id
	  });

    setSelectedExperienceItem(item);
    showModal();
  };


  // handle auto complete
	const onChangeAutocompleteCompany = (text) => {
    console.log(text);
		if (text)
		{
			getCompanyName(text).then( data => {
				console.log(data);
				if (data)
				{
					var data_name = data.map(x => ({value: x.name}));
          setAutoCompleteCompany(data_name);
          console.log(data_name);
				}
			})
			.catch(error => {
				alert(error);
			})
		}
		else {
			setAutoCompleteCompany([]);
		}
	};

	const onChangeAutocompleteSchool = (text) => {
		if (text)
		{
			getSchoolName(text).then( data => {
				console.log(data);
				if (data)
				{
					var data_name = data.map(x => ({value: x.name}));
					setAutoCompleteSchool(data_name);
				}
			})
			.catch(error => {
				alert(error);
			})
		}
		else {
			setAutoCompleteSchool([]);
		}
	};

	const onChangeAutocompleteSkill = (text) => {
		if (text)
		{
			getSkillName(text).then( data => {
				console.log(data.tag);
				if (data)
				{
					var data_name = data.tag.map(x => ({value: x}));
					setAutoCompleteSkill(data_name);
				}
			})
			.catch(error => {
				alert(error);
			})
		}
		else {
			setAutoCompleteSkill([]);
		}
	};

  useEffect(() =>  {
    const subscription = studentServices.studentObject.subscribe((student) => {
      if (student) {
        console.log("updateee");
        setExperienceData(student.experience);
        setEducationData(student.education);
        setSkillData(student.skill);

        var timeline_element = [];

        student.education.forEach((item) => {
          timeline_element.push((
            <Timeline.Item key={item.id} label={item.start_date + " - " + item.end_date}>
              <div>
                <b>{item.school_name}</b>
              </div>
              <div>{"Degree: " + item.degree}</div>
              <div>{"Major: " + item.major}</div>
              <Popconfirm
                title="Bạn có muốn xóa cái này?"
                onConfirm={() => onConfirmDeleteEducation(item.id)}
                okText="Yes"
                cancelText="No"
                placement="right"
              >
                <DeleteOutlined
                  style={{ color: "red" }}
                />
              </Popconfirm>
            </Timeline.Item>
          ));
		});
		console.log("timeline_element");
        console.log(timeline_element);
        setEducationElement(timeline_element);
      }
	});
	
	return () => {
		subscription.unsubscribe();
	}
  }, [])

    return (
      <>
        <Modal 
          forceRender 
          title="Đổi thông tin" 
          visible={visible} 
          onCancel={handleCancel}
          onOk={() => {
            formEditExperience.validateFields()
              .then(values => {
                console.log(values);
                onEditExperience(values);
              })
              .catch(info => {
                console.log(info);
              })
          }}
        >
          <Form
		  	    form={formEditExperience}
            id="experience-edit"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            // ref={this.formRef}
          >
            <Form.Item
              initialValue="abc"
              label="Company"
              name="company_name"
              rules={[{ required: true, message: "Company name is required!" }]}
            >
              <Input/>
            </Form.Item>
            
            <Form.Item
              initialValue="def"
              label="Title"
              name="title"
              rules={[{ required: true, message: "Title name is required!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Time"
              rules={[{ required: true, message: "Time is required!" }]}
            >
              <Form.Item name="start_date" style={{ display: "inline-block" }}
                initialValue={moment('2000-07-08', 'YYYY-MM-DD')}
              >
                <DatePicker placeholder="Start date" />
              </Form.Item>
              <Form.Item
                name="end_date"
                style={{ display: "inline-block", marginLeft: 8 }}
                initialValue={moment('2020-07-08', 'YYYY-MM-DD')}
              >
                <DatePicker placeholder="End date" />
              </Form.Item>
            </Form.Item>

            <Form.Item label="Description" name="description" initialValue="des">
              <Input/>
            </Form.Item>

            <Form.Item hidden="true" name="id">
              <Input type="hidden" />
            </Form.Item>
          </Form>
        </Modal>

        <Card className="card-info" style={{ marginTop: 24 }}>
          <Meta title={<Title level={3}>Kinh nghiệm</Title>}></Meta>
          <List
            style={{ marginTop: 24 }}
            itemLayout="horizontal"
            dataSource={experienceData}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={<Avatar src={"http://127.0.0.1:8000" + item.profile_picture}></Avatar>}
                  title={item.company_name}
                  description={item.description}
                />

                <Meta
                  title="Title"
                  description={item.title}
                  style={{ marginRight: 48, textAlign: "right" }}
                />
          
                <Meta
                  title="Working time"
                  description={item.start_date + " " + item.end_date}
                  style={{ marginRight: 48 }}
                />

                <Button
                  type="dashed"
                  shape="circle"
                  onClick={() => onModify(item)}
                  icon={<EditOutlined />}
                />
                
                <Popconfirm
                  title="Bạn có muốn xóa cái này?"
                  onConfirm={() => onConfirmDeleteExperience(item.id)}
                  okText="Yes"
                  cancelText="No">
                  <a>
                    <Button
                      type="dashed"
                      shape="circle"
                      style={{ color: 'red', marginLeft: 5 }}
                      icon={<MinusCircleOutlined />}
                    />
                  </a>
                </Popconfirm>

              </List.Item>
            )}
          >
            <Form
              name="add-experience"
              autoComplete="off"
              onFinish={onAddExperienceFinish}
              // ref = {this.formExperienceRef}
            >
              <Form.List name="experience_info"> 
                {(fields, { add, remove }) => {
                  return (
                    <div>
                      {fields.map((field) => (
                        <Row gutter={12, 12}
                          key={field.key}
                          style={{
                            marginBottom: 8,
                            marginTop: 8,
                            width: '100%',
                          }}
                        >
                          <Col span={5}>
                            <Form.Item
                              {...field}
                              name={[field.name, "company_name"]}
                              fieldKey={[field.fieldKey, "company_name"]}
                              rules={[{ required: true, message: "Missing company name", }]}
                            >
                              <AutoComplete style={{ width: '100%' }} options={autoCompleteCompany} onChange={onChangeAutocompleteCompany} placeholder="Tên công ty" ></AutoComplete>
                            </Form.Item>
                          </Col>
                          <Col span={5}>
                            <Form.Item
                              {...field}
                              name={[field.name, "description"]}
                              fieldKey={[field.fieldKey, "description"]}
                              rules={[{ required: true, message: "Missing Description", },]}
                            >
                              <Input placeholder="Description" style = {{width:'100%'}}/>
                            </Form.Item>
                          </Col>
                          <Col span={5}>
                            <Form.Item
                              {...field}
                              name={[field.name, "title"]}
                              fieldKey={[field.fieldKey, "title"]}
                              rules={[{ required: true, message: "Missing title" },]}                       
                            >
                              <Input placeholder="Title" style = {{width:'100%'}}/>
                            </Form.Item>
                          </Col>
                          <Col span={4}>
                            <Form.Item
                              {...field}
                              name={[field.name, "start_date"]}
                              fieldKey={[field.fieldKey, "start_date"]}
                              rules={[{ required: true, message: "Missing start date" },]}
                            >
                              <DatePicker placeholder="Start date" style = {{width:'100%'}}/>
                            </Form.Item>
                          </Col>
                          <Col span={4}>
                            <Form.Item
                              {...field}
                              name={[field.name, "end_date"]}
                              fieldKey={[field.fieldKey, "end_date"]}
                              rules={[{ required: false }]}
                            >
                              <DatePicker placeholder="End date" style = {{width:'100%'}}/>
                            </Form.Item>
                          </Col>
                          <Col span={1}>
                            <MinusCircleOutlined
                              style={{ color: "red"}}
                              onClick={() => {
                                remove(field.name);
                              }}
                            />
                          </Col>
                        </Row>
                      ))}

                      <Form.Item>
                        <Button 
                          type="dashed" 
                          onClick={() => { 
                            add(); 
                          }} 
                          block
                        >
                          <PlusOutlined /> Add Experience
                        </Button>
                      </Form.Item>
                    </div>
                  );
                }}
              </Form.List>

              <Form.Item>
                <Button type="primary" htmlType="submit"> Save </Button>
              </Form.Item>
            </Form>
          </List>
        </Card>

        <Card className="card-info" style={{ marginTop: 24 }}>
          <Meta title={<Title level={3}>Học vấn</Title>}></Meta>
          
          <Timeline mode="left" style={{ marginTop: 24 }}>
          	{educationElement}
          </Timeline>
          
          <Form 
            name="add-education" 
            autoComplete="off" 
            onFinish={onAddEducationFinish}
          >
            <Form.List name="education_info">
              {(fields, { add, remove }) => {
                return (
                  <div>
                    {fields.map((field) => (
                      <Row gutter={12, 12}
                        key={field.key}
                        style={{
                          marginBottom: 8,
                          marginTop: 8,
                          width: '100%'
                        }}
                      >
                        <Col span={5}>
                          <Form.Item
                            {...field}
                            name={[field.name, "schoolname"]}
                            fieldKey={[field.fieldKey, "schoolname"]}
                            rules={[{ required: true, message: "Missing school name" },]}
                          >
                            {/* <Input placeholder="School Name" /> */}
                            <AutoComplete style={{ width: '100%' }} options={autoCompleteSchool} onChange={onChangeAutocompleteSchool} placeholder="Tên trường" ></AutoComplete>
                          </Form.Item>
                        </Col>
                        <Col span={5}>
                          <Form.Item
                            {...field}
                            name={[field.name, "degree"]}
                            fieldKey={[field.fieldKey, "degree"]}
                            rules={[{ required: true, message: "Missing Degree" },]}
                          >
                            <Input placeholder="Degree" style={{ width: '100%' }}/>
                          </Form.Item>
                        </Col>
                        <Col span={5}>
                          <Form.Item
                            {...field}
                            name={[field.name, "major"]}
                            fieldKey={[field.fieldKey, "major"]}
                            rules={[{ required: true, message: "Missing major" }]}
                          >
                            <Input placeholder="Major" style={{ width: '100%' }}/>
                          </Form.Item>
                        </Col>
                        <Col span={4}>
                          <Form.Item
                            {...field}
                            name={[field.name, "startdate"]}
                            fieldKey={[field.fieldKey, "startdate"]}
                            rules={[{ required: true, message: "Missing start date" },]}
                          >
                            <DatePicker placeholder="Start date" style={{ width: '100%' }}/>
                          </Form.Item>
                        </Col>
                        <Col span={4}>
                          <Form.Item
                            {...field}
                            name={[field.name, "enddate"]}
                            fieldKey={[field.fieldKey, "enddate"]}
                            rules={[{ required: false }]}
                          >
                            <DatePicker placeholder="End date" style={{ width: '100%' }}/>
                          </Form.Item>
                        </Col>
                        <Col span={1}>
                          <MinusCircleOutlined
                            style={{ color: "red" }}
                            onClick={() => {
                              remove(field.name);
                            }}
                          />
                        </Col>
                      </Row>
                    ))}

                    <Form.Item>
                      <Button 
                        type="dashed" 
                        onClick={() => { 
                          add(); 
                        }} 
                        block
                      >
                        <PlusOutlined /> Add Education
                      </Button>
                    </Form.Item>
                  </div>
                );
              }}
            </Form.List>

            <Form.Item>
              <Button type="primary" htmlType="submit"> Submit </Button>
            </Form.Item>
          </Form>
        </Card>
        <Card className="card-info" style={{ marginTop: 24 }}>
          <Meta title={<Title level={3}>Kỹ năng</Title>}></Meta>
          <List
            style={{ marginTop: 24 }}
            grid={{ column: 2 }}
            dataSource={skillData}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Popconfirm
                      title="Bạn có muốn xóa cái này?"
                      onConfirm={() => onConfirmDeleteSkill(item)}
                      okText="Yes"
                      cancelText="No">
                      <a>
                        <Badge
                          style={{ color: "red" }}
                          count={<MinusCircleOutlined />}
                        >
                          <Avatar />
                        </Badge>
                      </a>
                    </Popconfirm>
                  }
                  title={item}
                />
              </List.Item>
            )}
          />
          <Form 
            name="add-skill" 
            autoComplete="off" 
            onFinish={onAddSkillFinish}
          >
            <Form.List name="skill_info">
              {(fields, { add, remove }) => {
                return (
                  <div>
                    {fields.map((field) => (
                      <Space
                        key={field.key}
                        style={{
                          display: "flex",
                          marginBottom: 8,
                          marginTop: 8,
                        }}
                        align="start"
                      >
                        <Form.Item
                          {...field}
                          name={[field.name, "skill_name"]}
                          fieldKey={[field.fieldKey, "skill_name"]}
                          rules={[{ required: true, message: "Missing skill name" },]}
                        >
                          {/* <Input placeholder="Skill Name" /> */}
						              <AutoComplete style={{width: 100}} options={autoCompleteSkill} onChange={onChangeAutocompleteSkill} placeholder="Tên kỹ năng" ></AutoComplete>
						  
                        </Form.Item>

                        <MinusCircleOutlined
                          style={{ color: "red" }}
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      </Space>
                    ))}

                    <Form.Item>
                      <Button type="dashed" shape="circle"
                        onClick={() => {
                          add();
                        }}
                      >
                        <PlusOutlined />
                      </Button>
                    </Form.Item>
                  </div>
                );
              }}
            </Form.List>

            <Form.Item>
              <Button type="primary" htmlType="submit"> Submit </Button>
            </Form.Item>
          </Form>
        </Card>
      </>
    );
}

export default ProfileChange;
