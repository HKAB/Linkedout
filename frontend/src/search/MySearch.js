import React, {useState, useEffect} from 'react';
import { Card, Row , Col, Layout, Typography, Input, Tag, AutoComplete, Avatar} from 'antd';
import Meta from 'antd/lib/card/Meta';
import{EditableTagGroup} from 'components'
import { List } from 'antd/lib/form/Form';
import create from '@ant-design/icons/lib/components/IconFont';
const { Title } = Typography;
const {Search} = Input


function MySearch() {
   
    const onChangeComplete =  (values) =>{
       
    }
    
    return (
        <Row>
        <Col></Col>
        <Col span={24}>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Row>
              <Col span={4} style={{ paddingLeft: "5vw", marginTop: "20vh" }}>
                
              </Col>
              <Col span={16}>
                  <Card className="card-info" style={{ marginTop: 24 }}>
                  <Meta title={<Title level={3}>Search</Title>}></Meta>
                      <Col span={12} offset={5}>
                                <Input.Search
                                    placeholder="Search St"
                                    onSearch={onChangeComplete}
                                    style={{ marginTop: 15, marginLeft: 30, }}
                                    />   
                    </Col>
                   
               
                  </Card>
                
              </Col>
              <Col span={4}></Col>
            </Row>
          </Layout>
        </Col>
        <Col></Col>
      </Row>
    )
}

export { MySearch }