import React, { useState, useEffect } from "react";
import {
	Input,
	Layout,
	Row,
	Col,
	Select,
	List,
	Card,
	Typography,
	Tooltip,
	Avatar,
	Tag,
	Space,
	Button,
} from "antd";
import { accountServices, searchServices } from "services";
import { Config } from "../config/consts";
import moment from "moment";
import {
	ClockCircleOutlined,
	HomeOutlined,
	SafetyCertificateOutlined,
} from "@ant-design/icons";
import { getSpecialty, getSkillName } from "services";
import { Link } from "react-router-dom";

const { Search } = Input;
const { Option } = Select;
const { Meta } = Card;
const { Title, Paragraph } = Typography;

const skillList = ["C++", "C#"];
const specialityList = ["Internet", "Semiconductors"];
function MySearch() {
	const [skillDisable, setSkillDisable] = useState(false);
	const [specialityDisable, setSpecialityDisable] = useState(true);
	const [typeData, setTypeData] = useState("student");
	const [queryData, setQueryData] = useState();
	const [skillData, setSkillData] = useState([]);
	const [specialityData, setSpecialityData] = useState([]);
	const [listData, setListData] = useState([]);

	const [skillList, setSkillList] = useState([]);
	const [specialityList, setSpecialityList] = useState([]);

	const onTypeChange = (values) => {
		console.log(values);
		setSpecialityDisable(values == "company" ? false : true);
		setSkillDisable(values == "company" ? true : false);
		setTypeData(values);
		setListData([]);
	};

	const onSkillChange = (values) => {
		console.log(values);
		setSkillData(values);
	};

	const onSpecialityChange = (values) => {
		console.log(values);
		setSpecialityData(values);
	};

	useEffect(() => {
		getSpecialty().then((spec_list) => {
			console.log(spec_list);
			setSpecialityList(spec_list.tag);
		});
		getSkillName().then((skill_list) => {
			setSkillList(skill_list.tag);
		});
	}, []);

	const onSearch = (values) => {
		// console.log(typeData);
		// console.log(values);
		// console.log(skillData.toString());
		// console.log(specialityData.toString());
		var string_skillData = encodeURIComponent(skillData.toString());
		var string_specialityData = encodeURIComponent(
			specialityData.toString()
		);
		searchServices
			.search(typeData, values, string_skillData, string_specialityData)
			.then((data) => {
				console.log(data);
				setListData(data);
			});
	};
	return (
		<Layout style={{ minHeight: "100vh" }} >
			<Row style={{marginTop: 64}} gutter={[0, 16]}>
				<Col span={8} offset={8}>
					<Input.Group compact>
						<Select
							size="large"
							defaultValue="student"
							style={{ width: "30%" }}
							onChange={onTypeChange}
						>
							<Option value="company">Company</Option>
							<Option value="student">Student</Option>
							<Option value="job">Job</Option>
							<Option value="post">Post</Option>
						</Select>
						<Search
							size="large"
							placeholder="Nhập tên bạn muốn tìm"
							style={{ width: "70%" }}
							onSearch={onSearch}
						></Search>
					</Input.Group>
				</Col>
			</Row>
			<Row gutter={[0, 16]}>
				<Col span={8} offset={8}>
					<Input.Group compact>
						<Select defaultValue="skills" style={{ width: "30%" }}>
							<Option value="skills">Skills</Option>
						</Select>
						<Select
							mode="multiple"
							disabled={skillDisable}
							placeholder="Chọn kỹ năng bạn muốn tìm"
							style={{ width: "70%" }}
							onChange={onSkillChange}
						>
							{skillList.map((item) => (
								<Select.Option key={item} value={item}>
									{item}
								</Select.Option>
							))}
						</Select>
					</Input.Group>
				</Col>
			</Row>
			<Row gutter={[0, 16]}>
				<Col span={8} offset={8}>
					<Input.Group compact>
						<Select
							defaultValue="speciality"
							style={{ width: "30%" }}
						>
							<Option value="speciality">Specialities</Option>
						</Select>
						<Select
							mode="multiple"
							disabled={specialityDisable}
							placeholder="Chọn chuyên môn bạn muốn tìm"
							style={{ width: "70%" }}
							onChange={onSpecialityChange}
						>
							{specialityList.map((item) => (
								<Select.Option key={item} value={item}>
									{item}
								</Select.Option>
							))}
						</Select>
					</Input.Group>
				</Col>
			</Row>
			<Row>
                <Col span={16} offset={4}>
                <Card bordered={false}>
                    <List
				itemLayout="vertical"
				dataSource={listData}
				renderItem={(item) => {
					if (typeData == "student")
						return (
							<Row>
								<Col span={16} offset={4}>
									<Card
										className="card-info"
										style={{ marginTop: 12 }}
									>
										<Meta
											avatar={
												<Tooltip
													placement="bottom"
													title={
														item.firstname +
														" " +
														item.lastname
													}
												>
													<Avatar
														src={
															Config.backendUrl +
															item.profile_picture
														}
													></Avatar>
												</Tooltip>
											}
											title={
												<Link
													to={
														"/profile/student/" +
														item.id
													}
												>
													<Title level={4}>
														{item.firstname +
															" " +
															item.lastname}
													</Title>
												</Link>
											}
											description={
												<>
													<Paragraph>
														{item.description}
													</Paragraph>
													<List
                                                        locale={{emptyText: "Không có gì"}}
														dataSource={item.skills}
														renderItem={(
															skills
														) => (
															<Tag
																style={{
																	margin: 3,
																}}
															>
																{skills}
															</Tag>
														)}
													></List>
												</>
											}
										></Meta>
									</Card>
								</Col>
							</Row>
						);
					else if (typeData == "company")
						return (
							<Row>
								<Col span={16} offset={4}>
									<Card
										className="card-info"
										style={{ marginTop: 12 }}
									>
										<Meta
											avatar={
												<Tooltip
													placement="bottom"
													title={item.name}
												>
													<Avatar
														src={
															Config.backendUrl +
															item.profile_picture
														}
													></Avatar>
												</Tooltip>
											}
											title={
												<Link
													to={
														"/profile/company/" +
														item.id
													}
												>
													<Title level={4}>
														{item.name}
													</Title>
												</Link>
											}
											description={
												<>
													<Paragraph>
														{item.description}
													</Paragraph>
													<List
                                                        locale={{emptyText: "Không có gì"}}
														dataSource={
															item.specialties
														}
														renderItem={(
															specialties
														) => (
															<Tag
																style={{
																	margin: 3,
																}}
															>
																{specialties}
															</Tag>
														)}
													></List>
												</>
											}
										></Meta>
									</Card>
								</Col>
							</Row>
						);
					else if (typeData == "job")
						return (
							<Row>
								<Col span={16} offset={4}>
									<Card
										className="card-info"
										key={item.id}
										style={{ marginTop: 24 }}
										cover={
											<img
												src={
													Config.backendUrl +
													item.job_picture
												}
												height={200}
											></img>
										}
									>
										<Meta
											avatar={
												<Tooltip
													placement="bottom"
													title={item.company_name}
												>
													<Avatar
														src={
															Config.backendUrl +
															item.company_profile_picture
														}
													></Avatar>
												</Tooltip>
											}
											title={
												<>
													<Title level={4}>
														{item.title} •
														<Link
															to={
																"/profile/company/" +
																item.id
															}
														>
															<i>
																{" "}
																{
																	item.company_name
																}
															</i>
														</Link>
													</Title>
													<Button
														style={{
															float: "right",
															width: 100,
															marginRight: 45,
															bottom: 24,
														}}
														type="primary"
														onClick={() =>
															window.open(
																item.recruitment_url
															)
														}
													>
														Apply
													</Button>
													<u>
														<i>
															{moment(
																item.published_date,
																"YYYY-MM-DD"
															).format(
																"MMMM Do YYYY"
															)}
														</i>
													</u>
												</>
											}
											description={
												<>
													<Row>
														<Col span={18}>
															<div
																style={{
																	fontSize: 14,
																}}
															>
																{
																	item.description
																}
															</div>
														</Col>
														<Col
															offset={1}
															span={5}
														>
															<div>
																<Space>
																	<SafetyCertificateOutlined />
																	{
																		item.seniority_level
																	}
																</Space>
															</div>
															<div>
																<Space>
																	<ClockCircleOutlined />
																	{
																		item.employment_type
																	}
																</Space>
															</div>
															<Space>
																<HomeOutlined />
																<List
                                                                    locale={{emptyText: "Không có gì"}}
																	grid={{
																		gutter: 0,
																	}}
																	dataSource={
																		item.cities
																	}
																	renderItem={(
																		city
																	) => city}
																></List>
															</Space>
														</Col>
													</Row>
													<Row
														style={{
															marginTop: 16,
														}}
													>
														<Col span={19}>
															<Space>
																<List
                                                                    locale={{emptyText: "Không có gì"}}
																	dataSource={
																		item.skills
																	}
																	renderItem={(
																		skill
																	) => (
																		<Tag>
																			{
																				skill
																			}
																		</Tag>
																	)}
																></List>
															</Space>
														</Col>
													</Row>
												</>
											}
										></Meta>
									</Card>
								</Col>
							</Row>
						);
					else if (typeData == "post") {
						return (
							<Row>
								<Col span={16} offset={4}>
									<Card
										className="card-info"
										key={item.id}
										style={{ marginTop: 24 }}
										cover={
											<img
												src={
													Config.backendUrl +
													item.post_picture
												}
												height={200}
											></img>
										}
									>
										<Meta
											avatar={
												<Tooltip
													placement="bottom"
													title={
														item.student_firstname +
														" " +
														item.student_lastname
													}
												>
													<Avatar
														src={
															Config.backendUrl +
															item.student_profile_picture
														}
													></Avatar>
												</Tooltip>
											}
											title={
												<>
													<Title level={4}>
														{item.title}
													</Title>
													<u>
														<i>
															{moment(
																item.published_date,
																"YYYY-MM-DD"
															).format(
																"MMMM Do YYYY"
															)}
														</i>
													</u>
												</>
											}
											description={
												<>
													<Row>
														<Col span={19}>
															<div
																style={{
																	fontSize: 14,
																}}
															>
																{item.content}
															</div>
														</Col>
													</Row>
													<Row
														style={{
															marginTop: 16,
														}}
													>
														<Col span={19}>
															<Space>
																<List
                                                                    locale={{emptyText: "Không có gì"}}
																	dataSource={
																		item.skills
																	}
																	renderItem={(
																		skill
																	) => (
																		<Tag>
																			{
																				skill
																			}
																		</Tag>
																	)}
																></List>
															</Space>
														</Col>
														{/* <Col span={5}>
                            <Button
                              style={{ float: 'right' }}
                              type="primary"
                              shape="circle"
                              onClick={() => addInterestedPost(item)}
                            >
                              <HeartFilled />
                            </Button>
                          </Col> */}
													</Row>
												</>
											}
										></Meta>
									</Card>
								</Col>
							</Row>
						);
					}
				}}
			></List>
                </Card>
                </Col>
            </Row>
        </Layout>
	);
}

export { MySearch };
