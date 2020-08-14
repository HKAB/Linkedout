import { MyEditor ,EditableTagGroup} from "../../components";
import "../assets/css/profileEditor.css";
import{Card, Typography, Button, Col, Upload, message, Row, List, Avatar,Popconfirm, Tag , Modal, Form,
  Input,DatePicker, Spin
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Meta from "antd/lib/card/Meta";
import React, {useState, useEffect} from 'react'
import {LoadingOutlined,ArrowUpOutlined , EditOutlined, CloseOutlined} from  "@ant-design/icons";
import {postService,accountServices} from 'services'
import { studentServices } from "services";
import { Config } from "../../config/consts";

const dateFormat = 'YYYY-MM-DD';
const { Title } = Typography;



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
  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }


function ProfileEditor() {
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [postData, setPostData] = useState([]);
    const [postDetailVisible, setPostDetailVisible]=useState(false);
    const [postDetail, setPostDetail] = useState([]);
    const [createPostvisible, setCreatePostVisible] = useState(false);
    const [editPostvisible, setEditPostVisible] = useState(false);
    const [isLoading, setisLoading] = useState(false)
    var editTags = useState(null);
    var createTags = useState(null);


    const [formEdit] = Form.useForm();
    const [formCreate] = Form.useForm();

    
    useEffect(()=>{
        setisLoading(true);
         let user = accountServices.userValue;
         if(user)
         {
           studentServices.getStudent(user.account.id)
           .then(()=>{
              setisLoading(false);
           })
           .catch(()=>{
            setisLoading(true);
           })
           const subscription = studentServices.studentObject
           .subscribe((student)=>{
             if(student){
               
               setPostData(student.post);
               setisLoading(false);
             }
           });
           return () =>{
             subscription.unsubscribe();
           }
         }
         else 
         {
           console.log('OHHHH');
         }
    },[])


    const onEditPost = (values)=>{
      postService.updatePost(
        values.id,
        values.title,
        values.content,
        editTags.getTags(),
      )
      .then(()=>{
        message.success({title:"uWu", content:"Post đã được cập nhật !!"});
        handleEditPostCancel();
      })
      .catch((err)=>{
        message.error({title:'uWu',  content:err});
        handleEditPostCancel();
      })
    }

    const onAddPostFinish = (values)=>{
      postService.createPost(
        values.title,
        values.content,
        createTags.getTags(),
      )
      .then(()=>{
        message.success({title:'uWu', content:'Create Post Success!!'});
        handleCreatePostCancel();
      })
      .catch((er)=>{
        message.error({title:'uWu', content:er});
        handleCreatePostCancel();
      })
    }
    const handleChangePicture = info => {
        setLoading(true);
        getBase64(info.file.originFileObj, picture =>
          setImageUrl(picture)
        );
      };

      const handleEditPostCancel = () =>{
        setEditPostVisible(false);
      }
      const handleCreatePostCancel=()=>{
        setCreatePostVisible(false);
      }
      const onUploadImage = () => {
        message.success('Upload image success');
      }
      const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <ArrowUpOutlined />}
          <div className="ant-upload-text">Upload</div>
        </div>
      );
      const onPostModify = (item)=>{
         formEdit.setFieldsValue({
          id: item.id,
          title: item.title,
          content: item.content,
         });
         
         editTags.setTags(item.skills);
         showEditPostModal();

      }
      const showEditPostModal = () => {
        setEditPostVisible(true);
      };
    
      const onShowPostDetail = item =>{
        setPostDetail(item);
        showPostDetailModal();
      }
      const showPostDetailModal = () => {
        setPostDetailVisible(true);
      };
      const onConfirmDeletePost= id =>{
        console.log(id);
        postService.deletePost(id)
        .then(()=>{
          studentServices.getStudent(accountServices.userValue.account.id);
          message.success({title:"uWu", content:'Đã xóa thành công bài Post của bạn!!'})
        })
        .catch((er)=>{
          console.log(er);
          message.error({title:'uWu', content:er})
        })
      }
      const showCreatePostModal = ()=>{
        setCreatePostVisible(true);
      }
      const handlePostDetailCancel=()=>{
        setPostDetailVisible(false);
      }
      if(isLoading) return (<Spin></Spin>)
      else 
      return (
    
    <Row>
      <Col span={21}>
    <Card className="card-editor" style={{ marginTop: 24 }}>
        <Meta title={<Title level={3}>Mô tả</Title>}></Meta>
        <MyEditor></MyEditor>
        
        <Button type="primary" htmlType="submit" style={{position:'absolute', left:24, bottom:  24 }} onClick={{}}>Save</Button>
    </Card>


  
    <Card
        className="card-post"
        style={{
          marginTop: 24,
        }}>
        <Meta title={<Title level={3}>Bài Đăng</Title>}></Meta>
        <List
          grid={{ gutter: 24, column: 2 }}
          dataSource={postData}
          renderItem={item => (
            <List.Item>
              <Card
                style={{ marginTop: 16 }}
                actions={[
                  <EditOutlined key="edit" onClick={() => onPostModify(item)} />,
                  <Button type="primary" onClick={() => onShowPostDetail(item)}>Detail</Button>
                ]}
              >
                <Meta
                // tí có post picture thì gắn thêm vào
                  avatar={<Avatar src={Config.backendUrl+item.post_picture}></Avatar>}
                  title={
                    <span >
                      <span>{item.title}</span>
                      <span>
                        <Popconfirm
                          title="Bạn có muốn xóa cái này?"
                          onConfirm={() => onConfirmDeletePost(item.id)}
                          okText="Yes"
                          cancelText="No">
                          <a><CloseOutlined style={{ color: 'red', fontSize: 20, float: 'right' }} /></a>
                        </Popconfirm>
                      </span>
                    </span>
                  }
                  description={<div>
                    <div>Title: {item.title}</div>
                    <div>Content: {item.content}</div>
                    <div>Published date: {item.published_date}</div>
                    <List dataSource={item.skills} renderItem={skill => (<Tag>{skill}</Tag>)}></List>
                  </div>}
                />
              </Card>
            </List.Item>
          )}>
        </List>
        <Button style={{ float: "right" }} size="large" type="primary" shape="circle" onClick={() => showCreatePostModal()}>+</Button>
      </Card>

      <Modal
        forceRender
        title="Bài Đăng"
        visible={postDetailVisible}
        onCancel={handlePostDetailCancel}
        footer={null}
      >
        <List grid={{ gutter: 24, column: 2 }}>
          <List.Item>
            <Meta
            // tis cos avata thi gan them vao
              avatar={<Avatar></Avatar>}
              title={postDetail.title}
              description={<div>
                <div>Nội dung: {postDetail.content}</div>
                
                  <div>Ngày đăng: {postDetail.published_date}</div>
                  <div style={{ display: 'flex' }}>
                  <div>Kỹ năng: </div>
                  <List dataSource={postDetail.skills} renderItem={skills => (<Tag>{skills}</Tag>)}></List>
                </div>
              </div>}
            />
          </List.Item>
        </List>
      </Modal>

      <Modal
        forceRender
        title="Tạo bài đăng"
        visible={createPostvisible}
        onCancel={handleCreatePostCancel}
        onOk={() => {
          formCreate.validateFields()
            .then(values => {
              onAddPostFinish(values);
              //formCreate.resetFields();
            })
            .catch(info => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          id="createPost"
          form={formCreate}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Form.Item
            label="Title:"
            name="title"
            rules={[{ required: true, message: "Post title is required!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Post Content:"
            name="content"
            rules={[{ required: true, message: "Post Content is required!" }]}
          >
            <TextArea />
          </Form.Item>

          <Form.Item
            label="Published date:"
            name="published_date"
            rules={[{ required: true, message: "Published Date is required!" }]}
          >
            <DatePicker style={{ width: "100%" }} format={dateFormat} />
          </Form.Item>
          <Form.Item
            initialValue="skill"
            label="Skill"
            name="skills"
          >
            <EditableTagGroup ref={ref => (createTags = ref)} />
          </Form.Item>
        </Form>
      </Modal>

      {/* <Modal
        forceRender
        title="Chỉnh sửa bài đăng"
        visible={editPostvisible}
        onCancel={handleEditPostCancel}
        onOk={() => {
          formEdit.validateFields()
            .then(values => {
              console.log(values);
              onEditPost(values);
            })
            .catch(info => {
              console.log(info);
            })
        }}
      >
        <Form
          id="editPost"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          form={formEdit}
        >
          <Form.Item
            name="id"
          >
            <Input type="hidden" />
          </Form.Item>
          <Form.Item
            initialValue="title"
            label="Title"
            name="title"
            rules={[{ required: true, message: "Post title is required!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            initialValue="Content"
            label="Content:"
            name="content"
            rules={[{ required: true, message: " Post Content is required!" }]}
          >
          <TextArea />
          </Form.Item>

          <Form.Item
            initialValue="published_date"
            label="Published Date: "
            name="published_date"
            rules={[{ required: true, message: "Published Date is required!" }]}
          >
            <DatePicker style={{ width: "100%" }} format={dateFormat} />
          </Form.Item>

          <Form.Item
            initialValue="skill"
            label="Skill:"
            name="skills"
            rules={[{ required: true, message: "Skill is required!" }]}
          >
            
            <EditableTagGroup ref={ref => (editTags = ref)} />
          </Form.Item>
        </Form>
      </Modal> */}
      </Col>
      <Col span={2}style={{marginTop:24, marginLeft:16}}>
                <Upload
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  onChange={handleChangePicture}
                  customRequest={onUploadImage}
                  className='picture-upload'
                  listType='picture-card'
                >
                   {imageUrl ? <img src={imageUrl} alt="picture" style={{width:'100%'}}/> : uploadButton}
                </Upload>
        </Col>
    </Row>
  );
}

export { ProfileEditor };
