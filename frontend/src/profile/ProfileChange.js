import React from 'react'
import { Component } from 'react';
import {EditOutlined} from '@ant-design/icons';

import { Skeleton, Switch, Card, Button, Timeline } from 'antd';
import Meta from 'antd/lib/card/Meta';

import { List, Avatar } from 'antd';

const data = [
    {
        avatar: null,
        companyName: 'FB',
        title: 'CEO',
        time: 'Apr 2013 - Feb 2019',
        description: 'Working here is an amazing opportunity!'
    },
    {
        avatar: null,
        companyName: 'GG',
        title: 'CEO',
        time: 'Apr 2013 - Feb 2019',
        description: 'Working here is an amazing opportunity!'
    },
    {
        avatar: null,
        companyName: 'Netflix',
        title: 'CEO',
        time: 'Apr 2013 - Feb 2019',
        description: 'Working here is an amazing opportunity!'
    },
    {
        avatar: null,
        companyName: 'Shopee',
        title: 'CEO',
        time: 'Apr 2013 - Feb 2019',
        description: 'Working here is an amazing opportunity!'
    },
  ];

class ProfileChange extends Component {
    state = {  
        tabPosition: 'left'
    }
    
    render() { 
        return ( 
            <>
            <Card style={{marginTop: 24}}>
                <Meta title="Experiences"></Meta>
                <List
                style={{marginTop: 24}}
                    itemLayout="horizontal"
                    dataSource={ data }
                    renderItem= {item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar}></Avatar>}
                                title={item.companyName}
                                description={item.description}
                            />
                            
                            <Meta
                                title="Title"
                                description={item.title}
                                style={{marginRight: 48}}
                            />
                            <Meta
                                title="Working time"
                                description={item.time}
                                style={{marginRight: 48}}
                            />
                            <Button type="dashed" shape="circle" icon={<EditOutlined />} />
                        </List.Item>
                    )}>
                </List>
            </Card>

            <Card style={{marginTop: 24}}>
                <Meta title="Education"></Meta>
                <List
                style={{marginTop: 24}}
                    itemLayout="horizontal"
                    dataSource={ data }
                    renderItem= {item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar}></Avatar>}
                                title={item.companyName}
                                description={item.description}
                            />
                            
                            <Meta
                                title="Title"
                                description={item.title}
                                style={{marginRight: 48}}
                            />
                            <Meta
                                title="Working time"
                                description={item.time}
                                style={{marginRight: 48}}
                            />
                            <Button type="dashed" shape="circle" icon={<EditOutlined />} />
                        </List.Item>
                    )}>
                </List>
            </Card>
            </>
         );
    }
}
 
export default ProfileChange;