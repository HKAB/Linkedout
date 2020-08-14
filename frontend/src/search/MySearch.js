import React, { useState } from 'react';
import { Input, Layout, Row, Col, Select, List, Card, Typography, Tooltip, Avatar, Tag, Space, Button} from 'antd'
import { accountServices, searchData } from 'services'
import { Config } from "../config/consts";
import moment from 'moment';
import {
    ClockCircleOutlined,
    HomeOutlined, 
    SafetyCertificateOutlined
} from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;
const { Meta } = Card;
const { Title, Link } = Typography;

const skillList = ['abc', 'def', 'sample'];
const specialityList = ['code', 'test', 'dev'];
function MySearch() {
    const [skillDisable, setSkillDisable] = useState(false);
    const [specialityDisable, setSpecialityDisable] = useState(true);
    const [typeData, setTypeData] = useState('student');
    const [queryData, setQueryData] = useState();
    const [skillData, setSkillData] = useState([]);
    const [specialityData, setSpecialityData] = useState([]);
    const [listData, setListData] = useState([]);
    
    const onTypeChange = (values) => {
        console.log(values);
        setSpecialityDisable(values == 'company' ? false : true);
        setSkillDisable(values == 'company' ? true : false);
        setTypeData(values);
    }

    const onSkillChange = (values) => {
        console.log(values);
        setSkillData(values);
    }

    const onSpecialityChange = (values) => {
        console.log(values);
        setSpecialityData(values);
    }

    const onSearch = (values) => {
        console.log(typeData);
        console.log(values);
        console.log(skillData);
        console.log(specialityData);
        searchData(typeData, values, skillData, specialityData).then((data) =>{
            console.log(data);
            setListData(data);
        })
    }
    return (
        <Layout>
            <Row gutter={[0, 16]}>
                <Col span={8} offset={8}>
                    <Input.Group compact>
                        <Select defaultValue="student" style={{ width: '30%' }} onChange = {onTypeChange}>
                            <Option value="company">Company</Option>
                            <Option value="student">Student</Option>
                            <Option value="job">Job</Option>
                            <Option value="post">Post</Option>
                        </Select>
                        <Search placeholder="Nhập tên bạn muốn tìm" style={{ width: '70%' }} onSearch={onSearch}></Search>
                    </Input.Group>
                </Col>
            </Row>
            <Row gutter={[0, 16]}>
                <Col span={8} offset={8}>
                    <Input.Group compact>
                        <Select defaultValue="skills" style={{ width: '30%' }}>
                            <Option value="skills">Skills</Option>
                        </Select>
                        <Select mode='multiple' disabled={skillDisable} placeholder="Chọn kỹ năng bạn muốn tìm" style={{ width: '70%' }} onChange={onSkillChange}>
                            {skillList.map(item => (
                                <Select.Option key={item} value={item}>
                                    {item}
                                </Select.Option>
                            ))}
                        </Select>
                    </Input.Group>
                </Col>
            </Row>
            <Row gutter={[0, 16]}>
                <Col span={8} offset={8}>
                    <Input.Group compact>
                        <Select defaultValue="speciality" style={{ width: '30%' }}>
                            <Option value="speciality">Specialities</Option>
                        </Select>
                        <Select mode='multiple' disabled = {specialityDisable} placeholder="Chọn chuyên môn bạn muốn tìm" style={{ width: '70%' }} onChange={onSpecialityChange}>
                            {specialityList.map(item => (
                                <Select.Option key={item} value={item}>
                                    {item}
                                </Select.Option>
                            ))}
                        </Select>
                    </Input.Group>
                </Col>
            </Row>
            <List
                itemLayout="vertical"
                dataSource={listData}
                renderItem = {(item) =>{
                    if (typeData == 'student')
                        return(
                            <Row>
                                <Col span={8} offset={8}>
                                    <Card style={{ marginTop: 12 }}>
                                        <Meta
                                            avatar={
                                                <Tooltip placement="bottom" title={item.firstname + " " + item.lastname}><Avatar src={Config.backendUrl + item.profile_picture}></Avatar></Tooltip>
                                            }
                                            title={
                                                <Link level={4} href={'http://localhost:3000/profile/student/[id]'}>
                                                    {item.firstname + " " + item.lastname}
                                                </Link>
                                            }
                                            description={
                                                <List dataSource={item.skills} renderItem={skills => (<Tag style={{ margin: 3 }}>{skills}</Tag>)}></List>
                                            }
                                        ></Meta>
                                    </Card>
                                </Col>
                            </Row>
                        )
                    else if (typeData == 'company')
                        return(
                            <Row>
                                <Col span={8} offset={8}>
                                    <Card style={{ marginTop: 12 }}>
                                        <Meta
                                            avatar={
                                                <Tooltip placement="bottom" title={item.name}><Avatar src={Config.backendUrl + item.profile_picture}></Avatar></Tooltip>
                                            }
                                            title={
                                                <Link level={4} href={'http://localhost:3000/profile/company/[id]'}>
                                                    {item.name}
                                                </Link>
                                            }
                                            description={
                                                <List dataSource={item.specialties} renderItem={specialties => (<Tag style={{ margin: 3 }}>{specialties}</Tag>)}></List>
                                            }
                                        ></Meta>
                                    </Card>
                                </Col>
                            </Row>
                        )
                    else if (typeData == 'job')
                        return (
                            <Row>
                                <Col span={8} offset={8}>
                                    <Card style={{ marginTop: 12 }}>
                                        <Meta
                                            avatar={
                                                <Tooltip placement="bottom" title={item.company_name}><Avatar src={Config.backendUrl + item.company_profile_picture}></Avatar></Tooltip>
                                            }
                                            title={
                                                <>
                                                    <Link level={4} href={item.recruitment_url}>
                                                        {item.title}
                                                    </Link>
                                                    <div>
                                                        <u><i>
                                                            {moment(item.published_date, 'YYYY-MM-DD').format('MMMM Do YYYY')}
                                                        </i></u>
                                                    </div>
                                                </>
                                            }
                                            description={
                                                <>
                                                    <Row>
                                                        <Col span={18}>
                                                            <div style={{ fontSize: 14 }}>{item.description}</div>
                                                            <Space>
                                                                <List
                                                                    dataSource={item.skills}
                                                                    renderItem={(skill) => <Tag>{skill}</Tag>}
                                                                ></List>
                                                            </Space>
                                                        </Col>
                                                        <Col offset={1} span={4}>
                                                            <div>
                                                                <Space>
                                                                    <SafetyCertificateOutlined />
                                                                    {item.seniority_level}
                                                                </Space>
                                                            </div>
                                                            <div>
                                                                <Space>
                                                                    <ClockCircleOutlined />
                                                                    {item.employment_type}
                                                                </Space>
                                                            </div>
                                                            <Space>
                                                                <HomeOutlined />
                                                                <List
                                                                    grid={{ gutter: 8 }}
                                                                    dataSource={item.cities}
                                                                    renderItem={(city) => city}
                                                                ></List>
                                                            </Space>
                                                        </Col>
                                                    </Row>
                                                </>
                                            }
                                        ></Meta>
                                    </Card>
                                </Col>
                            </Row>
                        )
                }
                }
            >

            </List>
        </Layout>
    )
}

export { MySearch }