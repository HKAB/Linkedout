import { ArrowUpOutlined, EditOutlined, ExpandAltOutlined, LoadingOutlined, MinusCircleFilled } from "@ant-design/icons";
import {
  Avatar, Button, Card, Col, Form,
  Input, List, message, Modal, Popconfirm, Row,
  Spin, Tag,
  Tooltip, Typography
} from 'antd';
import Meta from "antd/lib/card/Meta";
import TextArea from 'antd/lib/input/TextArea';
import UploadableAvatar from "components/UploadableAvatar";
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { accountServices, studentServices } from 'services';
import { postServices } from 'services/student/post.service';
import { EditableTagGroup } from "../../components";
import { Config } from "../../config/consts";
import "../assets/css/profileEditor.css";

const dateFormat = 'YYYY-MM-DD';
const { Title, Paragraph, Text } = Typography;



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
  const [postDetailVisible, setPostDetailVisible] = useState(false);
  const [postDetail, setPostDetail] = useState([]);
  const [createPostvisible, setCreatePostVisible] = useState(false);
  const [editPostvisible, setEditPostVisible] = useState(false);
  const [isLoading, setisLoading] = useState(false)
  const [selectedNewPostPicture, setSelectedNewPostPicture] = useState("")
  var editTags = useState(null);
  var createTags = useState(null);
  var uploadableAvatarRefOnEdit = useState(null);
  var uploadableAvatarRefOnCreate = useState(null);


  const [formEdit] = Form.useForm();
  const [formCreate] = Form.useForm();


  useEffect(() => {
    setisLoading(true);
    let user = accountServices.userValue;
    if (user) {
      studentServices.getStudent(user.account.id)
        .then(() => {
          setisLoading(false);
          postServices.listPost(user.account.id)
            .then((list_post) => {
              setPostData(list_post);
            })
            .catch((error) => {
              message.error(error);
            })
        })
        .catch(() => {
          setisLoading(true);
        })
    }
    else {
      console.log('OHHHH');
    }
  }, [])

  const onUploadPostPicture = (data) => {
    setSelectedNewPostPicture(data)
  }

  const onEditPost = (values) => {
    postServices.updatePost(
      values.id,
      values.title,
      values.content,
      editTags.getTags(),
    )
      .then(() => {
        message.success({ title: "uWu", content: "Post đã được cập nhật !!" });
        if (selectedNewPostPicture.file) {
          let multipart_formdata = { 'file': selectedNewPostPicture.file, 'id': values.id };
          postServices.uploadPostPicture(multipart_formdata)
            .then(() => {
              postServices.listPost(accountServices.userValue.account.id)
                .then((list_post) => {
                  list_post[list_post.length - 1].post_picture = list_post[list_post.length - 1].post_picture + "?" + moment().unix();
                  setPostData(list_post);
                })
                .catch((error) => {
                  message.error(error);
                })
              message.success("Tải ảnh bìa cho job thành công!");
            })
            .catch(error => {
              message.error(error);
            });
        }
        else {
          postServices.listPost(accountServices.userValue.account.id)
            .then((list_post) => {
              setPostData(list_post);
            })
            .catch((error) => {
              message.error(error);
            })
        }

        handleEditPostCancel();
      })
      .catch((err) => {
        message.error({ title: 'uWu', content: err });
        handleEditPostCancel();
      })
  }

  const onAddPostFinish = (values) => {
    postServices.createPost(
      values.title,
      values.content,
      createTags.getTags(),
    )
      .then((list_post) => {

        var id_new_post = list_post[list_post.length - 1].id;
        message.success({ title: 'uWu', content: 'Tạo post thành công!!' });
        if (selectedNewPostPicture.file) {
          let multipart_formdata = { 'file': selectedNewPostPicture.file, 'id': id_new_post };
          postServices.uploadPostPicture(multipart_formdata)
            .then(() => {
              postServices.listPost(accountServices.userValue.account.id)
                .then((list_post) => {
                  list_post[list_post.length - 1].post_picture = list_post[list_post.length - 1].post_picture + "?" + moment().unix();
                  setPostData(list_post);
                })
                .catch((error) => {
                  message.error(error);
                })
              message.success("Tải ảnh bìa cho post thành công!");
            })
            .catch(error => {
              message.error(error);
            });
        }
        else {
          postServices.listPost(accountServices.userValue.account.id)
            .then((list_post) => {
              setPostData(list_post);
            })
            .catch((error) => {
              message.error(error);
            })
        }


        handleCreatePostCancel();
      })
      .catch((er) => {
        message.error({ title: 'uWu', content: er });
        handleCreatePostCancel();
      })
  }
  const handleChangePicture = info => {
    setLoading(true);
    getBase64(info.file.originFileObj, picture =>
      setImageUrl(picture)
    );
  };

  const handleEditPostCancel = () => {
    setSelectedNewPostPicture([]);
    // uploadableAvatarRefOnEdit.setImageUrl(undefined);
    setEditPostVisible(false);
    formEdit.resetFields();
  }
  const handleCreatePostCancel = () => {
    // uploadableAvatarRefOnCreate.setImageUrl(undefined);
    setSelectedNewPostPicture([]);
    setCreatePostVisible(false);
    formCreate.resetFields();
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
  const onPostModify = (item) => {
    formEdit.setFieldsValue({
      id: item.id,
      title: item.title,
      content: item.content,
    });

    uploadableAvatarRefOnEdit.setImageUrl(Config.backendUrl + item.post_picture);

    editTags.setTags(item.skills);
    showEditPostModal();

  }
  const showEditPostModal = () => {
    setEditPostVisible(true);
  };

  const onShowPostDetail = item => {
    studentServices.getAccountInterestPost(item.id).then((accounts) => {
      item.account_interested = accounts;
      setPostDetail(item);
      showPostDetailModal();
    })
  }
  const showPostDetailModal = () => {
    setPostDetailVisible(true);
  };
  const onConfirmDeletePost = id => {
    console.log(id);
    postServices.deletePost(id)
      .then(() => {
        postServices.listPost(accountServices.userValue.account.id)
          .then((list_post) => {
            setPostData(list_post);
          })
          .catch((error) => {
            message.error(error);
          })
        message.success({ title: "uWu", content: 'Đã xóa thành công bài Post của bạn!!' })
      })
      .catch((er) => {
        console.log(er);
        message.error({ title: 'uWu', content: er })
      })
  }
  const showCreatePostModal = () => {
    setCreatePostVisible(true);
  }
  const handlePostDetailCancel = () => {
    setPostDetailVisible(false);
  }
  if (isLoading) return (<Spin></Spin>)
  else
    return (

      <Row>
        <Col span={21}>
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
                      <ExpandAltOutlined type="primary" onClick={() => onShowPostDetail(item)} />
                    ]}
                  >
                    <Meta
                      // tí có post picture thì gắn thêm vào
                      avatar={<Avatar src={Config.backendUrl + item.post_picture}></Avatar>}
                      title={
                        <span >
                          <span>{item.title}</span>
                          <span>
                            <Popconfirm
                              title="Bạn có muốn xóa cái này?"
                              onConfirm={() => onConfirmDeletePost(item.id)}
                              okText="Yes"
                              cancelText="No">
                              <MinusCircleFilled style={{ color: 'red', fontSize: 16, float: 'right' }} />
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
            // forceRender
            title={<Title level={4}>Bài đăng</Title>}
            visible={postDetailVisible}
            onCancel={handlePostDetailCancel}
            footer={null}
          >
            <List grid={{ gutter: 24, column: 2 }}>
              <List.Item>
                <Card
                  bordered={false}
                  cover={<img src={Config.backendUrl + postDetail.post_picture} />}>
                  <Meta
                    title={<Title level={3}>{postDetail.title}</Title>}
                    description={<div>
                      <Text underline>Ngày đăng {postDetail.published_date}</Text>
                      <Title level={4}>Nội dung </Title>
                      <Paragraph>
                        {postDetail.content}
                      </Paragraph>



                      <Title level={4}>Kỹ năng </Title>
                      <Paragraph><List dataSource={postDetail.skills} renderItem={skills => (<Tag>{skills}</Tag>)}></List></Paragraph>
                      <Title level={4}>Những người quan tâm</Title>
                      <Paragraph><List dataSource={postDetail.account_interested} renderItem={account => (<Tooltip title={account.firstname + " " + account.lastname}><Avatar src={Config.backendUrl + account.profile_picture}></Avatar></Tooltip>)}></List></Paragraph>
                    </div>}
                  />
                </Card>
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
                initialValue="skill"
                label="Skill"
                name="skills"
              >
                <EditableTagGroup ref={ref => (createTags = ref)} />
              </Form.Item>

              <Form.Item label="Ảnh bìa">
                <UploadableAvatar ref={ref => (uploadableAvatarRefOnCreate = ref)} onUploadImage={onUploadPostPicture}></UploadableAvatar>
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
                initialValue="skill"
                label="Skill:"
                name="skills"
                rules={[{ required: true, message: "Skill is required!" }]}
              >

                <EditableTagGroup ref={ref => (editTags = ref)} />
              </Form.Item>

              <Form.Item label="Ảnh bìa">
                <UploadableAvatar ref={ref => (uploadableAvatarRefOnEdit = ref)} onUploadImage={onUploadPostPicture}></UploadableAvatar>
              </Form.Item>
            </Form>
          </Modal>
        </Col>
      </Row>
    );
}

export { ProfileEditor };
