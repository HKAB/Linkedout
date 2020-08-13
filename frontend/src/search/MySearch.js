import React from 'react';
import { Input, Layout, Row, Col, Select } from 'antd'

const { Search } = Input;
const { Option } = Select;

function MySearch() {
    return (
        <Layout>
            <Row>
                <Col span={8}></Col>
                <Col span={8}>
                <Input.Group compact>
                    <Select defaultValue="student" style={{ width: '30%' }}>
                        <Option value="company">Company</Option>
                        <Option value="student">Student</Option>
                        <Option value="skill">Skill</Option>
                    </Select>
                    <Input placeholder="Bạn muốn search gì?" style={{ width: '70%' }}></Input>
                </Input.Group>
                </Col>
                <Col span={8}></Col>
            </Row>
        </Layout>
    )
}

export { MySearch }