import React from 'react'
import { Component } from 'react';
import {Tabs,Menu, Form, Input, Button, Dropdown, Upload, Space, DatePicker,message, Modal} from  'antd';
import{ Row, Col, Avatar, Switch} from 'antd';
import {EditOutlined, UploadOutlined} from '@ant-design/icons';             
import moment from 'moment';

import { accountServices } from "@/services";


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

    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      }
      
      function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
      }

class ProfileEdit extends Component {
    constructor(props) {
        super(props);
        this.state={
            disabled: false,
            loading: false,
            imageUrl:null,
        }
        this.formRef = React.createRef();
    }


    handleChangeAvatar = info => {
       
        getBase64(info.file.originFileObj, picture =>
          this.setState({
            imageUrl:picture,
            loading: false,
          }),
        );
    };
    

    changeDisabled = () =>{
        this.setState({
            disabled: !this.state.disabled,
          });
        }
   
    onFinishChangePass = values =>{
        console.log(values.newPass, values.oldPass);
            if (values.newPass!==values.confPass){
                Modal.error({title: "╯︿╰", content: 'Password not match!'});
            }else{
                accountServices.changePassword(values.oldPass, values.newPass).then()
                .then(()=>{
                    Modal.success({title: "\^o^/", content: "Change Password successfully!!!"});
                })
                .catch((error)=>{
                    Modal.error({title: "╯︿╰", content:error});
                })
            }
        }
    render()
    {
        let imgPreview;
        
            imgPreview = <Avatar style={{width: 180, height: 180, marginBottom:10}} src={this.state.imageUrl} alt=''></Avatar>
        return(
            <Menu  mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{padding: 24,
                margin: 0,
                minHeight: 600,
                marginTop: 24,
                }}
                title="Thay đổi" icon={<EditOutlined />}  key="sub1"
                >
                    <Tabs  tabPosition="left" style={{marginLeft:24}}>
                        <TabPane tab="Thông tin tài khoản" key="1" style={{marginTop:20}}>
                            <span style={{fontWeight: "bold"}}>THÔNG TIN TÀI KHOẢN</span>
                            <Row align="middle">
                            
                                <Col span={12} >
                                    <Form 
                                    ref={this.formRef} 
                                    style={{marginTop:32}}
                                    >
                                        <span>Company Name</span>
                                        <Form.Item name="lastName" >
                                            <Input></Input>
                                        </Form.Item>
                                        
                                        <span>Website</span>
                                        <Form.Item  name="website" >
                                            <Input ></Input>
                                        </Form.Item>
                                        

                                        <span>Email</span>
                                        <Form.Item  name="email" >
                                            <Input ></Input>
                                        </Form.Item>
                                        
                                        <span>Phone Number</span>
                                        <Form.Item  name="phoneNumber"  >
                                            <Input/>
                                        </Form.Item>
                                        <span>Specialties</span>
                                        <Form.Item  name="specialties"  >
                                            <Input/>
                                        </Form.Item>

                                        <span>Description</span>
                                        <Form.Item  name="description" >
                                            <Input/>
                                        </Form.Item>

                                        <Button type="primary" htmlType="submit">Save</Button>
                                        <Button type="primary" style={{marginLeft: 16}} htmlType="cancel" >Cancel</Button>
                                    </Form>
                                </Col>
                                <Col span={4} offset={3} style={{position:'relative',top:-100}}>
                                <Upload
                                        name="avatar"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        beforeUpload={beforeUpload}
                                        onChange={this.handleChangeAvatar}

                                    >
                                        {imgPreview}
                                       <Button style={{position:'relative', right:-30, top:10}}>
                                           Change Avatar
                                        </Button>
                                    </Upload>
                                 
                                </Col>
                                
                            </Row>
                            
                        </TabPane>
                        <TabPane tab="Change Password" key="3" style={{ marginTop:20}}   >
                        <span style={{fontWeight: "bold"}}>CHANGE PASSWORD</span>
                            <Form  onFinish={this.onFinishChangePass} style={{marginTop:32, marginRight:150}} >
                                            <span> Old Password</span>
                                            <Form.Item  span="6" name="oldPass" rules={[{ required: true, message: 'Đừng để trống'}]}>
                                            <Input.Password    placeholder="Old Password"  ></Input.Password>
                                            </Form.Item>

                                            <span>New Password</span>
                                            <Form.Item span="6" name="newPass" rules={[{ required: true, message: 'Đừng để trống'}]}>
                                            <Input.Password   placeholder="New Password"  ></Input.Password>
                                            </Form.Item>

                                            <span> Confirm Password</span>
                                            <Form.Item span="6" name="confPass" rules={[{ required: true, message: 'Đừng để trống'}]}>
                                            <Input.Password   placeholder="Confirm Password" ></Input.Password>
                                            </Form.Item>

                                            <Button type="primary" htmlType="submit" >Save</Button>
                                            <Button type="primary" style={{marginLeft: 16}} htmlType="cancel" >Cancel</Button>
                            </Form>
                        
                            </TabPane>
                         <TabPane tab="Settings" key="2" style={{fontSize: 16, marginTop:32}}>
                             <Row>
                                <Col>Theme Color</Col>
                                <Col style={{position:'absolute', right:64}}> <Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked onClick={this.changeDisabled} /></Col>
                             </Row>
                            <Row>
                                <Dropdown disabled={this.state.disabled} overlay={color} placement="bottomCenter" >
                                  <Button class="changeColor" style={{marginTop:24}}>Color</Button>
                              </Dropdown>
                            </Row>
                         </TabPane>
                        
                     </Tabs>
             </Menu>
        
           
        );
    }
}
 
export {ProfileEdit};