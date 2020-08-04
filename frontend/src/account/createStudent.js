import React from 'react'
import { Component } from 'react';
import { Form, DatePicker, Input, Button, Row, Col, Card, Layout } from 'antd';
import { studentServices } from "@/services"
import { BorderOutlined } from '@ant-design/icons';

function createStudent({history}){
    
    const onCreateFinish = values => {
        console.log(values);
        studentServices.createBasicStudent(values.student_first_name, values.student_last_name, values.student_dob, values.student_description).then()
        .then(() => {
            alert("Create successfully");
            history.push("/profile")
        })
        .catch(error =>{
            alert(error);
        });
    }
    
   // render(){
        return(
            <>
            <Row style = {{minHeight:100, backgroundColor:'darkcyan'}} align='middle'> 
                <Col span={24} style={{textAlign:'center', fontSize:35, color:'white'}}>
                    Thăm Ngàn Network
                </Col>
            </Row>
            <Row justify="center" style = {{paddingTop:24, backgroundColor:'azure'}}>
                <Col span={12} style={{display:'flex', flexDirection:'column', alignItems:'center', borderTop:'double'}}>
                    <Form style = {{maxWidth:300}} onFinish = {onCreateFinish}>
                        <Form.Item className = "student_first_name" style={{ marginTop: 32, fontWeight:600, fontSize:18 }} >
                             First name
                            <Input size='large' style={{width:350}} placeholder = "Your first name" />
                        </Form.Item>
                        <Form.Item className = "student_last_name" style={{ marginTop: 32, fontWeight:600, fontSize:18 }}>
                            Last name
                            <Input size='large' style={{width:350}} placeholder = "Your Last name" />
                        </Form.Item>
                        <Form.Item classname = "student_dob" style={{ marginTop: 32, fontWeight:600, fontSize:18 }} >
                            Date of birth 
                            <DatePicker size='large' style={{display:'block', width:350}} placeholder = "Your date of birth"/>
                        </Form.Item>
                        <Form.Item className = "student_description" style={{ marginTop: 32, fontWeight:600, fontSize:18 }}>
                            Description
                            <Input size='large' style={{width:350}} placeholder = "Your description"/>
                        </Form.Item>
                        <div style = {{marginBottom:32, marginTop:32}}>
                            <Button type="primary" size = 'large' htmlType="submit">Submit</Button>
                            <Button type="primary" size = 'large' style={{ marginLeft: 64 }} htmlType="cancel" >Cancel</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
            </>
        );
   // }
}
export {createStudent};