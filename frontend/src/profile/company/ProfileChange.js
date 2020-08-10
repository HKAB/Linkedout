//import Form from "antd/lib/form/Form";
import { EditableTagGroup, MyEditor } from '@/components';
import { accountServices, companyServices, getCityName, jobServices, getSpecialty } from "@/services";
import {
  EditOutlined,
  MinusCircleOutlined, PlusOutlined, SettingOutlined
} from "@ant-design/icons";
import {
  AutoComplete, Avatar,
  Badge, Button, Card,
  Form, Input, List, Modal,
  Popconfirm, Select, Space, Tag, Typography, Upload, message, Row, Col
} from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useEffect, useState } from "react";
import '../assets/css/profile.css';

// import {Editor, EditorState} from 'draft-js';


const { Option } = Select;
const { Title } = Typography;
const jobs = [
  {
    title: "Tuyển Dev tại facebook.wap.sh",
    seniority_level: "Junior",
    employment_type: "Full time",
    cities: "Hà Nội",
    skills: ["Python", "C++", "C#", "Java", "Coffee"],
    description: "",
    recruitment_url: "",
  },
  {
    title: "Tuyển Dev tại facebook.wap.sh",
    seniority_level: "Mid level",
    employment_type: "Part time",
    cities: "Hà Nội",
    skills: ["Python", "C++", "C#", "Java", "Coffee"],
    description: "",
    recruitment_url: "",
  },
  {
    title: "Tuyển Dev tại facebook.wap.sh",
    seniority_level: "Fresher",
    employment_type: "Remote",
    cities: "Hà Nội",
    skills: ["Python", "C++", "C#", "Java", "Coffee"],
    description: "",
    recruitment_url: "",
  }
]

const speciality_data = [
  { speciality: 'code' },
  { speciality: 'testing' },
  { speciality: 'dev' }
]

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

