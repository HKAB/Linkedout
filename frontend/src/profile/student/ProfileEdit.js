import { Avatar, Button, Card, Col, DatePicker, Form, Input, Menu, message, Modal, Row, Select, Space, Switch, Tabs, Upload } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { accountServices, studentServices } from "services";
import { Config } from "../../config/consts";

const { Option } = Select;
const dateFormat = 'YYYY-MM-DD';

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

function ProfileEdit() {

  const [disabled, setDisabled] = useState([]);
  const [basicProfileData, setBasicProfileData] = useState([]);
  const [emailData, setEmailData] = useState([]);
  const [phoneData, setPhoneData] = useState([]);
  const [loading, setLoading] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFormData, setImageFormData] = useState([]);

  const [formEditBasicInfo] = Form.useForm();

  const handleChangeAvatar = info => {
    setImageFormData(info.file);
    getBase64(info.file.originFileObj, picture =>
      setImageUrl(picture)
    );
  };

  const onUploadImage = (data) => {
    let multipart_formdata = { "file": data.file }
    studentServices.uploadStudentPictureProfile(multipart_formdata)
      .then(() => {
        message.success("Upload avatar successful!");
      });
  }

  useEffect(() => {
    let user = accountServices.userValue;
    if (user) {
      studentServices.getStudent(user.account.id);
      const subscription = studentServices.studentObject.subscribe((student) => {
        if (student) {
          student.basic_data.profile_picture = Config.backendUrl + student.basic_data.profile_picture;
          setBasicProfileData(student.basic_data);
          setEmailData(student.email);
          setPhoneData(student.phone);
          // if (formRef.current) formRef.current.resetFields();
          console.log(basicProfileData)
          console.log(student.basic_data.profile_picture);
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
  const editProfileStudent = values => {
    studentServices.updateBasicStudent(
      values.firstName,
      values.lastName,
      values.dateOfBirth.format("YYYY-MM-DD"),
      values.gender,
      values.description
    )
      .then(() => {
        studentServices.getStudent(accountServices.userValue.account.id);
        message.success({ title: "uWu", content: "Cập nhật thông tin cơ bản!" });
      })
      .catch((error) => {
        console.log(error);
        message.error({ title: "uWu", content: error });
      });

    if (phoneData[0] != values.phoneNumber) {
      if (!phoneData[0]) {
        studentServices.createStudentPhone(
          values.phoneNumber
        )
          .then(() => {
            studentServices.getStudent(accountServices.userValue.account.id);
            message.success({ title: "uWu", content: "Cập nhật số điện thoại!" });
          })
          .catch((error) => {
            console.log(error);
            message.error({ title: "uWu", content: error });
          });
      }
      else {
        studentServices
          .updateStudentPhone(
            phoneData[0],
            values.phoneNumber,
          )
          .then(() => {
            studentServices.getStudent(accountServices.userValue.account.id);
            message.success({ title: "uWu", content: "Thêm số điện thoại!" });
          })
          .catch((error) => {
            console.log(error);
            message.error({ title: "uWu", content: error });
          });
      }
    }

    if (emailData[0] != values.email) {
      studentServices
        .updateStudentEmail(
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
  const onFinishChangePass = values => {
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


  // let imgPreview;
  // if (imageUrl!=null) {
  //     imgPreview = <Avatar style={{width: 180, height: 180, marginBottom:10}} src={imageUrl} alt=''></Avatar>
  // }
  // else 
  // {
  //     imgPreview= <Avatar style={{width: 180, height: 180, marginBottom:10}} src={Config.backendUrl + basicProfileData.profile_picture} ></Avatar>
  // }


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
                onFinish={editProfileStudent}
                style={{ marginTop: 32 }}
                initialValues={{
                  firstName: basicProfileData.firstname,
                  lastName: basicProfileData.lastname,
                  gender: basicProfileData.gender,
                  email: emailData[0],
                  dateOfBirth: moment(basicProfileData.dateofbirth, dateFormat),
                  phoneNumber: phoneData[0],
                  description: basicProfileData.description
                }}
              >

                <span>First Name</span>
                <Form.Item name="firstName" >
                  <Input></Input>
                </Form.Item>
                <span>Last Name</span>
                <Form.Item name="lastName" >
                  <Input></Input>
                </Form.Item>

                <span>Giới tính </span>
                <Form.Item name="gender" >
                  <Select style={{ width: "100%" }}>
                    <Option value="Male">Nam</Option>
                    <Option value="Female">Nữ</Option>
                    <Option value="Secret">Ơ đằng kia có gì kìa</Option>
                  </Select>
                </Form.Item>

                <span>Email</span>
                <Form.Item name="email" >
                  <Input ></Input>
                </Form.Item>

                <span>Date of birth</span>
                <Form.Item name="dateOfBirth">
                  <DatePicker style={{ width: "100%" }} format={dateFormat} />
                </Form.Item>

                <span>Phone Number</span>
                <Form.Item name="phoneNumber"  >
                  <Input />
                </Form.Item>

                <span>Short description</span>
                <Form.Item name="description" >
                  <Input />
                </Form.Item>

                <Button type="primary" htmlType="submit">Lưu</Button>
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
        <TabPane tab="Đổi mật khẩu" key="3" style={{ marginTop: 20 }}   >
          <span style={{ fontWeight: "bold" }}>Đổi mật khẩu</span>
          <Row>
            <Col span={10} offset={4}>
              <Form
                onFinish={onFinishChangePass}
                style={{ marginTop: 32 }} >
                <span>Mật khẩu cũ</span>
                <Form.Item name="oldPass" rules={[{ required: true, message: 'Đừng để trống' }]}>
                  <Input.Password placeholder="Nhập mật khẩu cũ"  ></Input.Password>
                </Form.Item>

                <span>Mật khẩu mới</span>
                <Form.Item name="newPass" rules={[{ required: true, message: 'Đừng để trống' }]}>
                  <Input.Password placeholder="Nhập mật khẩu mới"  ></Input.Password>
                </Form.Item>

                <span>Nhập lại mật khẩu cũ</span>
                <Form.Item name="confPass" rules={[{ required: true, message: 'Đừng để trống' }]}>
                  <Input.Password placeholder="Nhập lại mật khẩu mới" ></Input.Password>
                </Form.Item>

                <Space>
                  <Button type="primary" htmlType="submit" >Lưu</Button>
                </Space>
              </Form>
            </Col>
            <Col span={10}></Col>
          </Row>
        </TabPane>
        <TabPane tab="Cài đặt" key="2" style={{ marginTop: 20 }}>
          <span style={{ fontWeight: "bold" }}>Cài đặt</span>
          <Row style={{ marginTop: 56 }}>
            <Col span={20} offset={4}>
              <span>Thông báo</span>
              <Switch style={{ position: 'absolute', right: 64 }} checkedChildren="ON" unCheckedChildren="OFF" defaultChecked onClick={changeDisabled} />
            </Col>
          </Row>
        </TabPane>

      </Tabs>
    </Card>


  );
}

export { ProfileEdit };
