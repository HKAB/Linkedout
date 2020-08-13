import { MyEditor ,EditableTagGroup} from "../../components";
import "../assets/css/profileEditor.css";
import{Card, Typography, Button, Col, Upload, message, Row, List, Avatar,Popconfirm, Tag , Modal, Form,
  Input,DatePicker
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Meta from "antd/lib/card/Meta";
import React, {useState, useEffect} from 'react'
import {LoadingOutlined,ArrowUpOutlined , EditOutlined, CloseOutlined} from  "@ant-design/icons";
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

    var editTags = useState(null);
    var createTags = useState(null);


    const [formEdit] = Form.useForm();
    const [formCreate] = Form.useForm();
    const onEditPost = ()=>{
      console.log('on Edit Post')
    }
    const onAddPostFinish = ()=>{
      console.log('on Add Post Finish');
    }
    const handleChangePicture = info => {
        setLoading(true);
        getBase64(info.file.originFileObj, picture =>
          setImageUrl(picture)
        );
      };

      const handleEditPostCancel = () =>{
        console.log('handle edit  Post Cancel');
      }
      const handleCreatePostCancel=()=>{
        console.log('handle Create Post cancel');
      }
      const onUploadImage = (data) => {
        message.success('Upload image success');
      }
      const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <ArrowUpOutlined />}
          <div className="ant-upload-text">Upload</div>
        </div>
      );
      const onPostModify = item=>{
          console.log(item);
      }
      const onShowPostDetail = item =>{
        console.log(item);
      }
      const onConfirmDeletePost= id =>{
        console.log(id);
      }
      const showCreatePostModal = ()=>{
        console.log('show all');
      }
      const handlePostDetailCancel=()=>{
        console.log('handlePostDetailCancel');
      }
  return (
    <>
    <Card className="card-editor" style={{ marginTop: 24 }}>
        <Meta title={<Title level={3}>Mô tả</Title>}></Meta>
        <Row>
        <Col  span={5}style={{marginTop:24}}>
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
        <Col span={18} offset={1}>    
          <MyEditor></MyEditor>
        </Col>
        </Row>
        <Button type="primary" htmlType="submit" style={{position:'absolute', right:24, bottom:  24 }}>Submit</Button>
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
                  avatar={<Avatar></Avatar>}
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
                <div style={{ display: 'flex' }}>
                  <div>Ngày đăng: {postDetail.published_date}</div>
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

      <Modal
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
      </Modal>
    </>
  );
}

export { ProfileEditor };
