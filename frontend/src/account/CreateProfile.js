import React from 'react'
import { Component } from 'react';
import { Form, Select, Typography, Checkbox, DatePicker, Input, Button, Row, Col, Card, Layout, Space } from 'antd';
import { studentServices } from "@/services"
import { BorderOutlined } from '@ant-design/icons';
import { ArrowRightOutlined } from '@ant-design/icons';
import bg from './assets/createuser.svg';

import { accountServices } from "@/services"

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;


function CreateProfile({history}){
    
    const onCreateBasicFinish = values => {
        const user = accountServices.userValue;

        if (user)
        {
            if (user.account.account_type == "student") {
                console.log(values);
                studentServices.createBasicStudent(values.firstname, values.lastname, values.dateofbirth.format("YYYY-MM-DD"), values.description).then()
                .then(() => {
                    alert("Create successfully");
                    history.push("/profile")
                })
                .catch(error =>{
                    alert(error);
                });
            }
            else
                console.log("chua lam company yet!");
        }
        else
            history.push("/login");
    }
    
   // render(){
        return(
            <div style={{backgroundImage: "url(" + bg + ")", backgroundRepeat: "no-repeat", minHeight: "100vh", minWidth: "100vw", backgroundPosition: "center"}} className="create-user-container">
                <Row>
                    <Col span={4} offset={10} style={{marginTop: "10vh"}}>
                        <Card style={{boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" }}>
                            <Title level={1}>Tell us more about you!</Title>
                            <Form onFinish={onCreateBasicFinish} className="create-basic-form">
                                <Form.Item name="firstname" rules={[{ required: true, message: 'Đừng để trống'}]}>
                                    <Input size="large" placeholder="First Name"></Input>
                                </Form.Item>

                                <Form.Item name="lastname" rules={[{ required: true, message: 'Đừng để trống'}]}>
                                    <Input size="large" placeholder="Last name"></Input>
                                </Form.Item>

                                <Form.Item name="dateofbirth" rules={[{ required: true, message: 'Đừng để trống'}]}>
                                        <DatePicker style={{width: "100%"}} picker="date" size="large" placeholder="Your birth day"/>
                                </Form.Item>

                                <Form.Item name="description" rules={[{ required: true, message: 'Đừng để trống'}]}>
                                    <Input size="large" placeholder="A short description"></Input>
                                </Form.Item>

                                <Form.Item style={{textAlign: "center"}}>
                                    <Button size="large" htmlType="submit" type="primary" shape="circle" icon={<ArrowRightOutlined />} />
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
   // }
}
export { CreateProfile };