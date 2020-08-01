import React from "react";
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
} from "antd";
import Meta from "antd/lib/card/Meta";

import { List, Avatar } from "antd";

import { studentServices } from "@/services";
import { accountServices } from "@/services";
import dayjs from "dayjs";
import moment from 'moment';

const onAddExperienceFinish = (values) => {
  console.log(values.experience_info[0].start_date.format("D MMMM YYYY"));
  studentServices
    .createStudentExperience(
      values.experience_info[0].company_name,
      values.experience_info[0].start_date.format("YYYY-MM-DD"),
      values.experience_info[0].end_date.format("YYYY-MM-DD"),
      values.experience_info[0].title,
      values.experience_info[0].description
    )
    .then(() => {
      studentServices.getStudent(accountServices.userValue.account.id);
      Modal.success({ title: "uWu", content: "done create student experience!" });
    })
    .catch((error) => {
      console.log(error);
      Modal.error({ title: "uWu", content: error });
    });
};

const onAddSkillFinish = (values) => {
  studentServices
    .createStudentSkill(
      values.skill_info[0].skill_name,
    )
    .then(() => {
      studentServices.getStudent(accountServices.userValue.account.id);
      Modal.success({ title: "uWu", content: "done create student skill!" });
    })
    .catch((error) => {
      console.log(error);
      Modal.error({ title: "uWu", content: error });
    });
};

const onConfirmDeleteEducation = (id) => {
  console.log(id);
  studentServices.deleteStudentEducation(id)
    .then(() => {
      studentServices.getStudent(accountServices.userValue.account.id);
      Modal.success({ title: "uWu", content: "done delete fucking school!" });
    })
    .catch((error) => {
      console.log(error);
      Modal.error({ title: "uWu", content: error });
    });
}

const onAddEducationFinish = (values) => {
  studentServices
    .createStudentEducation(
      values.education_info[0].schoolname,
      values.education_info[0].startdate.format("YYYY-MM-DD"),
      values.education_info[0].enddate.format("YYYY-MM-DD"),
      values.education_info[0].major,
      values.education_info[0].degree
    )
    .then(() => {
      studentServices.getStudent(accountServices.userValue.account.id);
      Modal.success({ title: "uWu", content: "done create freaking student!" });
    })
    .catch((error) => {
      console.log(error);
      Modal.error({ title: "uWu", content: error });
    });
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
      Modal.success({ title: "uWu", content: "done update freaking student!" });
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
      Modal.success({ title: "uWu", content: "done delete fucking skill!" });
    })
    .catch((error) => {
      console.log(error);
      Modal.error({ title: "uWu", content: error });
    });
}

class ProfileChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      experience_data: [],
      education_data: {},
      education_element: [],
      skill_data: ["C#"],
      //for modal
      visible: false,
      experience_visible:false,
      education_visible:false,
      skill_visible:false,
      selected_experience_item: {},
      selected_skill: {}
    };
    this.formRef = React.createRef();
  }

  // handle modal
  showModal = () => {
    this.setState({ visible: true });
  };

  showExperienceModal = () => {
    this.setState({ experience_visible: true });
  };

  showEducationModal = () => {
    this.setState({ education_visible: true });
  };

  showSkillModal = () => {
    this.setState({ skill_visible: true });
  };

  handleExperienceCancel = (e) => {
    this.setState({ experience_visible: false });
  };

  handleEducationCancel = (e) => {
    this.setState({ education_visible: false });
  };

  handleSkillCancel = (e) => {
    this.setState({ skill_visible: false });
  };

  onSaveExperience = (fieldsValue) => {
    console.log(fieldsValue);
    // TODO: handle request here!!
    this.setState({ visible: false });
  };

  handleCancel = (e) => {
    this.setState({ visible: false });
  };

  // modify experience list item
  onModify = (item) => {
    console.log(item);
    //this.formRef.current.resetFields();
    this.setState({ selected_experience_item: item });
    this.formRef.current.setFieldsValue({
      company_name: item.company_name,
      title: item.title,
      description: item.description,
      id: item.id
    });
    this.showModal();
  };

  componentDidMount() {
    studentServices.studentObject.subscribe((student) => {
      if (student) {
        console.log("updateee");
        this.setState({ experience_data: student.experience });
        this.setState({ education_data: student.education });
        this.setState({ skill_data: student.skill });

        var timeline_element = [];

        student.education.forEach((item) => {
          timeline_element.push(
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
          );
        });
        this.setState({ education_element: timeline_element });
      }
    });
  }

  render() {
    return (
      <>
        <Modal 
          forceRender 
          title="Đổi thông tin" 
          visible={this.state.visible} 
          onCancel={this.handleCancel}
          onOk={() => {
            this.formRef.current.validateFields()
              .then(values => {
                console.log(values);
                onEditExperience(values);
              })
              .catch(info => {
                console.log(info);
              })
          }}
        //     footer={[
        //       <Button
        //         type="primary"
        //         key="submit"
        //         form="experience-edit"
        //         htmlType="submit"
        //       >
        //         Save
        //       </Button>,
        // ]}
        >
          <Form
            id="experience-edit"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            ref={this.formRef}
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

        <Modal
          forceRender
          title="Experiences"
          footer = {null}
          visible={this.state.experience_visible}
          onCancel={this.handleExperienceCancel}
        >
          <List
            itemLayout="vertical"
            style={{ marginTop: 24 }}
            dataSource={this.state.experience_data}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={"http://127.0.0.1:8000" + item.profile_picture}></Avatar>}
                  title={item.company_name}
                  description={<div className="company-info" id={item.id}>
                    <div>{"Title: " + item.title}</div>
                    <div>{"Time: " + item.start_date + " " + item.end_date}</div>
                  </div>}
                />
              </List.Item>
            )}
          />
        </Modal>
        
        <Modal
          forceRender
          title="Educations"
          footer = {null}
          visible={this.state.education_visible}
          onCancel={this.handleEducationCancel}
        >
          <Timeline style={{ marginTop: 24, paddingTop: 16 }} mode="left">
            {this.state.education_element}
          </Timeline>
        </Modal>

        <Modal
          forceRender
          title="Skills"
          footer = {null}
          visible={this.state.skill_visible}
          onCancel={this.handleSkillCancel}
        >
          <List style={{ marginTop: 24 }}
            dataSource={this.state.skill_data}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar />}
                  title={item}
                />
              </List.Item>
            )}
          />
        </Modal>

        <Card style={{ marginTop: 24 }}>
          <Meta title="Experiences"></Meta>
          <List
            style={{ marginTop: 24 }}
            itemLayout="horizontal"
            dataSource={this.state.experience_data.slice(0, 4)}
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
                  onClick={() => this.onModify(item)}
                  icon={<EditOutlined />}
                />

              </List.Item>
            )}
          >
            <Form
              name="add-experience"
              autoComplete="off"
              onFinish={onAddExperienceFinish}
            >
              <Form.List name="experience_info">
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
                            name={[field.name, "company_name"]}
                            fieldKey={[field.fieldKey, "company_name"]}
                            rules={[{required: true, message: "Missing company name",},]}
                          >
                            <Input placeholder="Company Name" />
                          </Form.Item>

                          <Form.Item
                            {...field}
                            name={[field.name, "description"]}
                            fieldKey={[field.fieldKey, "description"]}
                            rules={[{required: true,message: "Missing Description",},]}
                          >
                            <Input placeholder="Description" />
                          </Form.Item>

                          <Form.Item
                            {...field}
                            name={[field.name, "title"]}
                            fieldKey={[field.fieldKey, "title"]}
                            rules={[{ required: true, message: "Missing title" },]}
                          >
                            <Input placeholder="Title" />
                          </Form.Item>

                          <Form.Item 
                            {...field}
                            name={[field.name, "start_date"]}
                            fieldKey={[field.fieldKey, "start_date"]}
                            rules={[
                              { required: true, message: "Missing start date" },
                            ]}
                          >
                            <DatePicker placeholder="Start date" />
                          </Form.Item>

                          <Form.Item
                            {...field}
                            name={[field.name, "end_date"]}
                            fieldKey={[field.fieldKey, "end_date"]}
                            rules={[{ required: false }]}
                          >
                            <DatePicker placeholder="End date" />
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
                <Button
                  type="primary"
                  style={{ float: 'right' }}
                  onClick={() => this.showExperienceModal()}> Show all
                </Button>
              </Form.Item>
            </Form>
          </List>
        </Card>

        <Card style={{ marginTop: 24 }}>
          <Meta title="Education"></Meta>
          
          <Timeline mode="left" style={{ marginTop: 24 }}>
            {this.state.education_element.slice(0, 4)}
          </Timeline>
          
          <Form name="add-education" autoComplete="off" onFinish={onAddEducationFinish}>
            <Form.List name="education_info">
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
                          name={[field.name, "schoolname"]}
                          fieldKey={[field.fieldKey, "schoolname"]}
                          rules={[{ required: true, message: "Missing school name" },]}
                        >
                          <Input placeholder="School Name" />
                        </Form.Item>

                        <Form.Item
                          {...field}
                          name={[field.name, "degree"]}
                          fieldKey={[field.fieldKey, "degree"]}
                          rules={[{ required: true, message: "Missing Degree" },]}
                        >
                          <Input placeholder="Degree" />
                        </Form.Item>

                        <Form.Item
                          {...field}
                          name={[field.name, "major"]}
                          fieldKey={[field.fieldKey, "major"]}
                          rules={[{ required: true, message: "Missing major" }]}
                        >
                          <Input placeholder="Major" />
                        </Form.Item>

                        <Form.Item
                          {...field}
                          name={[field.name, "startdate"]}
                          fieldKey={[field.fieldKey, "startdate"]}
                          rules={[{ required: true, message: "Missing start date" },]}
                        >
                          <DatePicker placeholder="Start date" />
                        </Form.Item>

                        <Form.Item
                          {...field}
                          name={[field.name, "enddate"]}
                          fieldKey={[field.fieldKey, "enddate"]}
                          rules={[{ required: false }]}
                        >
                          <DatePicker placeholder="End date" />
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
              <Button 
                type = "primary" 
                style = {{float:'right'}} 
                onClick = {()=>this.showEducationModal()}> Show all
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <Card style={{ marginTop: 24 }}>
          <Meta title="Skill"></Meta>
          <List
            style={{ marginTop: 24 }}
            grid={{ column: 2 }}
            dataSource={this.state.skill_data.slice(0, 6)}
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
          <Form name="add-skill" autoComplete="off" onFinish={onAddSkillFinish}>
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
                          <Input placeholder="Skill Name" />
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
              <Button
                type="primary"
                style={{ float: 'right' }}
                onClick={() => this.showSkillModal()}> Show all
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </>
    );
  }
}

export default ProfileChange;
