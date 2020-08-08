import React from 'react';
import { Card, Avatar, Typography, Row, Col, Tag, Divider } from 'antd';
const { Title, Text } = Typography;


function StudentProfile() {
  const [basicProfileData, setBasicProfiledata] = React.useState({
    profile_picture: "https://i1.sndcdn.com/avatars-000012099000-3lw6y7-t200x200.jpg",
    firstname: "Hai",
    lastname: "Tung",
    description: "meow, no pain"
  })

  const [notBasicProfileData, setNotBasicProfileData] = React.useState({
    title: "Student at UET-VNU",
    currentGPA: "3.1",
    realGPA: "10"
  })

  const [studentSkills, setStudentSkill] = React.useState([
    "Python", "Golang", "Java", "Javascript", "LMAO"
  ])

  return (
    <Card className="card-info" style={{ width: 300, height: 600, margintop: 24 }}>
      <Row justify="center">
        <Col>
          <div style={{ textAlign: "center" }}>
            <Avatar style={{ marginBottom: 32 }} size={128} src={/*"http://127.0.0.1:8000" +*/ basicProfileData.profile_picture} onError={(e) => { console.log(e); }}></Avatar>
            <Title level={2} className="user-fullname">{basicProfileData.firstname + " " + basicProfileData.lastname}</Title>
            <Text classname="user-quotes">{basicProfileData.description}</Text>
          </div>
        </Col>
      </Row>
      <Row justify="left" style={{ marginTop: 24 }}>
        <Col>
          <Row style={{ marginTop: 5 }}>
            <Text style={{ textAlign: "left", fontWeight: "bold" }}>{notBasicProfileData.title}</Text>
          </Row>
          <Row style={{ marginTop: 5 }}>
            <Text style={{ textAlign: "left" }}><b>Current GPA:</b> {notBasicProfileData.currentGPA}</Text>
          </Row>
          <Row style={{ marginTop: 5 }}>
            <Text style={{ textAlign: "left" }}><b>Real GPA:</b> {notBasicProfileData.realGPA}</Text>
          </Row>
        </Col>
      </Row >
      <Row justify="left">
        <Col>
          <Row justify="left">
            <Divider />
            <Title level={4} className="skill-tagslist">My tags</Title>
          </Row>
          <Row justify="left" style={{ marginTop: 16 }}>
            {studentSkills.map((item) => {
              return <Tag style={{ margin: 3 }}>{item}</Tag>
            })}
          </Row>
        </Col>
      </Row>
    </Card >
  )
}

export { StudentProfile };