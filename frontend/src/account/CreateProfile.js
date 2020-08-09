import React,  { useState } from 'react'

import { Component } from 'react';
import { AutoComplete, Form, Spin, Select, Typography, Checkbox, DatePicker, Input, Button, Row, Col, Card, Layout, Space } from 'antd';
import { BorderOutlined } from '@ant-design/icons';
import { ArrowRightOutlined } from '@ant-design/icons';
import bg from './assets/createuser.svg';

import { accountServices } from "@/services"
import { studentServices } from "@/services"
import { companyServices } from "@/services"
import { getSpecialty } from "@/services"

import Autocomplete from 'react-autocomplete';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;


function CreateProfile({history}){
    const onCreateBasicStudentFinish = values => {
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
                history.push("/profile")
        }
        else
            history.push("/login");
    }

    const onCreateBasicCompanyFinish = values => {
        const user = accountServices.userValue;

        if (user)
        {
            if (user.account.account_type == "company") {
                console.log(values);
                companyServices.createBasicCompany(values.name, values.website, [values.specialities], values.description)
                .then(() => {
                    alert("Create successfully");
                    history.push("/profile")
                })
                .catch(error =>{
                    alert(error);
                });
            }
        }
        else
            history.push("/login");
    }

    const [autoCompleteValue, setAutoCompleteValue] = useState("");
    const [autoCompleteSpeciality, setSpeciality] = useState([]);
    const onChange = (data) => {
        if (data)
        {
            setAutoCompleteValue(data);
            
            getSpecialty(data).then( data => {
                console.log(data.tag.map(x => ({value: x})));
                setSpeciality(data.tag.map(x => ({value: x})));
            })
            .catch(error => {
                alert(error);
            })
        }
        else {
            setSpeciality([]);
        }

    }

    const formStudent = (
        <Form onFinish={onCreateBasicStudentFinish} className="create-basic-student-form">
        <Form.Item name="firstname" rules={[{ required: true, message: 'Đừng để trống'}]}>
            <Input size="large" placeholder="Họ"></Input>
        </Form.Item>

        <Form.Item name="lastname" rules={[{ required: true, message: 'Đừng để trống'}]}>
            <Input size="large" placeholder="Tên"></Input>
        </Form.Item>

        <Form.Item name="dateofbirth" rules={[{ required: true, message: 'Đừng để trống'}]}>
                <DatePicker style={{width: "100%"}} picker="date" size="large" placeholder="Sinh nhật bạn"/>
        </Form.Item>

        <Form.Item name="description" rules={[{ required: true, message: 'Đừng để trống'}]}>
            <Input size="large" placeholder="Miêu tả về bạn"></Input>
        </Form.Item>

        <Form.Item style={{textAlign: "center"}}>
            <Button size="large" htmlType="submit" type="primary" shape="circle" icon={<ArrowRightOutlined />} />
        </Form.Item>
    </Form>
    );

    const formCompany = (
        <Form onFinish={onCreateBasicCompanyFinish} className="create-basic-company-form">
        <Form.Item name="name" rules={[{ required: true, message: 'Đừng để trống'}]}>
            <Input size="large" placeholder="Tên công ty"></Input>
        </Form.Item>

        <Form.Item name="website" rules={[{ required: true, message: 'Đừng để trống'}]}>
            <Input size="large" placeholder="Website"></Input>
        </Form.Item>

        <Form.Item name="specialities" rules={[{ required: true, message: 'Đừng để trống'}]}>
            {/* <Input size="large" placeholder="Chuyên môn công ty"></Input> */}
            <AutoComplete size="large" options={autoCompleteSpeciality} onChange={onChange} placeholder="Chuyên môn chính của công ty" ></AutoComplete>
        </Form.Item>

        <Form.Item name="description" rules={[{ required: true, message: 'Đừng để trống'}]}>
            <Input size="large" placeholder="Miêu tả ngắn về công ty bạn"></Input>
        </Form.Item>

        <Form.Item style={{textAlign: "center"}}>
            <Button size="large" htmlType="submit" type="primary" shape="circle" icon={<ArrowRightOutlined />} />
        </Form.Item>
    </Form>
    )
    
    const user = accountServices.userValue;
    var renderForm;
	if (user)
	{
		if (user.account.account_type == "student")
            renderForm = formStudent;
		else
            renderForm = formCompany;
    }
    else {
        return (<Spin></Spin>);
    }


    return(
        <div style={{backgroundImage: "url(" + bg + ")", backgroundRepeat: "no-repeat", minHeight: "100vh", minWidth: "100vw", backgroundPosition: "center"}} className="create-user-container">
            <Row>
                <Col span={4} offset={10} style={{marginTop: "10vh"}}>
                    <Card style={{boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" }}>
                        <Title level={1}>Tell us more about you!</Title>
                        {renderForm}
                    </Card>
                </Col>
            </Row>
        </div>
    );
   // }
}
export { CreateProfile };