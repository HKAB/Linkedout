import React from 'react'
import { Component } from 'react';
import {Tabs,Menu, Form, Input, Button, Dropdown} from  'antd';
import{ Row, Col, Avatar, Switch} from 'antd'
import {EditOutlined} from '@ant-design/icons';             


const {SubMenu}= Menu

const  {TabPane} =  Tabs;
const color = (
    <Menu style={{color:"#000000", marginLeft:450}}>
        <Button  key='3' title="orange" style={{backgroundColor:"rgb(250,173,20"}}>Orange</Button>
        <Button key='4'title="blue" style={{backgroundColor:'rgb(24,144,255)'}}>LBlue</Button>
        <Button key='5'title="red" style={{backgroundColor:"rgb(245,34,45)"}}>Red</Button>
        <Button key='6'title="volcano" style={{backgroundColor:"rgb(250,84,28)"}}>Volc</Button>
        <Button key='7'title="cyan" style={{backgroundColor:"rgb(19,194,194)"}}>Cyan</Button>
        <Button key='8'title="green" style={{backgroundColor:"rgb(82,196,26)"}}>Green</Button>
        <Button key='9'title="g-blue" style={{backgroundColor:"rgb(47,84,235)"}}>GBlue</Button>
        <Button key='10'title="purple" style={{backgroundColor:"rgb(114,46,209)"}}>Purple</Button>
    </Menu>
    )

class MenuChange extends Component {
 
    constructor(props){
        super(props);
        this.state={
            userName: "ABC",
           id:"1234",
           email:"mmm@gmail.com",
          password:"12345",
           recoveryEmail:"1122uet@gmai.com",
           avata:"https://i.pinimg.com/236x/b0/24/a6/b024a6ea591baa2fbf85604616f1b546--your-name-wallpaper-iphone-anime-wallpapers-iphone.jpg"
        
       };
       
    }
    check(e){
        e.preventDefault();
        const {userName, email, password} = this.state;
        alert(userName + " " +email +" " + password);
    }
    change={
        disabled: false,
    }
    toggle = () => {
        this.setState({
          disabled: !this.state.disabled,
        });

      };
     
    
      changeInputValue(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
    }
    
    render() { 
        return ( 
            <Menu  mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{height:'100%', margin:0, width:'100%'}}>
                <SubMenu title="Thay đổi" icon={<EditOutlined />}  key="sub1" >
                    <Tabs  tabPosition="left" style={{marginLeft:24}}>
                        <TabPane tab="Thông tin tài khoản" key="1"  >
                            <span style={{fontWeight: "bold"}}>THÔNG TIN TÀI KHOẢN</span>
                             
                            <Row align="middle">
                                <Col span="16">
                                    <Form>
                                        <Form.Item  className="form-group" style={{marginTop:32}} >
                                            User Display
                                            <Input defaultValue={this.state.userName} onChange={e => this.changeInputValue(e)}/>
                                        </Form.Item>
                                        <Form.Item className="form-group" style={{marginTop:32}}>
                                            Email
                                            <Input defaultValue={this.state.email} onChange={e => this.changeInputValue(e)} ></Input>
                                        </Form.Item>
                                        <Form.Item  className="form-group" style={{marginTop:32}} >
                                            Password
                                            <Input.Password className="form-group" defaultValue={this.state.password} onChange={e => this.changeInputValue(e)} ></Input.Password>
                                        </Form.Item>
                                        <Form.Item name="reEmail" style={{marginTop:32}}>
                                            Recovery email
                                            <Input defaultValue={this.state.recoveryEmail} onChange={e => this.changeInputValue(e)}></Input>
                                        </Form.Item>
                                        <Button type="primary" htmlType="submit"  onClick={e=>{this.check(e)}}>Save</Button>
                                        
                                        <Button type="primary" style={{marginLeft: 16}} htmlType="cancel" >Cancel</Button>
                                    </Form>
                                </Col>
                                <Col offset="2">
                                    <Avatar src={this.state.avata} style={{width:180,  height: 180, position:"absolute", top: -150}} ></Avatar>
                                    
                                </Col>
                            </Row>
                            
                        </TabPane>
                         <TabPane tab="Settings" key="2" style={{fontSize: 16}}>
                             <Menu.Item >Theme Color
                             <Switch  style={{marginLeft: 24, position:'absolute', right: 64 }} checkedChildren="ON" unCheckedChildren="OFF" defaultChecked onClick={this.toggle} />
                             </Menu.Item>
                            
                              <Dropdown disabled={this.state.disabled} overlay={color} placement="bottomCenter" >
                                  <Button class="changeColor" style={{marginTop:24}}>Color</Button>
                              </Dropdown>
                            
                         </TabPane>
                     </Tabs>
                 </SubMenu>

             </Menu>
        
           
         );
    }
}
 
export default MenuChange;