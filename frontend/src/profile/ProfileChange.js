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
      alert("done!");
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
};

class ProfileChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      experience_data: [],
      education_data: {},
      education_element: [],
      skill_data: [],
      //for modal
      visible: false,
      selected_experience_item: {},
    };
    this.formRef = React.createRef();
  }
  
  // handle modal
  showModal = () => {
    this.setState({ visible: true });
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
    this.setState({selected_experience_item: item});
    this.formRef.current.setFieldsValue({
      company_name: item.company_name,
      title: item.title,
      description: item.description
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
            <Timeline.Item
              key={item.school_name}
              label={item.start_date + " - " + item.end_date}
            >
              <div>
                <b>{item.school_name}</b>
              </div>
              <div>{"Degree: " + item.degree}</div>
              <div>{"Major: " + item.major}</div>
              <DeleteOutlined
                style={{ color: "red" }}
                onClick={() => {
                  for (let id = 0; id < timeline_element.length; id++) {
                    if (timeline_element[id].key == item.school_name) {
                      console.log(item.school_name);
                      timeline_element.splice(id, 1);
                      break;
                    }
                  }
                  //console.log(timeline_element.length);
                }}
              />
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
          footer={[
            <Button
              type="primary"
              key="submit"
              form="experience-edit"
              htmlType="submit"
            >
              Save
            </Button>,
          ]}
        >
          <Form
            id="experience-edit"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            ref = {this.formRef}
          >
            <Form.Item
              initialValue = "abc"
              label="Company"
              name="company_name"
              rules={[{ required: true, message: "Company name is required!" }]}
            >
              <Input 
                />
            </Form.Item>
            <Form.Item
              initialValue = "def"
              label="Title"
              name="title"
              rules={[{ required: true, message: "Title name is required!" }]}
            >
              <Input 
              //defaultValue = {this.state.selected_experience_item.title}
              />
            </Form.Item>
            <Form.Item
              label="Time"
              rules={[{ required: true, message: "Time is required!" }]}
            >
              <Form.Item name="start-date" style={{ display: "inline-block" }} 
                initialValue={moment('2000-07-08', 'YYYY-MM-DD')}
              >
                <DatePicker placeholder="Start date" />
              </Form.Item>
              <Form.Item
                name="end-date"
                style={{ display: "inline-block", marginLeft: 8 }}
                initialValue={moment('2020-07-08', 'YYYY-MM-DD')}
              >
                <DatePicker placeholder="End date" />
              </Form.Item>
            </Form.Item>

            <Form.Item  label="Description" name="description" initialValue = "des">
              <Input 
              //defaultValue = {this.state.selected_experience_item.description}
              />
            </Form.Item>
          </Form>
        </Modal>

        <Card style={{ marginTop: 24 }}>
          <Meta title="Experiences"></Meta>
          <List
            style={{ marginTop: 24 }}
            itemLayout="horizontal"
            dataSource={this.state.experience_data}
            renderItem={(item) => (
              <List.Item key={item}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={"http://127.0.0.1:8000" + item.profile_picture}
                    ></Avatar>
                  }
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
                  onClick={() => this.onModify(item) }
                  icon={<EditOutlined />}
                />
              </List.Item>
            )}
          >
            <Form
              name="add-exp"
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
                          <Form.Item //name = "companyname"
                            {...field}
                            name={[field.name, "company_name"]}
                            fieldKey={[field.fieldKey, "company_name"]}
                            rules={[
                              {
                                required: true,
                                message: "Missing company name",
                              },
                            ]}
                          >
                            <Input placeholder="Company Name" />
                          </Form.Item>

                          <Form.Item //name = "description"
                            {...field}
                            name={[field.name, "description"]}
                            fieldKey={[field.fieldKey, "description"]}
                            rules={[
                              {
                                required: true,
                                message: "Missing Description",
                              },
                            ]}
                          >
                            <Input placeholder="Description" />
                          </Form.Item>

                          <Form.Item //name = "title"
                            {...field}
                            name={[field.name, "title"]}
                            fieldKey={[field.fieldKey, "title"]}
                            rules={[
                              { required: true, message: "Missing title" },
                            ]}
                          >
                            <Input placeholder="Title" />
                          </Form.Item>

                          <Form.Item //name = "startdate"
                            {...field}
                            name={[field.name, "start_date"]}
                            fieldKey={[field.fieldKey, "start_date"]}
                            rules={[
                              { required: true, message: "Missing start date" },
                            ]}
                          >
                            <DatePicker placeholder="Start date" />
                          </Form.Item>

                          <Form.Item //name = "enddate"
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
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </Form>
          </List>
        </Card>
        <Card style={{ marginTop: 24 }}>
          <Meta title="Education"></Meta>
          <Timeline mode="left" style={{ marginTop: 24 }}>
            {this.state.education_element}
          </Timeline>
          <Form name="add-edu" autoComplete="off">
            <Form.List name="edu-info">
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
                          rules={[
                            { required: true, message: "Missing school name" },
                          ]}
                        >
                          <Input placeholder="School Name" />
                        </Form.Item>

                        <Form.Item
                          {...field}
                          name={[field.name, "degree"]}
                          fieldKey={[field.fieldKey, "degree"]}
                          rules={[
                            { required: true, message: "Missing Degree" },
                          ]}
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
                          rules={[
                            { required: true, message: "Missing start date" },
                          ]}
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
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <Card style={{ marginTop: 24 }}>
          <Meta title="Skill"></Meta>
          <List
            style={{ marginTop: 24 }}
            grid={{ column: 2 }}
            dataSource={this.state.skill_data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Badge
                      style={{ color: "red" }}
                      count={<MinusCircleOutlined />}
                    >
                      <Avatar src={item.avatar} />{" "}
                    </Badge>
                  }
                  title={<a href={item.title_href}>{item.title}</a>}
                />
              </List.Item>
            )}
          />
          <Button type="dashed" shape="circle">
            <PlusOutlined />
          </Button>
        </Card>
      </>
    );
  }
}

export default ProfileChange;
