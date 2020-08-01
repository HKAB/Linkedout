import React, {useEffect} from 'react';
import {Row, Col} from 'antd';
import { Tabs } from 'antd';
import { Typography } from 'antd';
import { Layout, Menu, Breadcrumb, Select } from 'antd';
import { Form, Input, Button, Checkbox, Modal } from 'antd';
import { UserOutlined, LockOutlined, UserAddOutlined, LoginOutlined, MailOutlined, ShopOutlined, SmileOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import { accountServices } from "@/services"

import leftLoginPicture from "./assets/login.svg"
import logo from "./assets/flower.png"

const { Option } = Select;
const { Title } = Typography;
const {	TabPane } = Tabs

const { Header, Content, Footer } = Layout;

function Login({ history }) {
	
	console.log(accountServices.userValue);
	useEffect( () => {
		if (accountServices.userValue) {
			alert("Ban da dang nhap roi, dang nhap lai lam gi???");
			history.push("/");
		}
	})

	const onLoginFinish = values => {
		// console.log(values);
		accountServices.login(values.login_username, values.login_password).then()
		.then(() => {
			Modal.success({title: "uWu", content: "Login successfully!!"});
			history.push("/profile");
		})
		.catch(error => {
			Modal.error({title: "uWu", content: "Login unsuccessfully!!"});
		})
	}

	const onRegisterFinish = values => {
		console.log(values);
		if (values.register_password !== values.register_repassword) {
			Modal.error({title: "uWu", content: "Password not match!"});
		}
		else if (!values.license_agreement)
		{
			Modal.warn({title: "uWu", content: "Not agree?!"});	
		}
		else {
			accountServices.register(values.register_username, values.register_email, values.register_password, values.register_account_type).then()
			.then(() => {
				Modal.success({title: "uWu", content: "Register successfully!! Now login :)"});
				//history.go();
				history.push("/createStudent");
			})
			.catch(error => {
				alert(error);
			});
		}
	}

	return (
		<>
		<Row align="middle">
			<Col span={10} offset={2}>
				<img src={leftLoginPicture} width="900px" height="900px"></img>
			</Col>
      		<Col span={4} offset={4}>
      			<div align="center" className="logo"><img src={logo} width="64" height="64"></img></div>
      			 <Title align="center">THĂM NGÀN NETWORK</Title>
      			 <Tabs centered>
      			 <TabPane key="1" tab={<span>Đăng nhập <LoginOutlined/></span>}>
	      			<Form className="login-form" onFinish={onLoginFinish}>
	      				<Form.Item name="login_username" rules={[{ required: true, message: 'Đừng để trống'}]}>
	      					<Input size="large" prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"></Input>
	      				</Form.Item>
	      				<Form.Item name="login_password" rules={[{ required: true, message: 'Đừng để trống'}]}>
	      					<Input.Password 
	      					size="large" 
	      					prefix={<LockOutlined className="site-form-item-icon"/>} 
	      					placeholder="Password"
	      					iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}></Input.Password>
	      				</Form.Item>
	      				<Form.Item>
		      				<Form.Item name="remember" valuePropName="checked" noStyle>
		      					<Checkbox>Remember me</Checkbox>
		      				</Form.Item>
		      				<a className="login-form-forgot" style={{float: 'right'}}>Forgot password?</a>
		      			</Form.Item>

		      			<Form.Item>
		      				<Button  type="primary" htmlType="submit" className="login-form-button">
		      					Login
		      				</Button>
		      			</Form.Item>
	      			</Form>
	      			</TabPane>
	      			<TabPane key="2" tab={<span>Đăng ký <UserAddOutlined/></span>}>
	      				<Form className="register-form" onFinish={onRegisterFinish}>
		      				<Form.Item name="register_username" rules={[{ required: true, message: 'Đừng để trống'}]}>
		      					<Input size="large" prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"></Input>
		      				</Form.Item>
		      				<Form.Item name="register_email" rules={[{ required: true, message: 'Đừng để trống'}]}>
		      					<Input size="large" prefix={<MailOutlined className="site-form-item-icon"/>} placeholder="Email"></Input>
		      				</Form.Item>
		      				<Form.Item name="register_account_type" rules={[{ required: true, message: 'Hãy chọn'}]}>
							      <Select placeholder="Who are you? Student or Company?">
							        <Option value="student"><SmileOutlined /> Student</Option>
							        <Option value="company"><ShopOutlined /> Company</Option>
							      </Select>
		      				</Form.Item>
		      				<Form.Item name="register_password" rules={[{ required: true, message: 'Đừng để trống'}]}>
		      					<Input.Password 
		      					size="large" 
		      					prefix={<LockOutlined className="site-form-item-icon"/>}
		      					placeholder="Password"
		      					iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}></Input.Password>
		      				</Form.Item>
		      				<Form.Item name="register_repassword" rules={[{ required: true, message: 'Đừng để trống'}]}>
		      					<Input size="large" type="password" prefix={<LockOutlined className="site-form-item-icon"/>} placeholder="Retype password"></Input>
		      				</Form.Item>
		      				<Form.Item name="license_agreement" valuePropName="checked" noStyle>
		      					<Checkbox>Với việc đăng ký, bạn đã chấp nhận mọi hậu quả sau khi đăng ký. List <a>hậu quả</a></Checkbox>
		      				</Form.Item>
			      			<Form.Item style={{paddingTop: 16}}>
			      				<Button type="primary" htmlType="submit" className="register-form-button">
			      					Register
			      				</Button>
			      			</Form.Item>
		      			</Form>
	      			</TabPane>
	      		</Tabs>
      		</Col>
		</Row>
		</>)
};

export {Login};