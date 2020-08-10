import React, { useState, useEffect } from "react";
import { Component } from "react";
import {
	EditOutlined,
	SettingOutlined,
	PlusOutlined,
	MinusCircleOutlined,
} from "@ant-design/icons";

import {
	Tag,
	Card,
	Button,
	Modal,
	Select,
	Input,
	Form,
	Upload,
	AutoComplete,
	Popconfirm,
	Badge,
	Space,
} from "antd";
import Meta from "antd/lib/card/Meta";


import { List, Avatar, Typography } from "antd";

import { accountServices } from "@/services";
import { jobServices } from "@/services";
import { companyServices } from "@/services";
import dayjs from "dayjs";
import moment from 'moment';
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

import '../assets/css/profile.css';

import Markdown from 'braft-extensions/dist/markdown'
//import Form from "antd/lib/form/Form";
import { EditableTagGroup } from '@/components';
import { getCityName } from "@/services";

const { Option } = Select;
const { Title } = Typography;
const jobs = [
	{
		title: "Tuyển Dev tại facebook.wap.sh",
		seniority_level: "Junior",
		employment_type: "Full time",
		cities: "Hà Nội",
		skills: ["Python", "C++", "C#", "Java", "Coffee"],
		description: "",
		recruitment_url: "",
	},
	{
		title: "Tuyển Dev tại facebook.wap.sh",
		seniority_level: "Mid level",
		employment_type: "Part time",
		cities: "Hà Nội",
		skills: ["Python", "C++", "C#", "Java", "Coffee"],
		description: "",
		recruitment_url: "",
	},
	{
		title: "Tuyển Dev tại facebook.wap.sh",
		seniority_level: "Fresher",
		employment_type: "Remote",
		cities: "Hà Nội",
		skills: ["Python", "C++", "C#", "Java", "Coffee"],
		description: "",
		recruitment_url: "",
	}
]

const speciality_data = [
	{speciality:'code'},
	{speciality:'testing'},
	{speciality:'dev'}
]
BraftEditor.use(Markdown());

function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});
}

