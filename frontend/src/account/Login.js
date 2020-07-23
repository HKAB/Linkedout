import React from 'react';
import {Row, Col} from 'antd';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

import leftLoginPicture from "./assets/login.svg"
import logo from "./assets/flower.png"

const { Title } = Typography;


const { Header, Content, Footer } = Layout;

function Login() {
	return (
		<>
		<Row align="middle">
			<Col span={10} offset={2}>
				<img src={leftLoginPicture} width="900px" height="900px"></img>
			</Col>
      		<Col span={4} offset={4}>
      			<div align="center" className="logo"><img src={logo} width="64" height="64"></img></div>
      			 <Title align="center">WELCOME TO uWu</Title>
      			<Form className="login-form">
      				<Form.Item name="username" rules={[{ required: true, message: 'Đừng để trống'}]}>
      					<Input size="large" prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"></Input>
      				</Form.Item>
      				<Form.Item name="password" rules={[{ required: true, message: 'Đừng để trống'}]}>
      					<Input size="large" type="password" prefix={<LockOutlined className="site-form-item-icon"/>} placeholder="Password"></Input>
      				</Form.Item>
      				<Form.Item>
	      				<Form.Item name="remember" valuePropName="checked" noStyle>
	      					<Checkbox>Remember me</Checkbox>
	      				</Form.Item>
	      				<a className="login-form-forgot">Forgot password?</a>
	      			</Form.Item>

	      			<Form.Item>
	      				<Button  type="primary" htmlType="submit" className="login-form-button">
	      					Login
	      				</Button>
	      			</Form.Item>
      			</Form>
      		</Col>
		</Row>
		</>)
};

export {Login};