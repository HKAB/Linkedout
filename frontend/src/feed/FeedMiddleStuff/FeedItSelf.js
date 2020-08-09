import React from 'react';
import {
	Card,
	Avatar,
	List,
	Divider,
	Typography,
	Col,
	Space,
	Row,
	Tag,
	Button,
} from 'antd';
import moment from 'moment';
import {
	SafetyCertificateOutlined,
	ClockCircleOutlined,
	HomeOutlined,
	FileTextOutlined,
	EyeOutlined,
	SmileOutlined,
} from '@ant-design/icons';

const { Meta } = Card;
const { Title } = Typography;

const jobs = [
	{
		id: 1,
		title: 'Tuyển Dev tại facebook.wap.sh',
		seniority_level: 'Junior',
		employment_type: 'Full time',
		recruiment_url: 'https://www.google.com/',
		cover:
			'https://images.pexels.com/photos/4931004/pexels-photo-4931004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		cities: ['Hà Nội'],
		skills: ['Python', 'C++', 'C#', 'Java', 'Coffee'],
		published_date: '2020/11/15',
		description:
			'To Sherlock Holmes she is always the woman. I have seldom heard him mention her under any other name. In his eyes she eclipses and predominates the whole of her sex. It was not that he felt any emotion akin to love for Irene Adler. All emotions, and that one particularly, were abhorrent to his cold, precise but admirably balanced mind. He was, I take it, the most perfect reasoning and observing machine that the world has seen, but as a lover he would have placed himself in a false position. He never spoke of the softer passions, save with a gibe and a sneer',
	},
	{
		id: 2,
		title: 'Tuyển Dev tại facebook.wap.sh',
		seniority_level: 'Mid level',
		employment_type: 'Part time',
		recruiment_url: 'https://www.google.com/',
		cover:
			'https://images.pexels.com/photos/4931004/pexels-photo-4931004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		cities: ['Hà Nội'],
		skills: ['Python', 'C++', 'C#', 'Java', 'Coffee'],
		published_date: '2020/11/15',
		description:
			'To Sherlock Holmes she is always the woman. I have seldom heard him mention her under any other name. In his eyes she eclipses and predominates the whole of her sex. It was not that he felt any emotion akin to love for Irene Adler. All emotions, and that one particularly, were abhorrent to his cold, precise but admirably balanced mind. He was, I take it, the most perfect reasoning and observing machine that the world has seen, but as a lover he would have placed himself in a false position. He never spoke of the softer passions, save with a gibe and a sneer',
	},
	{
		id: 3,
		title: 'Tuyển Dev tại facebook.wap.sh',
		seniority_level: 'Fresher',
		employment_type: 'Remote',
		recruiment_url: 'https://www.google.com/',
		cover:
			'https://images.pexels.com/photos/4931004/pexels-photo-4931004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		cities: ['Hà Nội'],
		skills: ['Python', 'C++', 'C#', 'Java', 'Coffee'],
		published_date: '2020/11/15',
		description:
			'To Sherlock Holmes she is always the woman. I have seldom heard him mention her under any other name. In his eyes she eclipses and predominates the whole of her sex. It was not that he felt any emotion akin to love for Irene Adler. All emotions, and that one particularly, were abhorrent to his cold, precise but admirably balanced mind. He was, I take it, the most perfect reasoning and observing machine that the world has seen, but as a lover he would have placed himself in a false position. He never spoke of the softer passions, save with a gibe and a sneer',
	},
];

const history_data = {
	post: 8,
	viewed: 32,
	interested: 24,
};

function FeedItSelf() {
	return (
		<>
			<Card>
				<Row style={{ textAlign: 'center' }}>
					<Col span={8} style={{ borderRight: '1px solid #ecf0f1' }}>
						<Title level={4}>Post</Title>
						<div>{history_data.post}</div>
					</Col>

					<Col span={8} style={{ borderRight: '1px solid #ecf0f1' }}>
						<Title level={4}>Viewed</Title>
						<div>{history_data.viewed}</div>
					</Col>
					<Col span={8}>
						<Title level={4}>Interested</Title>
						<div>{history_data.interested}</div>
					</Col>
				</Row>
			</Card>

			<List
				itemLayout="vertical"
				size="large"
				dataSource={jobs}
				renderItem={(item) => (
					<>
						<Card
							className="card-info"
							key={item.id}
							style={{ marginTop: 24 }}
							cover={<img src={item.cover} height={200}></img>}
						>
							<Meta
								avatar={
									<Avatar src="https://image.flaticon.com/icons/svg/2965/2965278.svg"></Avatar>
								}
								title={
									<>
										<Title level={4} href={item.recruiment_url}>
											{item.title}
										</Title>
										<u>
											<i>
												{moment(item.published_date, 'YYYY/MM/DD').format(
													'MMMM Do YYYY'
												)}
											</i>
										</u>
									</>
								}
								description={
									<>
										<Row>
											<Col span={19}>
												<div style={{ fontSize: 14 }}>{item.description}</div>
											</Col>
											<Col offset={1} span={4}>
												<div>
													<Space>
														<SafetyCertificateOutlined />
														{item.seniority_level}
													</Space>
												</div>
												<div>
													<Space>
														<ClockCircleOutlined />
														{item.employment_type}
													</Space>
												</div>
												<Space>
													<HomeOutlined />
													<List
														grid={{ gutter: 8 }}
														dataSource={item.cities}
														renderItem={(city) => city}
													></List>
												</Space>
											</Col>
										</Row>
										<Row style={{ marginTop: 16 }}>
											<Col span={19}>
												<Space>
													<List
														dataSource={item.skills}
														renderItem={(skill) => <Tag>{skill}</Tag>}
													></List>
												</Space>
											</Col>
											<Col span={5}>
												<Button
													href={item.recruiment_url}
													style={{ float: 'right' }}
													type="primary"
												>
													Apply
												</Button>
											</Col>
										</Row>
									</>
								}
							></Meta>
						</Card>
					</>
				)}
			/>
		</>
	);
}

export { FeedItSelf };
