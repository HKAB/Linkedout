import { MailTwoTone, PhoneTwoTone, ScheduleTwoTone } from '@ant-design/icons';
import { Affix, Avatar, Card, Col, Divider, Row, Tag, Typography } from 'antd';
import React from 'react';
import { accountServices } from 'services/account.service';
import { studentServices } from 'services/student.service';
import { Config } from '../../config/consts';

const { Title, Text } = Typography;

function StudentProfile(props) {
  const [profileData, setProfileData] = React.useState({})
  const [studentSkills, setStudentSkills] = React.useState([]);

  const fetchProfile = async () => {

  }

  React.useEffect(() => {
    var user = accountServices.userValue;
    if (user) {
      studentServices.getStudent(user.account.id);
      const subscription = studentServices.studentObject.subscribe((student) => {
        if (student) {
          console.log("Has student");
          console.log(student);
          setProfileData({
            firstname: student.basic_data.firstname,
            lastname: student.basic_data.lastname,
            profile_picture: student.basic_data.profile_picture,
            description: student.basic_data.description,
            dob: student.basic_data.dateofbirth,
            phone: student.phone[0],
            email: student.email[0]
          });
          setStudentSkills(student.skill);
        }
      });
      return () => {
        subscription.unsubscribe()
      };
    }
  }, [])

  return (
    <Affix offsetTop={80}>
      <Card className="card-info" style={{ width: 300, height: 600, margintop: 24 }}>
        <Row justify="center">
          <Col>
            <div style={{ textAlign: "center" }}>
              <Avatar style={{ marginBottom: 32 }} size={128} src={Config.backendUrl + profileData.profile_picture} onError={(e) => { console.log(e); }}></Avatar>
              <Title level={3} className="user-fullname">{profileData.firstname + " " + profileData.lastname}</Title>
              <Text className="user-quotes">{profileData.description}</Text>
            </div>
          </Col>
        </Row>
        <Row justify="left" style={{ marginTop: 24 }}>
          <Col style={{ paddingLeft: 16 }}>
            <Row gutter={[8, 8]}>
              <Col>
                <ScheduleTwoTone />
              </Col>
              <Col>
                <Text style={{ textAlign: "left" }}>{profileData.dob}</Text>
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col>
                <PhoneTwoTone />
              </Col>
              <Col>
                <Text style={{ textAlign: "left" }}>{profileData.phone}</Text>
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col>
                <MailTwoTone />
              </Col>
              <Col>
                <Text style={{ textAlign: "left" }}>{profileData.email}</Text>
              </Col>
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
    </Affix>
  )
}

export { StudentProfile };
