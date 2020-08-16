//import Form from "antd/lib/form/Form";
import {
  EditOutlined,
  EllipsisOutlined, MinusCircleFilled,

  MinusCircleOutlined,
  PlusOutlined
} from "@ant-design/icons";
import {
  AutoComplete, Avatar,
  Badge, Button, Card,
  Col, Form, Input, List,
  message, Modal,
  Popconfirm, Row, Select, Space, Tag, Tooltip, Typography, Upload
} from "antd";
import Meta from "antd/lib/card/Meta";
import TextArea from 'antd/lib/input/TextArea';
import { EditableTagGroup, MyEditor } from 'components';
import UploadableAvatar from "components/UploadableAvatar";
import moment from 'moment';
import React, { useEffect, useState } from "react";
import { accountServices, companyServices, getCityName, getSpecialty, jobServices } from "services";
import { Config } from "../../config/consts";
import '../assets/css/profile.css';
import info from '../assets/images/info.svg';
// import {Editor, EditorState} from 'draft-js';
import protest from '../assets/images/protest.svg';

const { Option } = Select;
const { Title, Paragraph } = Typography;

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
  const [editorDescription, setEditorDescription] = useState([]);
  const [jobDetail, setJobDetail] = useState([]);
  const [jobDetailVisible, setJobDetailVisible] = useState(false);

  const [selectedNewJobPicture, setSelectedNewJobPicture] = useState();

  var editTags = useState(null);
  var uploadableAvatarRefOnEdit = useState(null);
  var createTags = useState(null);
  var editorRef = useState(null);
  var uploadableAvatarRefOnCreate = useState(null);

  const [formEdit] = Form.useForm();
  const [formCreate] = Form.useForm();

  useEffect(() => {
    let user = accountServices.userValue;
    if (user) {
      companyServices.getCompany(user.account.id);
      const subscription = companyServices.companyObject
        .subscribe((company) => {
          if (company) {
            setCompanyBasicData(company.basic_data);
            setJobData(company.job);
            setEditorDescription(company.basic_data.description);
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

  const onUploadJobPicture = (data) => {
    setSelectedNewJobPicture(data)
    // studentServices.uploadStudentPictureProfile(multipart_formdata)
    //   .then(() => {
    //     message.success("Upload avatar successful!");
    //   });
  }

  const handleEditorChange = (editorState) => {
    // console.log(editorState);
    // setEditorState(editorState);
    // outputHTML: editorState.toHTML()
    // setOutputHTML(editorState.toHTML());
    // console.log(outputHTML);
  }

  const onEditorFinish = () => {
    // setOutputHTML(editorState.toHTML());
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
        setEditorDescription(descriptionHtml);
      })
      .catch((error) => {
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
    if (uploadableAvatarRefOnCreate) uploadableAvatarRefOnCreate.setImageUrl(null);
    setSelectedNewJobPicture([]);
    setCreateJob_visible(false);
  };

  const showEditJobModal = () => {
    setEditJob_visible(true);
  };

  const handleEditJobCancel = (e) => {
    if (uploadableAvatarRefOnEdit) uploadableAvatarRefOnEdit.setImageUrl(null);
    setSelectedNewJobPicture([]);
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
      .then((listjob) => {
        if (selectedNewJobPicture.file) {
          var id_new_job = listjob[listjob.length - 1].id;
          let multipart_formdata = { 'file': selectedNewJobPicture.file, 'id': id_new_job };
          jobServices.uploadJobPicture(multipart_formdata)
            .then(() => {
              jobServices.listJob(accountServices.userValue.account.id)
                .then((list_job) => {
                  list_job[list_job.length - 1].job_picture = list_job[list_job.length - 1].job_picture + "?" + moment().unix();
                  setJobData(list_job);
                })
                .catch((error) => {
                  message.error(error);
                })
              message.success("Updated cover photo!");
            })
            .catch(error => {
              message.error(error);
            });
        }
        else {
          jobServices.listJob(accountServices.userValue.account.id)
            .then((list_job) => {
              setJobData(list_job);
            })
            .catch((error) => {
              message.error(error);
            })
        }
        companyServices.getCompany(accountServices.userValue.account.id);
        message.success("Create job successfully!");
        handleCreateJobCancel();
        formCreate.resetFields();
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const onEditJob = (values) => {
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

        if (selectedNewJobPicture.file) {
          let multipart_formdata = { 'file': selectedNewJobPicture.file, 'id': values.id };
          jobServices.uploadJobPicture(multipart_formdata)
            .then(() => {
              jobServices.listJob(accountServices.userValue.account.id)
                .then((list_job) => {
                  list_job.forEach(job => {
                    if (job.id == values.id)
                      job.job_picture = job.job_picture + "?" + moment().unix();
                  });
                  setJobData(list_job);
                })
                .catch((error) => {
                  message.error(error);
                })
              message.success("Update cover photo for a job successfully!");
            })
            .catch(error => {
              message.error(error);
            });
        }
        else {
          jobServices.listJob(accountServices.userValue.account.id)
            .then((list_job) => {
              setJobData(list_job);
            })
            .catch((error) => {
              message.error(error);
            })
        }

        companyServices.getCompany(accountServices.userValue.account.id);
        message.success("Job has been updated!");
        handleEditJobCancel();
      })
      .catch((error) => {
        message.success("Update job error");
        // handleEditJobCancel();
      });

  };

  const onConfirmDeleteJob = (id) => {
    jobServices.deleteJob(id)
      .then(() => {
        companyServices.getCompany(accountServices.userValue.account.id);
        message.success({ title: "uWu", content: "The job has been deleted" });

      })
      .catch((error) => {
        message.error({ title: "uWu", content: error });
      });
  }

  const onJobModify = (item) => {
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
    uploadableAvatarRefOnEdit.setImageUrl(Config.backendUrl + item.job_picture);
    showEditJobModal();
  };

  const onAddSpecialityFinish = (values) => {
    var newSpeciality = companyBasicData.specialties;
    newSpeciality.push(values.speciality_info[0].speciality);
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
    var new_speciality = companyBasicData.specialties;
    const index = new_speciality.indexOf(values);
    if (index > -1) {
      new_speciality.splice(index, 1);
    }
    // var descriptionHtml = editorRef.getHtml();
    companyServices
      .updateBasicCompany(
        companyBasicData.name,
        companyBasicData.website,
        new_speciality,
        companyBasicData.descriptionHtml
      )
      .then(() => {
        companyServices.getCompany(accountServices.userValue.account.id);
        message.success('Update specialty!');
      })
      .catch((error) => {
        console.log(error);
        message.error(error);
      });
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

  const onChangeAutoCompleteSpeciality = (data) => {
    if (data) {

      getSpecialty(data).then(data => {
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
    if (text) {
      getCityName(text).then(data => {
        if (data) {
          var data_name = data.tag.map(x => ({ value: x }));
          setAutoCompleteCity(data_name);
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
    if (text) {
      getCityName(text).then(data => {
        if (data) {
          var data_name = data.tag.map(x => ({ value: x }));
          setAutoCompleteEditCity(data_name);
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
      <Card className="card-info" style={{ marginTop: 24 }} title={<Title level={3}>Description</Title>}>
        <MyEditor ref={ref => (editorRef = ref)} descriptionData={editorDescription}></MyEditor>
        <Button type="primary" htmlType="submit" onClick={() => onEditorFinish()}>Save</Button>
      </Card>

      <Card
        className="card-info"
        style={{
          marginTop: 24,
        }}>
        <Meta title={<Title level={3}>Job</Title>}></Meta>
        <List
          pagination={{ pageSize: 4 }}
          grid={{ gutter: 24, column: 2 }}
          dataSource={jobData}
          renderItem={item => (
            <List.Item>
              <Card
                style={{ marginTop: 16 }}
                actions={[
                  <EditOutlined key="edit" onClick={() => onJobModify(item)} />,
                  <EllipsisOutlined key="info" onClick={() => onShowJobDetail(item)} />
                ]}
              >
                <Meta
                  avatar={<Avatar src={protest}></Avatar>}
                  title={
                    <span >
                      <span>{item.title}</span>
                      <span>
                        <Popconfirm
                          title="Do you wanna delete this?"
                          onConfirm={() => onConfirmDeleteJob(item.id)}
                          okText="Yes"
                          cancelText="No">
                          <MinusCircleFilled style={{ color: 'red', fontSize: 16, float: 'right' }} />
                        </Popconfirm>
                      </span>
                    </span>
                  }
                  description={<Space direction="vertical" size={3}>
                    <div>Seniority Level: {item.seniority_level}</div>
                    <div>City: {item.cities[0]}</div>
                    <div>Job Type: {item.employment_type}</div>
                    <List dataSource={item.skills} renderItem={skill => (<Tag style={{ margin: 3 }}>{skill}</Tag>)}></List>
                  </Space>}
                />
              </Card>
            </List.Item>
          )}>
        </List>
        <Button style={{ float: "right", marginTop: 16 }} size="large" type="primary" shape="circle" onClick={() => showCreateJobModal()}><PlusOutlined /></Button>
      </Card>

      <Modal
        forceRender
        title={<Title level={4}>Job</Title>}
        visible={jobDetailVisible}
        onCancel={handleJobDetailCancel}
        footer={null}
      >
        <List grid={{ gutter: 24, column: 2 }}>
          <List.Item>
            <Card
              bordered={false}
              cover={<img src={Config.backendUrl + jobDetail.job_picture} />}>
              <Meta
                title={<Title level={3}>{jobDetail.title}</Title>}
                description={<div>

                  <Title level={4}>Seniority Level </Title>
                  <Paragraph>{jobDetail.seniority_level}</Paragraph>
                  <Title level={4}>City </Title>
                  <Paragraph><Space><List dataSource={jobDetail.cities} renderItem={city => (city)}></List></Space></Paragraph>
                  <Title level={4}>Employee Type </Title>
                  <Paragraph>{jobDetail.employment_type}</Paragraph>

                  <Title level={4}>Description </Title>
                  <Paragraph>
                    {jobDetail.description}
                  </Paragraph>

                  <Title level={4}>Skills </Title>
                  <Paragraph><List dataSource={jobDetail.skills} renderItem={skills => (<Tag style={{ margin: 3 }}>{skills}</Tag>)}></List></Paragraph>
                </div>}
              />
            </Card>
          </List.Item>
        </List>
      </Modal>

      <Modal
        forceRender
        title="Create job"
        visible={createJob_visible}
        onCancel={handleCreateJobCancel}
        onOk={() => {
          formCreate.validateFields()
            .then(values => {
              onAddJobFinish(values);
              //formCreate.resetFields();
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
            <TextArea />
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

          <Form.Item label="Cover photo">
            <UploadableAvatar ref={ref => (uploadableAvatarRefOnCreate = ref)} onUploadImage={onUploadJobPicture}></UploadableAvatar>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        forceRender
        title="Edit job"
        visible={editJob_visible}
        onCancel={handleEditJobCancel}
        onOk={() => {
          formEdit.validateFields()
            .then(values => {
              onEditJob(values);
            })
            .catch(info => {
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
            label="Seniority level:"
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
            label="Cities:"
            name="cities"
            rules={[{ required: true, message: "City is required!" }]}
          >
            <AutoComplete style={{ width: '100%' }} options={autoCompleteEditCity} onChange={onChangeAutoCompleteEditCity}></AutoComplete>
          </Form.Item>

          <Form.Item
            initialValue="employee_type"
            label="Employee type:"
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
            <TextArea />
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

          <Form.Item label="Cover photo">
            <UploadableAvatar ref={ref => (uploadableAvatarRefOnEdit = ref)} onUploadImage={onUploadJobPicture}></UploadableAvatar>
          </Form.Item>
        </Form>
      </Modal>

      <Row gutter={16}>
        <Col span={12}>
          <Card style={{ marginTop: 24 }}>
            <Meta title={<Title level={3}>Specialties</Title>}></Meta>
            <List
              style={{ marginTop: 24 }}
              grid={{ column: 2 }}
              dataSource={companyBasicData.specialties}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Popconfirm
                        title="Do you wanna delete this?"
                        onConfirm={() => onConfirmDeleteSpeciality(item)}
                        okText="Yes"
                        cancelText="No">
                        <a>
                          <Badge
                            style={{ color: "red" }}
                            count={<MinusCircleOutlined />}
                          >
                            <Avatar src={info} />
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
                              <AutoComplete options={autoCompleteSpeciality} onChange={onChangeAutoCompleteSpeciality} placeholder="Speciality" ></AutoComplete>
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
            <Meta title={<Title level={3}>Cover Photo <Tooltip title="Feature sắp có"><Badge status="processing" /></Tooltip></Title>}></Meta>
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
