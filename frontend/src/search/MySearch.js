import React, { useState } from 'react';
import { Input, Layout, Row, Col, Select, List } from 'antd'
import { accountServices, searchData } from 'services'
const { Search } = Input;
const { Option } = Select;

const skillList = ['abc', 'def', 'sample'];
const specialityList = ['code', 'test', 'dev'];
function MySearch() {
    const [skillDisable, setSkillDisable] = useState(false);
    const [specialityDisable, setSpecialityDisable] = useState(true);
    const [typeData, setTypeData] = useState('student');
    const [queryData, setQueryData] = useState();
    const [skillData, setSkillData] = useState([]);
    const [specialityData, setSpecialityData] = useState([]);
    
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
        })
    }
    return (
        <Layout>
            <Row gutter={[0, 16]}>
                <Col span={8}></Col>
                <Col span={8}>
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
                <Col span={8}></Col>
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
        </Layout>
    )
}

export { MySearch }