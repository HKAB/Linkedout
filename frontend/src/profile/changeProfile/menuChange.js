import React from 'react'
import { Component } from 'react';
import {Tabs,Menu, Select, Space, Dropdown} from  'antd';
import {EditOutlined} from '@ant-design/icons';
const {SubMenu}= Menu

const  {TabPane} =  Tabs;


class MenuChange extends Component {
    state = {  
        tabPosition: 'left'
    }
    
    render() { 
        return ( 
            <Menu  mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{height:'100%', margin:0, width:'100%'}}>
                <SubMenu title="Thay đổi" icon={<EditOutlined />}  key="sub1" >
                    <Tabs centered tabPosition={this.state.tabPosition} style={{marginLeft:24}}>
                        <TabPane tab="Thông tin tài khoản" key="1" >
                            Content of Tab 1
                        </TabPane>
                        <TabPane tab="Thông tin Job" key="2">
                            
                        </TabPane>
                         <TabPane tab="Settings" key="3">
                             Content of Tab 3
                         </TabPane>
                     </Tabs>
                 </SubMenu>

             </Menu>
            // <Row align="middle">
            //     <Co span={4} offset={4}>

            //     </Co>
            // </Row>
        
           
         );
    }
}
 
export default MenuChange;