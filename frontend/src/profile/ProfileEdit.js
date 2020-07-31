import React from 'react'
import { Component } from 'react';
import {Tabs,Menu, Form, Input, Button, Dropdown, Upload, Space} from  'antd';
import{ Row, Col, Avatar, Switch} from 'antd'
import {EditOutlined, UploadOutlined} from '@ant-design/icons';             


const {SubMenu}= Menu

const  {TabPane} =  Tabs;
const color = (
    <Menu style={{ marginLeft:450}}>
        <Button  key='3' title="Orange" style={{backgroundColor:"rgb(250,173,20"}}>Orange</Button>
        <Button key='4'title="Daybreak Blue" style={{backgroundColor:'rgb(24,144,255)'}}>LBlue</Button>
        <Button key='5'title="Red" style={{backgroundColor:"rgb(245,34,45)"}}>Red</Button>
        <Button key='6'title="Volcano" style={{backgroundColor:"rgb(250,84,28)"}}>Volc</Button>
        <Button key='7'title="Cyan" style={{backgroundColor:"rgb(19,194,194)"}}>Cyan</Button>
        <Button key='8'title="Green" style={{backgroundColor:"rgb(82,196,26)"}}>Green</Button>
        <Button key='9'title="Geek Blue" style={{backgroundColor:"rgb(47,84,235)"}}>GBlue</Button>
        <Button key='10'title="Purple" style={{backgroundColor:"rgb(114,46,209)"}}>Purple</Button>
    </Menu>
    )
const data = {
            userName: "hkab",
           id:"1234",
           email:"nguyenphutruong2525@god.com",
          password:"1234567890123",
           recoveryEmail:"1122uet@gmai.com",
           avatar:"https://image.flaticon.com/icons/svg/3084/3084416.svg"
}
class ProfileEdit extends Component {
    constructor(props) {
        super(props);
        this.state={
            disabled:false,
        }
    }
    changeDisabled = () =>{
        this.setState({
            disabled: !this.state.disabled,
          });
    }
    handleChangeUserName =  (e) =>{
        data.userName=e.target.value;
    }
    handleChangePassword =  (e) =>{
        data.password=e.target.value;
    }
    handleChangeEmail =  (e) =>{
        data.email=e.target.value;
    }
    handleChangeReEmail =  (e) =>{
        data.recoveryEmail=e.target.value;
    }
    submitValue = () =>{
        if(data.userName=="") alert('Nhập UserName đi nhé :)');
        else if (data.email=="") alert('Nhập Email đi nhé :)');
        else if (data.password=="") alert('Nhập Password đi nhé :)');
        else alert('Success');
    }
    render()
    {
        return(
            <Menu  mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{padding: 24,
                margin: 0,
                minHeight: 300,
                
                marginTop: 24,
                }}>
                <SubMenu title="Thay đổi" icon={<EditOutlined />}  key="sub1" >
                    <Tabs  tabPosition="left" style={{marginLeft:24}}>
                        <TabPane tab="Thông tin tài khoản" key="1" >
                            <span style={{fontWeight: "bold"}}>THÔNG TIN TÀI KHOẢN</span>
                             
                            <Row align="middle">
                            
                                <Col span="14">
                                    <Form>
                                        <Form.Item  className="form-group" style={{marginTop:32}} >
                                            User Display
                                            <Input  defaultValue={data.userName} onChange={this.handleChangeUserName}/>
                                        </Form.Item>
                                        <Form.Item className="form-group" style={{marginTop:32}}>
                                            Email
                                            <Input  defaultValue={data.email} onChange={this.handleChangeEmail}></Input>
                                        </Form.Item>
                                        <Form.Item  className="form-group" style={{marginTop:32}} >
                                            Password
                                            <Input.Password defaultValue={data.password}  onChange={this.handleChangePassword} ></Input.Password>
                                        </Form.Item>
                                        <Form.Item name="reEmail" style={{marginTop:32}}>
                                            Recovery email
                                            <Input defaultValue={data.recoveryEmail} onChange={this.handleChangeReEmail}></Input>
                                        </Form.Item>
                                        <Button type="primary" htmlType="submit" onClick={this.submitValue} >Save</Button>
                                        
                                        <Button type="primary" style={{marginLeft: 16}} htmlType="cancel" >Cancel</Button>
                                    </Form>
                                </Col>
                                <Col span="6" offset="11" style={{position:'absolute',top:150}}>
                                    <Avatar style={{width: 180, height: 180, marginBottom:10}}src={data.avatar} ></Avatar>
                                    <Space style={{position:'relative', right:-20}}>
                                        <Upload >
                                    <Button >
                                        <UploadOutlined /> Change avatar
                                    </Button>
                                    </Upload>
                                    </Space>
                                    
                                </Col>
                            </Row>
                            
                        </TabPane>
                         <TabPane tab="Settings" key="2" style={{fontSize: 16}}>
                             <Row>
                                <Col>Theme Color</Col>
                                <Col style={{position:'absolute', right:64}}> <Switch    checkedChildren="ON" unCheckedChildren="OFF" defaultChecked onClick={this.changeDisabled} /></Col>
                             </Row>
                            <Row>
                                <Dropdown disabled={this.state.disabled} overlay={color} placement="bottomCenter" >
                                  <Button class="changeColor" style={{marginTop:24}}>Color</Button>
                              </Dropdown>
                            </Row>
                              
                            
                         </TabPane>
                     </Tabs>
                 </SubMenu>

             </Menu>
        
           
        );
    }
}
 
export {ProfileEdit};