import {
  MinusCircleOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { Avatar, Button, Card, Col, Form, Input, List, Menu, message, Modal, Popconfirm, Row, Space, Switch, Tabs, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { accountServices, companyServices } from "services";
import { Config } from "../../config/consts";

const { TabPane } = Tabs;
const color = (
  <Menu style={{ marginLeft: 450 }}>
    <Button key='3' title="Orange" style={{ backgroundColor: "rgb(250,173,20" }}>Orange</Button>
    <Button key='4' title="Daybreak Blue" style={{ backgroundColor: 'rgb(24,144,255)' }}>LBlue</Button>
    <Button key='5' title="Red" style={{ backgroundColor: "rgb(245,34,45)" }}>Red</Button>
    <Button key='6' title="Volcano" style={{ backgroundColor: "rgb(250,84,28)" }}>Volc</Button>
    <Button key='7' title="Cyan" style={{ backgroundColor: "rgb(19,194,194)" }}>Cyan</Button>
    <Button key='8' title="Green" style={{ backgroundColor: "rgb(82,196,26)" }}>Green</Button>
    <Button key='9' title="Geek Blue" style={{ backgroundColor: "rgb(47,84,235)" }}>GBlue</Button>
    <Button key='10' title="Purple" style={{ backgroundColor: "rgb(114,46,209)" }}>Purple</Button>
  </Menu>
)

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

const onConfirmDeletePhone = (values) => {
  console.log(values);
  companyServices.deleteCompanyPhone(values)
    .then(() => {
      companyServices.getCompany(accountServices.userValue.account.id);
      message.success({ title: "uWu", content: "Phone deleted!" });
    })
    .catch((error) => {
      console.log(error);
      message.error({ title: "uWu", content: error });
    });
}

const onConfirmDeleteEmail = (values) => {
  console.log(values);
  companyServices.deleteCompanyEmail(values)
    .then(() => {
      companyServices.getCompany(accountServices.userValue.account.id);
      message.success({ title: "uWu", content: "Email deleted!" });
    })
    .catch((error) => {
      console.log(error);
      message.error({ title: "uWu", content: error });
    });
}

function ProfileEdit() {

  const [disabled, setDisabled] = useState([]);
  const [basicProfileData, setBasicProfileData] = useState([]);
  const [emailData, setEmailData] = useState([]);
  const [phoneData, setPhoneData] = useState([]);
  const [loading, setLoading] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const [formEditBasicInfo] = Form.useForm();
  const [formAddPhone] = Form.useForm();
  const [formAddEmail] = Form.useForm();

  const onAddPhoneFinish = (values) => {
    values.phone_info.forEach((phone_info) => {
      companyServices.createCompanyPhone(phone_info.phone)
        .then(() => {
          console.log(phone_info.phone);
          companyServices.getCompany(accountServices.userValue.account.id);
          Modal.success({ title: "uWu", content: "Phone created!" });
          formAddPhone.resetFields();
        })
        .catch((error) => {
          console.log(error);
          Modal.error({ title: "uWu", content: error });
        });
    })
  };

  const onAddEmailFinish = (values) => {
    console.log(values);
    values.email_info.forEach((email_info) => {
      companyServices.createCompanyEmail(email_info.email)
        .then(() => {
          console.log(email_info.email);
          companyServices.getCompany(accountServices.userValue.account.id);
          Modal.success({ title: "uWu", content: "Email created!" });
          formAddEmail.resetFields();
        })
        .catch((error) => {
          console.log(error);
          Modal.error({ title: "uWu", content: error });
        });
    })
  };

  const handleChangeAvatar = info => {
    getBase64(info.file.originFileObj, picture =>
      setImageUrl(picture)
    );
  };

  const onUploadImage = (data) => {
    companyServices.uploadCompanyPictureProfile(data)
      .then(() => {
        message.success("Upload avatar successful!");
      });
  }

  useEffect(() => {
    let user = accountServices.userValue;
    console.log(user);
    if (user) {
      companyServices.getCompany(user.account.id);
      const subscription = companyServices.companyObject
        .subscribe((company) => {
          if (company) {
            company.basic_data.profile_picture = Config.backendUrl + company.basic_data.profile_picture;
            setBasicProfileData(company.basic_data);
            setEmailData(company.email);
            setPhoneData(company.phone);
            formEditBasicInfo.resetFields();
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

  const changeDisabled = () => {
    setDisabled(!disabled);
  }
  const editProfileCompany = values => {
    console.log(values);
    companyServices
      .updateBasicCompany(
        values.name,
        values.website,
        values.specialties,
        basicProfileData.description
      )
      .then(() => {
        companyServices.getCompany(accountServices.userValue.account.id);
        message.success({ title: "\^o^/", content: "Cập nhật thông tin cơ bản!" });
      })
      .catch((error) => {
        console.log(error);
        message.error({ title: "\^o^/", content: error });
      });
    
    if (phoneData[0] != values.phoneNumber) {
    if (!phoneData[0]) {
      companyServices
        .createCompanyPhone(
          values.phoneNumber
        )
        .then(() => {
          companyServices.getCompany(accountServices.userValue.account.id);
          message.success({ title: "\^o^/", content: "Thêm số điện thoại!" });
        })
        .catch((error) => {
          console.log(error);
          message.error({ title: "\^o^/", content: error });
        });
    }
    else {
      companyServices
        .updateCompanyPhone(
          phoneData[0],
          values.phoneNumber,
        )
        .then(() => {
          companyServices.getCompany(accountServices.userValue.account.id);
          message.success({ title: "\^o^/", content: "Cập nhật số điện thoại!" });
        })
        .catch((error) => {
          console.log(error);
          message.error({ title: "\^o^/", content: error });
        });
    }
  }

  if (emailData[0] != values.email) {
    if (!emailData[0]) {
      companyServices
        .createCompanyEmail(
          values.email,
        )
        .then(() => {
          message.success({ title: "\^o^/", content: "Thêm email!" });
        })
        .catch((error) => {
          console.log(error);
          message.error({ title: "╯︿╰", content: error });
        });
    }
    else {
      companyServices
        .updateCompanyEmail(
          emailData[0],
          values.email,
        )
        .then(() => {
          message.success({ title: "\^o^/", content: "Cập nhật email!" });
        })
        .catch((error) => {
          console.log(error);
          message.error({ title: "╯︿╰", content: error });
        });
    }
  }


  }
  const onFinishChangePass = values => {
    console.log(values.newPass, values.oldPass);
    if (values.newPass !== values.confPass) {
      Modal.error({ title: "╯︿╰", content: 'Password not match!' });
    } else {
      accountServices.changePassword(values.oldPass, values.newPass).then()
        .then(() => {
          Modal.success({ title: "\^o^/", content: "Change Password successfully!!!" });
        })
        .catch((error) => {
          Modal.error({ title: "╯︿╰", content: error });
        })
    }
  }

  return (
    <Card style={{ marginTop: "10vh", minHeight: "60vh" }}>
      <Tabs tabPosition="left" style={{ marginLeft: 24 }}>
        <TabPane tab="Thông tin tài khoản" key="1" style={{ marginTop: 20 }}>
          <span style={{ fontWeight: "bold" }}>THÔNG TIN TÀI KHOẢN</span>
          <Row>

            <Col span={10} offset={4}>
              <Form
                // ref={formRef}
                form={formEditBasicInfo}
                onFinish={editProfileCompany}
                style={{ marginTop: 32 }}
                initialValues={{
                  name: basicProfileData.name,
                  website: basicProfileData.website,
                  email: emailData[0],
                  specialties: basicProfileData.specialties,
                  phoneNumber: phoneData[0],
                }}
              >

                <span>Company Name</span>
                <Form.Item name="name" >
                  <Input></Input>
                </Form.Item>

                <span>Website</span>
                <Form.Item name="website" >
                  <Input ></Input>
                </Form.Item>


                <span>Email</span>
                <Form.Item name="email" >
                  <Input ></Input>
                </Form.Item>

                <span>Phone Number</span>
                <Form.Item name="phoneNumber"  >
                  <Input />
                </Form.Item>
                <span>Specialties</span>
                <Form.Item name="specialties"  >
                  <Input />
                </Form.Item>

                <Button type="primary" htmlType="submit">Save</Button>
                <Button type="primary" style={{ marginLeft: 16 }} htmlType="cancel" >Cancel</Button>
              </Form>
            </Col>
            <Col span={10} style={{ textAlign: "center" }}>
              <Space style={{ marginTop: 32 }} direction="vertical">
                <Upload
                  name="avatar"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  onChange={handleChangeAvatar}
                  customRequest={onUploadImage}
                >
                  <Avatar style={{ width: 180, height: 180, marginBottom: 10 }} src={imageUrl ? imageUrl : basicProfileData.profile_picture} alt=''></Avatar>
                </Upload>
              </Space>
            </Col>
          </Row>

        </TabPane>
        <TabPane tab="Change Password" key="3" style={{ marginTop: 20 }}   >
          <span style={{ fontWeight: "bold" }}>CHANGE PASSWORD</span>
          <Row>
            <Col span={10} offset={4}>
              <Form
                onFinish={onFinishChangePass}
                style={{ marginTop: 32 }} >
                <span> Old Password</span>
                <Form.Item name="oldPass" rules={[{ required: true, message: 'Đừng để trống' }]}>
                  <Input.Password placeholder="Old Password"  ></Input.Password>
                </Form.Item>

                <span>New Password</span>
                <Form.Item name="newPass" rules={[{ required: true, message: 'Đừng để trống' }]}>
                  <Input.Password placeholder="New Password"  ></Input.Password>
                </Form.Item>

                <span> Confirm Password</span>
                <Form.Item name="confPass" rules={[{ required: true, message: 'Đừng để trống' }]}>
                  <Input.Password placeholder="Confirm Password" ></Input.Password>
                </Form.Item>

                <Space>
                  <Button type="primary" htmlType="submit" >Save</Button>
                  <Button type="primary" htmlType="cancel" >Cancel</Button>
                </Space>
              </Form>
            </Col>
            <Col span={10}></Col>
          </Row>
        </TabPane>
        <TabPane tab="Settings" key="2" style={{ marginTop: 20 }}>
          <span style={{ fontWeight: "bold" }}>SETTINGS</span>
          <Row style={{ marginTop: 56 }}>
            <Col span={20} offset={4}>
              <span>Notification</span>
              <Switch style={{ position: 'absolute', right: 64 }} checkedChildren="ON" unCheckedChildren="OFF" defaultChecked onClick={changeDisabled} />
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="Phone and Email" key="4" style={{ marginTop: 20 }}>
          <span style={{ fontWeight: "bold" }}>PHONE AND EMAIL</span>
          <Row gutter={12, 12}>
            <Col span={12}>
              <Card title="Phone">
                <List
                  //style={{ marginTop: 24 }}
                  itemLayout="horizontal"
                  dataSource={phoneData}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        title={item}
                      />

                      <Popconfirm
                        title="Bạn có muốn xóa cái này?"
                        onConfirm={() => onConfirmDeletePhone(item)}
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
                    name="add-phone"
                    autoComplete="off"
                    onFinish={onAddPhoneFinish}
                    form={formAddPhone}
                  >
                    <Form.List name="phone_info">
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
                                <Col span={20}>
                                  <Form.Item
                                    {...field}
                                    name={[field.name, "phone"]}
                                    fieldKey={[field.fieldKey, "phone"]}
                                    rules={[{ required: true, message: "Missing phone", }]}
                                  >
                                    <Input />
                                  </Form.Item>
                                </Col>

                                <Col span={1}>
                                  <Button
                                    type="dashed"
                                    shape="circle"
                                    style={{ color: 'red' }}
                                    icon={<MinusCircleOutlined />}
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
                                <PlusOutlined /> Add Phone
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
            </Col>
            <Col span={12}>
              <Card title="Email">
                <List
                  //style={{ marginTop: 24 }}
                  itemLayout="horizontal"
                  dataSource={emailData}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        title={item}
                      />

                      <Popconfirm
                        title="Bạn có muốn xóa cái này?"
                        onConfirm={() => onConfirmDeleteEmail(item)}
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
                    name="add-email"
                    autoComplete="off"
                    onFinish={onAddEmailFinish}
                    form={formAddEmail}
                  >
                    <Form.List name="email_info">
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
                                <Col span={20}>
                                  <Form.Item
                                    {...field}
                                    name={[field.name, "email"]}
                                    fieldKey={[field.fieldKey, "email"]}
                                    rules={[{ required: true, message: "Missing email", }]}
                                  >
                                    <Input />
                                  </Form.Item>
                                </Col>

                                <Col span={1}>
                                  <Button
                                    type="dashed"
                                    shape="circle"
                                    style={{ color: 'red' }}
                                    icon={<MinusCircleOutlined />}
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
                                <PlusOutlined /> Add Email
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
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </Card>


  );
}

export { ProfileEdit };
