import { ArrowRightOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Card, Col, DatePicker, Form, Input, message, Row, Select, Spin, Typography } from 'antd';
import React, { useState } from 'react';
import { accountServices, companyServices, getSpecialty, studentServices } from "services";
import bg from './assets/createuser.svg';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

function CreateProfile({ history }) {
  const onCreateBasicStudentFinish = values => {
    const user = accountServices.userValue;

    if (user) {
      if (user.account.account_type == "student") {
        studentServices.createBasicStudent(values.firstname, values.lastname, values.dateofbirth.format("YYYY-MM-DD"), values.description, values.gender).then() // quick fix
          .then(() => {
            message.success("Create successfully!")
            history.push("/profile")
          })
          .catch(error => {
            alert(error);
          });
      }
      history.push("/profile")
    }
    else
      history.push("/login");
  }

  const onCreateBasicCompanyFinish = values => {
    const user = accountServices.userValue;

    if (user) {
      if (user.account.account_type == "company") {
        companyServices.createBasicCompany(values.name, values.website, [values.specialities], values.description)
          .then(() => {
            message.success("Create successfully")
            history.push("/profile")
          })
          .catch(error => {
            message.error(error);
          });
      }
    }
    else
      history.push("/login");
  }

  const [autoCompleteValue, setAutoCompleteValue] = useState("");
  const [autoCompleteSpeciality, setSpeciality] = useState([]);
  const onChange = (data) => {
    if (data) {
      setAutoCompleteValue(data);

      getSpecialty(data).then(data => {
        setSpeciality(data.tag.map(x => ({ value: x })));
      })
        .catch(error => {
          message.error(error);
        })
    }
    else {
      setSpeciality([]);
    }

  }

  const formStudent = (
    <Form onFinish={onCreateBasicStudentFinish} className="create-basic-student-form">
      <Form.Item name="firstname" rules={[{ required: true, message: "Can't be blank" }]}>
        <Input size="large" placeholder="First Name"></Input>
      </Form.Item>

      <Form.Item name="lastname" rules={[{ required: true, message: "Can't be blank" }]}>
        <Input size="large" placeholder="Last Name"></Input>
      </Form.Item>

      <Form.Item name="dateofbirth" rules={[{ required: true, message: "Can't be blank" }]}>
        <DatePicker style={{ width: "100%" }} picker="date" size="large" placeholder="Date of birth" />
      </Form.Item>

      <Form.Item name="gender" rules={[{ required: true, message: "Can't be blank" }]}>
        <Select placeholder="Gender" style={{ width: "100%" }}>
          <Option value="Male">Male</Option>
          <Option value="Female">Female</Option>
          <Option value="Secret">Other</Option>
        </Select>
      </Form.Item>

      <Form.Item name="description" rules={[{ required: true, message: "Can't be blank" }]}>
        <Input size="large" placeholder="Description"></Input>
      </Form.Item>

      <Form.Item style={{ textAlign: "center" }}>
        <Button size="large" htmlType="submit" type="primary" shape="circle" icon={<ArrowRightOutlined />} />
      </Form.Item>
    </Form>
  );

  const formCompany = (
    <Form onFinish={onCreateBasicCompanyFinish} className="create-basic-company-form">
      <Form.Item name="name" rules={[{ required: true, message: "Can't be blank" }]}>
        <Input size="large" placeholder="Company Name"></Input>
      </Form.Item>

      <Form.Item name="website" rules={[{ required: true, message: "Can't be blank" }]}>
        <Input size="large" placeholder="Website"></Input>
      </Form.Item>

      <Form.Item name="specialities" rules={[{ required: true, message: "Can't be blank" }]}>
        {/* <Input size="large" placeholder="Chuyên môn công ty"></Input> */}
        <AutoComplete size="large" options={autoCompleteSpeciality} onChange={onChange} placeholder="Specialities" ></AutoComplete>
      </Form.Item>

      <Form.Item name="description" rules={[{ required: true, message: "Can't be blank" }]}>
        <Input size="large" placeholder="Description"></Input>
      </Form.Item>

      <Form.Item style={{ textAlign: "center" }}>
        <Button size="large" htmlType="submit" type="primary" shape="circle" icon={<ArrowRightOutlined />} />
      </Form.Item>
    </Form>
  )

  const user = accountServices.userValue;
  var renderForm;
  if (user) {
    if (user.account.account_type == "student")
      renderForm = formStudent;
    else
      renderForm = formCompany;
  }
  else {
    return (<Spin></Spin>);
  }


  return (
    <div style={{ backgroundImage: "url(" + bg + ")", backgroundRepeat: "no-repeat", minHeight: "100vh", minWidth: "100vw", backgroundPosition: "center" }} className="create-user-container">
      <Row>
        <Col span={4} offset={10} style={{ marginTop: "10vh" }}>
          <Card style={{ boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" }}>
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