function ProfileChange() {

	const [visible, setVisible] = useState(false);
	const [createJob_visible, setCreateJob_visible] = useState(false);
	const [editJob_visible, setEditJob_visible] = useState(false);
	const [editorState, setEditorState] = useState(null);
	const [outputHTML, setOutputHTML] = useState(null);
	const [previewVisible, setPreviewVisible] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [previewTitle, setPreviewTitle] = useState("");
	const [fileList, setfileList] = useState([]);
	const [autoCompleteCity, setAutoCompleteCity] = useState([]);
	const [autoCompleteEditCity, setAutoCompleteEditCity] = useState([]);
	const [jobData, setJobData] = useState([]);
	const [specialityData, setSpecialityData] = useState([]);
	const [companyBasicData, setCompanyBasicData] = useState([]);
	var editTags = useState(null);
	var createTags = useState(null);

	const [formEdit] = Form.useForm();
	const [formCreate] = Form.useForm();

	useEffect(() => {
		let user = accountServices.userValue;
		console.log(user);
		if (user) {
		  companyServices.getCompany(user.account.id);
		  const subscription = companyServices.companyObject
			.subscribe((company) => {
			  if (company) {
				setCompanyBasicData(company.basic_data);
				setJobData(company.job);
				setSpecialityData(company.speciality);
				console.log(companyBasicData);
			  }
			});
		  return () => {
			subscription.unsubscribe();
		  }
		}
		else {
		  console.log("Oh no!");
		}
	  }, [])

	const handleEditorChange = (editorState) => {
		setEditorState(editorState);
		//outputHTML: editorState.toHTML()
		//console.log(state.outputHTML);	
	}
	const onEditorFinish = () => {
		setOutputHTML(editorState.toHTML());
		// console.log(state.outputHTML);
	};

	const handleCancel = (e) => {
		setVisible(false);
	};

	const showCreateJobModal = () => {
		setCreateJob_visible(true);
	};

	const handleCreateJobCancel = (e) => {
		setCreateJob_visible(false);
	};

	const showEditJobModal = () => {
		setEditJob_visible(true);
	};

	const handleEditJobCancel = (e) => {
		setEditJob_visible(false);
	};

	const onAddJobFinish = (values) => {
		jobServices.createJob(
			values.title,
			values.description,
			values.seniority_level,
			values.employee_type,
			values.recruitment_url,
			[values.cities],
			createTags.getTags(),
		)
			.then(() => {
				companyServices.getCompany(accountServices.userValue.account.id);
				Modal.success({ title: "uWu", content: "Việc làm đã được tạo thành công!" });
			})
			.catch((error) => {
				console.log(error);
				Modal.error({ title: "uWu", content: error });
			});
	};

	const onEditJob = (values) => {
		jobServices.updateJob(
			values.id,
			values.title,
			values.description,
			values.seniority_level,
			values.employee_type,
			values.recruitment_url,
			values.cities,
			editTags.getTags(),
		)
			.then(() => {
				companyServices.getCompany(accountServices.userValue.account.id);
				Modal.success({ title: "uWu", content: "Việc làm đã được cập nhật!" });
			})
			.catch((error) => {
				console.log(error);
				Modal.error({ title: "uWu", content: error });
			});
	};

	const onJobModify = (item) => {
		console.log(item);
		formEdit.setFieldsValue({
			title: item.title,
			seniority_level: item.seniority_level,
			cities: item.cities,
			employee_type: item.employment_type,
			description: item.description,
			recruitment_url: item.recruitment_url,
		});
		//EditTag.setState({tags: item.skills});
		editTags.setTags(item.skills);
		showEditJobModal();
	};

	const onAddSpecialityFinish = (values) => {
		
	};

	const onConfirmDeleteSpeciality = (values) => {
	
	}

	const onChangeAutoCompleteCity = (text) => {
		console.log(text);
		if (text) {
			getCityName(text).then(data => {
				console.log(data);
				if (data) {
					var data_name = data.tag.map(x => ({ value: x}));
					setAutoCompleteCity(data_name);
					console.log(data_name);
				}
			})
				.catch(error => {
					alert(error);
				})
		}
		else {
			setAutoCompleteCity([]);
		}
	};

	const onChangeAutoCompleteEditCity = (text) => {
		console.log(text);
		if (text) {
			getCityName(text).then(data => {
				console.log(data);
				if (data) {
					var data_name = data.tag.map(x => ({ value: x}));
					setAutoCompleteEditCity(data_name);
					console.log(data_name);
				}
			})
				.catch(error => {
					alert(error);
				})
		}
		else {
			setAutoCompleteEditCity([]);
		}
	};

	const handlePreviewCancel = () => setPreviewVisible(false);

	const handlePreview = async file => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}

		//   setState({
		// 	previewImage: file.url || file.preview,
		// 	previewVisible: true,
		// 	previewTitle:
		// 	  file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
		//   });
		setPreviewImage(file.url || file.preview);
		setPreviewVisible(true);
		setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1));
	};

	const handleUploadChange = ({ fileList }) => {
		// setState({ fileList });
		setfileList(fileList);
	}

	const uploadButton = (
		<div>
			<PlusOutlined />
			<div>Upload</div>
		</div>
	);
	return (
		<>
			<Card className="card-info" style={{ marginTop: 24 }} title={<Title level={3}>Mô tả</Title>}>
				<BraftEditor
					language="en"
					value={editorState}
					onChange={handleEditorChange}
				/>
				<Button type="primary" htmlType="submit" onClick={() => onEditorFinish()}>Save</Button>
			</Card>

			<Card
				className="card-info"
				style={{
					marginTop: 24,
				}}>
				<Meta title={<Title level={3}>Việc làm</Title>}></Meta>
				<List
					grid={{ gutter: 24, column: 2 }}
					dataSource={jobs}
					renderItem={item => (
						<List.Item>
							<Card
								style={{ marginTop: 16 }}
								actions={[
									<SettingOutlined key="setting" />,
									<EditOutlined key="edit" onClick={() => onJobModify(item)} />,
								]}
							>
								<Meta
									avatar={<Avatar src="https://image.flaticon.com/icons/svg/3198/3198832.svg"></Avatar>}
									title={item.title}
									description={<div>
										<div>Yêu cầu: {item.seniority_level}</div>
										<div>Địa điểm: {item.cities}</div>
										<div>Công việc: {item.employment_type}</div>
										<List dataSource={item.skills} renderItem={skill => (<Tag>{skill}</Tag>)}></List>
									</div>}
								/>
							</Card>
						</List.Item>
					)}>
				</List>
				<Button style={{ float: "right" }} size="large" type="primary" shape="circle" onClick={() => showCreateJobModal()}>+</Button>
			</Card>

			<Modal
				forceRender
				title="Tạo việc làm"
				visible={createJob_visible}
				onCancel={handleCreateJobCancel}
				onOk={() => {
					formCreate.validateFields()
						.then(values => {
							//formCreate.resetFields();
							onAddJobFinish(values);
						})
						.catch(info => {
							console.log('Validate Failed:', info);
						});
				}}
			>
				<Form
					id="createJob"
					form={formCreate}
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 18 }}
				>
					<Form.Item
						label="Job Title"
						name="title"
						rules={[{ required: true, message: "Job title is required!" }]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Job Description"
						name="description"
						rules={[{ required: true, message: "Job description is required!" }]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Seniority level"
						name="seniority_level"
						rules={[{ required: true, message: "Seniority level is required!" }]}
					>
						<Select placeholder="select seniority level">
							<Option value="Junior">Junior</Option>
							<Option value="MidLevel">Mid Level</Option>
							<Option value="Senior">Senior</Option>
						</Select>
					</Form.Item>

					<Form.Item
						label="Employee type"
						name="employee_type"
						rules={[{ required: true, message: "Employee type is required!" }]}
					>
						<Select placeholder="select employee type">
							<Option value="Full-time">Full time</Option>
							<Option value="Part-time">Part time</Option>
							<Option value="FullTime/PartTime">Full time/Part time</Option>
							<Option value="Remote">Remote</Option>
						</Select>
					</Form.Item>

					<Form.Item
						label="Recruitment url"
						name="recruitment_url"
						rules={[{ required: true, message: "Recruitment url is required!" }]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="City"
						name="cities"
						rules={[{ required: true, message: "City is required!" }]}
					>
						<AutoComplete style={{ width: '100%' }} options={autoCompleteCity} onChange={onChangeAutoCompleteCity}></AutoComplete>
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
				title="Chỉnh sửa việc làm"
				visible={editJob_visible}
				onCancel={handleEditJobCancel}
				onOk={() => {
					formEdit.validateFields()
						.then(values => {
							console.log(values);
							onEditJob(values);
						})
						.catch(info => {
							console.log(info);
						})
				}}
			>
				<Form
					id="editJob"
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 18 }}
					form={formEdit}
				>
					<Form.Item
						initialValue="title"
						label="Title"
						name="title"
						rules={[{ required: true, message: "Job title is required!" }]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						initialValue="seniority_level"
						label="Yêu cầu:"
						name="seniority_level"
						rules={[{ required: true, message: "Seniority level is required!" }]}
					>
						<Select>
							<Option value="Junior">Junior</Option>
							<Option value="MidLevel">Mid Level</Option>
							<Option value="Senior">Senior</Option>
						</Select>
					</Form.Item>

					<Form.Item
						initialValue="city"
						label="Địa điểm:"
						name="cities"
						rules={[{ required: true, message: "City is required!" }]}
					>
						<AutoComplete style={{ width: '100%' }} options={autoCompleteEditCity} onChange={onChangeAutoCompleteEditCity}></AutoComplete>
					</Form.Item>

					<Form.Item
						initialValue="employee_type"
						label="Công việc:"
						name="employee_type"
						rules={[{ required: true, message: "Employee type is required!" }]}
					>
						<Select>
							<Option value="Full-time">Full time</Option>
							<Option value="Part-time">Part time</Option>
							<Option value="FullTime/PartTime">Full time/Part time</Option>
							<Option value="Remote">Remote</Option>
						</Select>
					</Form.Item>

					<Form.Item
						initialValue="description"
						label="Description:"
						name="description"
						rules={[{ required: true, message: "Description is required!" }]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						initialValue="recruitment_url"
						label="Recruitment url:"
						name="recruitment_url"
						rules={[{ required: true, message: "Recruitment url is required!" }]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						initialValue="skill"
						label="Skill:"
						name="skills"
						rules={[{ required: true, message: "Skill is required!" }]}
					>
						{/* <EditTag/> */}
						<EditableTagGroup ref={ref => (editTags = ref)} />
					</Form.Item>
				</Form>
			</Modal>

			<Card style = {{marginTop:24}}>
				<Meta title={<Title level={3}>Chuyên môn</Title>}></Meta>
				<List
					style={{ marginTop: 24 }}
					grid={{ column: 2 }}
					dataSource={specialityData}
					renderItem={(item) => (
						<List.Item>
							<List.Item.Meta
								avatar={
									<Popconfirm
										title="Bạn có muốn xóa cái này?"
										onConfirm={() => onConfirmDeleteSpeciality(item)}
										okText="Yes"
										cancelText="No">
										<a>
											<Badge
												style={{ color: "red" }}
												count={<MinusCircleOutlined />}
											>
												<Avatar />
											</Badge>
										</a>
									</Popconfirm>
								}
								title={item}
							/>
						</List.Item>
					)}
				/>
				<Form
					name="add-speciality"
					autoComplete="off"
					onFinish={onAddSpecialityFinish}
				>
					<Form.List name="speciality_info">
						{(fields, { add, remove }) => {
							return (
								<div>
									{fields.map((field) => (
										<Space
											key={field.key}
											style={{
												display:'flex',
												marginBottom: 8,
												marginTop: 8,
											}}
										>
											<Form.Item
												{...field}
												name={[field.name, "speciality"]}
												fieldKey={[field.fieldKey, "speciality"]}
												rules={[{ required: true, message: "Missing speciality" },]}
											>
												<Input/>
											</Form.Item>
											<Form.Item>
											<MinusCircleOutlined
												style={{ color: "red"}}
												onClick={() => {
													remove(field.name);
												}}
											/>
											</Form.Item>
										</Space>
									))}

									<Form.Item>
										<Button type="dashed" shape="circle"
											onClick={() => {
												add();
											}}
										>
											<PlusOutlined />
										</Button>
									</Form.Item>
								</div>
							);
						}}
					</Form.List>

					<Form.Item>
						<Button type="primary" htmlType="submit"> Submit </Button>
					</Form.Item>
				</Form>
			</Card>

			<Card className="card-info" style={{ marginTop: 24 }}>
				<Upload
					//action ???
					listType="picture-card"
					fileList={fileList}
					onPreview={handlePreview}
					onChange={handleUploadChange}
				>
					{/* max number of image upload */}
					{fileList.length >= 8 ? null : uploadButton}
				</Upload>
				<Modal
					visible={previewVisible}
					title={previewTitle}
					footer={null}
					onCancel={handlePreviewCancel}
				>
					<img alt="example" style={{ width: "100%" }} src={previewImage} />
				</Modal>
			</Card>
		</>
	);

}

export default ProfileChange;