function ProfileChange() {

  const [visible, setVisible] = useState(false);
  const [createJob_visible, setCreateJob_visible] = useState(false);
  const [editJob_visible, setEditJob_visible] = useState(false);
  // const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [outputHTML, setOutputHTML] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setfileList] = useState([]);
  const [autoCompleteCity, setAutoCompleteCity] = useState([]);
  const [autoCompleteSpeciality, setAutoCompleteSpeciality] = useState([]);
  const [autoCompleteEditCity, setAutoCompleteEditCity] = useState([]);
  const [jobData, setJobData] = useState([]);
  const [companyBasicData, setCompanyBasicData] = useState([]);

  var editTags = useState(null);
  var createTags = useState(null);
  var editorRef = useState(null);

  const [formEdit] = Form.useForm();
  const [formCreate] = Form.useForm();

  useEffect(() => {
    let user = accountServices.userValue;
    console.log(user);
    if (user) {
      companyServices.getCompany(user.account.id);
      const subscription = companyServices.companyObject
        .subscribe((company) => {
          console.log(company);
          if (company) {
            setCompanyBasicData(company.basic_data);
            setJobData(company.job);
          }
        });
      return () => {
        subscription.unsubscribe();
      }
    }
    else {
      console.log("Oh no!");
    }
  }, [])

  const handleEditorChange = (editorState) => {
    // console.log(editorState);
    // setEditorState(editorState);
    // outputHTML: editorState.toHTML()
    // setOutputHTML(editorState.toHTML());
    // console.log(outputHTML);
  }
  const onEditorFinish = () => {
    // setOutputHTML(editorState.toHTML());
    console.log(editorRef.getHtml());
    var descriptionHtml = editorRef.getHtml();
    companyServices
      .updateBasicCompany(
        companyBasicData.name,
        companyBasicData.website,
        companyBasicData.specialties,
        descriptionHtml
      )
      .then(() => {
        companyServices.getCompany(accountServices.userValue.account.id);
        message.success('Updated description!');
      })
      .catch((error) => {
        console.log(error);
        message.success(error);
      });

  };

  const handleCancel = (e) => {
    setVisible(false);
  };

  const showCreateJobModal = () => {
    setCreateJob_visible(true);
  };

  const handleCreateJobCancel = (e) => {
    setCreateJob_visible(false);
  };

  const showEditJobModal = () => {
    setEditJob_visible(true);
  };

  const handleEditJobCancel = (e) => {
    setEditJob_visible(false);
  };

  const onAddJobFinish = (values) => {
    jobServices.createJob(
      values.title,
      values.description,
      values.seniority_level,
      values.employee_type,
      values.recruitment_url,
      [values.cities], // quick fix
      createTags.getTags(),
    )
      .then(() => {
        companyServices.getCompany(accountServices.userValue.account.id);
        Modal.success({ title: "uWu", content: "Việc làm đã được tạo thành công!" });
      })
      .catch((error) => {
        console.log(error);
        Modal.error({ title: "uWu", content: error });
      });
  };

  const onEditJob = (values) => {
    console.log("edit job");
    console.log(values);
    jobServices.updateJob(
      values.id,
      values.title,
      values.description,
      values.seniority_level,
      values.employee_type,
      values.recruitment_url,
      values.cities,
      editTags.getTags(),
    )
      .then(() => {
        companyServices.getCompany(accountServices.userValue.account.id);
        message.success("Việc làm đã được cập nhật!");
      })
      .catch((error) => {
        console.log(error);
        message.success("Lỗi cập nhật việc làm");
      });
  };

  const onJobModify = (item) => {
    console.log(item);
    formEdit.setFieldsValue({
      id: item.id,
      title: item.title,
      seniority_level: item.seniority_level,
      cities: item.cities,
      employee_type: item.employment_type,
      description: item.description,
      recruitment_url: item.recruitment_url,
    });
    //EditTag.setState({tags: item.skills});
    editTags.setTags(item.skills);
    showEditJobModal();
  };

  const onAddSpecialityFinish = (values) => {
    console.log(values.speciality_info[0].speciality);
    var newSpeciality = companyBasicData.specialties;
    newSpeciality.push(values.speciality_info[0].speciality);
    console.log(newSpeciality);
    companyServices
      .updateBasicCompany(
        companyBasicData.name,
        companyBasicData.website,
        newSpeciality,
        companyBasicData.descriptionHtml
      )
      .then(() => {
        companyServices.getCompany(accountServices.userValue.account.id);
        message.success('Updated speciality!');
      })
      .catch((error) => {
        console.log(error);
        message.success(error);
      });
  };

  const onConfirmDeleteSpeciality = (values) => {
    console.log(values.speciality_info);
    console.log(values.speciality_info + companyBasicData.specialties);
    // var descriptionHtml = editorRef.getHtml();
    // companyServices
    //   .updateBasicCompany(
    //     companyBasicData.name,
    //     companyBasicData.website,
    //     companyBasicData.specialties,
    //     companyBasicData.descriptionHtml
    //   )
    //   .then(() => {
    //     companyServices.getCompany(accountServices.userValue.account.id);
    //     message.success('Updated description!');
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     message.success(error);
    //   });
  }

  const onChangeAutoCompleteSpeciality = (data) => {
    if (data) {

      getSpecialty(data).then(data => {
        console.log(data.tag.map(x => ({ value: x })));
        setAutoCompleteSpeciality(data.tag.map(x => ({ value: x })));
      })
        .catch(error => {
          alert(error);
        })
    }
    else {
      setAutoCompleteSpeciality([]);
    }
  }

  const onChangeAutoCompleteCity = (text) => {
    console.log(text);
    if (text) {
      getCityName(text).then(data => {
        console.log(data);
        if (data) {
          var data_name = data.tag.map(x => ({ value: x }));
          setAutoCompleteCity(data_name);
          console.log(data_name);
        }
      })
        .catch(error => {
          alert(error);
        })
    }
    else {
      setAutoCompleteCity([]);
    }
  };

  const onChangeAutoCompleteEditCity = (text) => {
    console.log(text);
    if (text) {
      getCityName(text).then(data => {
        console.log(data);
        if (data) {
          var data_name = data.tag.map(x => ({ value: x }));
          setAutoCompleteEditCity(data_name);
          console.log(data_name);
        }
      })
        .catch(error => {
          alert(error);
        })
    }
    else {
      setAutoCompleteEditCity([]);
    }
  };

  const handlePreviewCancel = () => setPreviewVisible(false);

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    //   setState({
    // 	previewImage: file.url || file.preview,
    // 	previewVisible: true,
    // 	previewTitle:
    // 	  file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    //   });
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
  };

  const handleUploadChange = ({ fileList }) => {
    // setState({ fileList });
    setfileList(fileList);
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div>Upload</div>
    </div>
  );
  return (
    <>
      <Card className="card-info" style={{ marginTop: 24 }} title={<Title level={3}>Mô tả</Title>}>
        <MyEditor ref={ref => (editorRef = ref)}></MyEditor>
        <Button type="primary" htmlType="submit" onClick={() => onEditorFinish()}>Lưu</Button>
      </Card>

      <Card
        className="card-info"
        style={{
          marginTop: 24,
        }}>
        <Meta title={<Title level={3}>Việc làm</Title>}></Meta>
        <List
          grid={{ gutter: 24, column: 2 }}
          dataSource={jobData}
          renderItem={item => (
            <List.Item>
              <Card
                style={{ marginTop: 16 }}
                actions={[
                  <SettingOutlined key="setting" />,
                  <EditOutlined key="edit" onClick={() => onJobModify(item)} />,
                ]}
              >
                <Meta
                  avatar={<Avatar src="https://image.flaticon.com/icons/svg/3198/3198832.svg"></Avatar>}
                  title={item.title}
                  description={<div>
                    <div>Yêu cầu: {item.seniority_level}</div>
                    <div>Địa điểm: {item.cities[0]}</div>
                    <div>Công việc: {item.employment_type}</div>
                    <List dataSource={item.skills} renderItem={skill => (<Tag>{skill}</Tag>)}></List>
                  </div>}
                />
              </Card>
            </List.Item>
          )}>
        </List>
        <Button style={{ float: "right" }} size="large" type="primary" shape="circle" onClick={() => showCreateJobModal()}>+</Button>
      </Card>

      <Modal
        forceRender
        title="Tạo việc làm"
        visible={createJob_visible}
        onCancel={handleCreateJobCancel}
        onOk={() => {
          formCreate.validateFields()
            .then(values => {
              //formCreate.resetFields();
              onAddJobFinish(values);
            })
            .catch(info => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          id="createJob"
          form={formCreate}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Form.Item
            label="Job Title"
            name="title"
            rules={[{ required: true, message: "Job title is required!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Job Description"
            name="description"
            rules={[{ required: true, message: "Job description is required!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Seniority level"
            name="seniority_level"
            rules={[{ required: true, message: "Seniority level is required!" }]}
          >
            <Select placeholder="select seniority level">
              <Option value="Junior">Junior</Option>
              <Option value="MidLevel">Mid Level</Option>
              <Option value="Senior">Senior</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Employee type"
            name="employee_type"
            rules={[{ required: true, message: "Employee type is required!" }]}
          >
            <Select placeholder="select employee type">
              <Option value="Full-time">Full time</Option>
              <Option value="Part-time">Part time</Option>
              <Option value="FullTime/PartTime">Full time/Part time</Option>
              <Option value="Remote">Remote</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Recruitment url"
            name="recruitment_url"
            rules={[{ required: true, message: "Recruitment url is required!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="City"
            name="cities"
            rules={[{ required: true, message: "City is required!" }]}
          >
            <AutoComplete style={{ width: '100%' }} options={autoCompleteCity} onChange={onChangeAutoCompleteCity}></AutoComplete>
          </Form.Item>

          <Form.Item
            initialValue="skill"
            label="Skill"
            name="skills"
          >
            <EditableTagGroup ref={ref => (createTags = ref)} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        forceRender
        title="Chỉnh sửa việc làm"
        visible={editJob_visible}
        onCancel={handleEditJobCancel}
        onOk={() => {
          formEdit.validateFields()
            .then(values => {
              console.log(values);
              onEditJob(values);
            })
            .catch(info => {
              console.log(info);
            })
        }}
      >
        <Form
          id="editJob"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          form={formEdit}
        >
          <Form.Item
            name="id"
          >
            <Input type="hidden" />
          </Form.Item>
          <Form.Item
            initialValue="title"
            label="Title"
            name="title"
            rules={[{ required: true, message: "Job title is required!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            initialValue="seniority_level"
            label="Yêu cầu:"
            name="seniority_level"
            rules={[{ required: true, message: "Seniority level is required!" }]}
          >
            <Select>
              <Option value="Junior">Junior</Option>
              <Option value="MidLevel">Mid Level</Option>
              <Option value="Senior">Senior</Option>
            </Select>
          </Form.Item>

          <Form.Item
            initialValue="city"
            label="Địa điểm:"
            name="cities"
            rules={[{ required: true, message: "City is required!" }]}
          >
            <AutoComplete style={{ width: '100%' }} options={autoCompleteEditCity} onChange={onChangeAutoCompleteEditCity}></AutoComplete>
          </Form.Item>

          <Form.Item
            initialValue="employee_type"
            label="Công việc:"
            name="employee_type"
            rules={[{ required: true, message: "Employee type is required!" }]}
          >
            <Select>
              <Option value="Full-time">Full time</Option>
              <Option value="Part-time">Part time</Option>
              <Option value="FullTime/PartTime">Full time/Part time</Option>
              <Option value="Remote">Remote</Option>
            </Select>
          </Form.Item>

          <Form.Item
            initialValue="description"
            label="Description:"
            name="description"
            rules={[{ required: true, message: "Description is required!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            initialValue="recruitment_url"
            label="Recruitment url:"
            name="recruitment_url"
            rules={[{ required: true, message: "Recruitment url is required!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            initialValue="skill"
            label="Skill:"
            name="skills"
            rules={[{ required: true, message: "Skill is required!" }]}
          >
            {/* <EditTag/> */}
            <EditableTagGroup ref={ref => (editTags = ref)} />
          </Form.Item>
        </Form>
      </Modal>

        <Row gutter={16}>
          <Col span={12}>
      <Card style={{ marginTop: 24 }}>
        <Meta title={<Title level={3}>Chuyên môn</Title>}></Meta>
        <List
          style={{ marginTop: 24 }}
          grid={{ column: 2 }}
          dataSource={companyBasicData.specialties}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Popconfirm
                    title="Bạn có muốn xóa cái này?"
                    onConfirm={() => onConfirmDeleteSpeciality(item)}
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
          name="add-speciality"
          autoComplete="off"
          onFinish={onAddSpecialityFinish}
        >
          <Form.List name="speciality_info">
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
                      <Col span={16}>
                      <Form.Item
                        {...field}
                        name={[field.name, "speciality"]}
                        fieldKey={[field.fieldKey, "speciality"]}
                        rules={[{ required: true, message: "Missing speciality" },]}
                      >
                        {/* <Input /> */}
                        <AutoComplete options={autoCompleteSpeciality} onChange={onChangeAutoCompleteSpeciality} placeholder="Chuyên môn công ty" ></AutoComplete>
                      </Form.Item>
                      </Col>
                      <Form.Item>
                        <MinusCircleOutlined
                          style={{ color: "red" }}
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      </Form.Item>
                    </Row>
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
        </Col>
        <Col span={12}>
         <Card className="card-info" style={{ marginTop: 24 }}>
         <Meta title={<Title level={3}>Ảnh bìa</Title>}></Meta>
          <Upload
            //action ???
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleUploadChange}
          >
            {/* max number of image upload */}
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
          <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={handlePreviewCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </Card>
        </Col>
      </Row>
    </>
  );

}

export default ProfileChange;
