import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, LoginOutlined, MailOutlined, ShopOutlined, SmileOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Col, Form, Input, message, Modal, Row, Select, Tabs, Typography } from 'antd';
import React, { useEffect } from 'react';
import { accountServices } from "services";
import leftLoginPicture from "./assets/leftLogin.svg";
import logo from "../home/assets/images/logo.svg";

const { Option } = Select;
const { Title } = Typography;
const { TabPane } = Tabs

function Login({ history }) {
  useEffect(() => {
    if (accountServices.userValue) {
      message.error('You are already log in!');
      history.push("/");
    }
  })

  const onLoginFinish = values => {
    accountServices.login(values.login_username, values.login_password)
      .then((user) => {
        history.push("/profile");
      })
      .catch(error => {
        Modal.error({ title: "uWu", content: "Login unsuccessfully!!" });
      })
  }

  const onRegisterFinish = values => {
    if (values.register_password !== values.register_repassword) {
      Modal.error({ title: "uWu", content: "Password not match!" });
    }
    else if (!values.license_agreement) {
      Modal.warn({ title: "uWu", content: "Not agree?!" });
    }
    else {
      accountServices.register(values.register_username, values.register_email, values.register_password, values.register_account_type).then()
        .then(() => {
          Modal.success({ title: "uWu", content: "Register successfully!! Now gimme some infomation :)" });
          accountServices.login(values.register_username, values.register_password)
            .then(() => {
              history.push("/create-profile");
            })
            .catch(error => {
              Modal.error({ title: "uWu", content: "Register unsuccessfully!! Plz try again later" });
            })
        })
        .catch(error => {
          alert(error);
        });
    }
  }

  return (
    <>
      <Row align="middle" style={{ minHeight: "100vh" }}>
        <Col span={10} offset={3}>
          <img src={leftLoginPicture} style={{ minWidth: "40vw", minHeight: "40vh" }}></img>
        </Col>
        <Col span={5} offset={3}>
          <Card style={{ boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" }}>
            <div align="center" className="logo"><img src={logo} width="64" height="64"></img></div>
            <Title align="center">THĂM NGÀN NETWORK</Title>
            <Tabs centered>
              <TabPane key="1" tab={<span>Đăng nhập <LoginOutlined /></span>}>
                <Form className="login-form" onFinish={onLoginFinish}>
                  <Form.Item name="login_username" rules={[{ required: true, message: 'Đừng để trống' }]}>
                    <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username"></Input>
                  </Form.Item>
                  <Form.Item name="login_password" rules={[{ required: true, message: 'Đừng để trống' }]}>
                    <Input.Password
                      size="large"
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      placeholder="Password"
                      iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}></Input.Password>
                  </Form.Item>
                  <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <a className="login-form-forgot" style={{ float: 'right' }}>Forgot password?</a>
                  </Form.Item>

                  <Form.Item>
                    <Button shape="round" type="primary" htmlType="submit" className="login-form-button">
                      Đăng nhập
		      				</Button>
                  </Form.Item>
                </Form>
              </TabPane>
              <TabPane key="2" tab={<span>Đăng ký <UserAddOutlined /></span>}>
                <Form className="register-form" onFinish={onRegisterFinish}>
                  <Form.Item name="register_username" rules={[{ required: true, message: 'Đừng để trống' }]}>
                    <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username"></Input>
                  </Form.Item>
                  <Form.Item name="register_email" rules={[{ required: true, message: 'Đừng để trống' }]}>
                    <Input size="large" prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email"></Input>
                  </Form.Item>
                  <Form.Item name="register_account_type" rules={[{ required: true, message: 'Hãy chọn' }]}>
                    <Select placeholder="Who are you? Student or Company?">
                      <Option value="student"><SmileOutlined /> Student</Option>
                      <Option value="company"><ShopOutlined /> Company</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="register_password" rules={[{ required: true, message: 'Đừng để trống' }]}>
                    <Input.Password
                      size="large"
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      placeholder="Password"
                      iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}></Input.Password>
                  </Form.Item>
                  <Form.Item name="register_repassword" rules={[{ required: true, message: 'Đừng để trống' }]}>
                    <Input size="large" type="password" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Retype password"></Input>
                  </Form.Item>
                  <Form.Item name="license_agreement" valuePropName="checked" noStyle>
                    <Checkbox>Với việc đăng ký, bạn đã chấp nhận mọi hậu quả sau khi đăng ký. List <a>hậu quả</a></Checkbox>
                  </Form.Item>
                  <Form.Item style={{ paddingTop: 16 }}>
                    <Button shape="round" type="primary" htmlType="submit" className="register-form-button">
                      Đăng ký
			      				</Button>
                  </Form.Item>
                </Form>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </>)
};

export { Login };

